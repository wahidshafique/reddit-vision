import * as rg from "../util/redditGets";

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
      fullImg: childData.preview
        ? childData.preview.images[0].source.url
        : null,
      ups: childData.ups
    }
  ];
};

export async function getParsedChildren(callbackAsyncFunc) {
  const res = await callbackAsyncFunc();
  const dataChildren = res.data.children;
  return dataChildren.reduce(reduceDataChildren, []);
}

const reduceDataSubreddits = (agg, red) => {
  const srData = red.data;
  return [
    ...agg,
    {
      key: srData.name,
      realName: srData.display_name,
      prefixedName: srData.display_name_prefixed,
      desc: srData.public_description
    }
  ];
};

export async function getParsedSubreddits() {
  const res = await rg.getListOfSubreddits();
  const dataSr = res.data.children;
  return dataSr.reduce(reduceDataSubreddits, []);
}

export function areEqualShallow(a, b) {
  for (var key in a) {
    if (a[key] !== b[key]) {
      return false;
    }
  }
  return true;
}
