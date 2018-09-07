import { FETCH_POSTS, NEW_POSTS } from "./types";
import { getParsedChildren } from "../util/parsers";
import { getSubject } from "../util/redditGets";

export const fetchPosts = (subreddit, subjectTitle) => dispatch => {
  console.log("fetching posts");
  getParsedChildren(
    getSubject.bind(null, {
      subreddit,
      subjectTitle
    })
  ).then(posts =>
    dispatch({
      type: FETCH_POSTS,
      payload: posts
    })
  );
};
