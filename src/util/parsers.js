import * as rg from "../util/redditGets";

var modHash = "0";

const reduceDataChildren = (agg, child) => {
  //here I am contructing a slightly usable object with only the things I want
  return [
    ...agg,
    {
      title: child.data.title,
      subreddit: child.data.subreddit
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
