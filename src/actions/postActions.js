import { FETCH_POSTS, NEW_POSTS } from "./types";
import { getParsedChildren } from "../util/parsers";
import { getSubject } from "../util/redditGets";
import { labelImages } from "../util/vision";

export const fetchPosts = (
  subreddit,
  subjectTitle,
  useCloudVision = true
) => async dispatch => {
  console.log("fetching posts");
  let wokePosts;
  const posts = await getParsedChildren(
    getSubject.bind(null, {
      subreddit,
      subjectTitle
    })
  );

  console.log(posts);

  if (useCloudVision) {
    //gather all to do single shot img req to endpoint
    const imagesArr = posts.reduce((acc, p) => {
      //assurity that these are all valid (cloud will not return err)
      if (p.fullContent) {
        return [...acc, p.fullContent.url];
      } else {
        return [...acc, "self"]; //add skip flag if the post has no content
      }
    }, []);

    console.log(imagesArr);
    const labellings = await labelImages({
      imageUris: imagesArr,
      maxResultsPer: 3
    });

    console.log("LABLEs ", labellings);

    if (labellings) {
      //apply labels to our posts, back into the order in which they came
      wokePosts = posts.map((post, index) => {
        if (labellings.invalidIndices.includes(index)) {
          //this means this index was filtered, so we return an invalid string
          return { ...post, resolvedVision: "invalid" };
        }
        return {
          ...post,
          resolvedVision: labellings.responses[index] || "Exception!"
        };
      });
      console.log("VIS ", wokePosts);
    }
  }

  dispatch({
    type: FETCH_POSTS,
    payload: wokePosts || posts
  });
};
