import * as rg from "../util/redditGets";

let modHash = "0";

const reduceDataChildren = (agg, child) => {
  //here I am contructing a slightly usable object with only the things I want
  const childData = child.data;
  return [
    ...agg,
    {
      key: childData.name,
      title: childData.title,
      subreddit: childData.subreddit,
      thumbnail: childData.thumbnail,
      permalink: childData.permalink,
      fullImg: childData.preview ? childData.preview.images[0].source.url : null
    }
  ];
};

export async function getParsedChildren(callbackAsyncFunc) {
  const res = await callbackAsyncFunc();
  if (res.data.modhash !== modHash) {
    modHash = res.data.modhash;
    const dataChildren = res.data.children;
    return dataChildren.reduce(reduceDataChildren, []);
  } else {
    return null;
  }
}
