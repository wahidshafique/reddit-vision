import * as rg from "../util/redditGets";

let modHash = "0";

//yes I know I can use currying and stuff to make this wayy less verbose

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
  //this has not hash diffing
  const dataSr = res.data.children;
  return dataSr.reduce(reduceDataSubreddits, []);
}
