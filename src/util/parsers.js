import _ from "lodash/fp";

const getDataRoot = _.curry(d => d.data);
const reduceData = cb => (acc, data) => [...acc, cb(data)];

const determineMediaType = childData => {
  const mediaTypes = ["jpg", "png", "gifv", "gif"];
  const childUrl = childData.url;

  for (let type of mediaTypes) {
    if (childUrl.includes(type)) {
      return {
        type,
        url: childUrl
      };
    }
  }
};

const pullUsableRedditData = cb => childData => {
  const _child = cb(childData);
  return {
    key: _child.name,
    title: _child.title,
    subreddit: _child.subreddit,
    thumbnail: _child.thumbnail,
    permalink: _child.permalink,
    fullContent: determineMediaType(_child),
    ups: _child.ups
  };
};

const pullUsableSubRedditData = cb => srData => {
  const _sr = cb(srData);
  return {
    key: _sr.name,
    realName: _sr.display_name,
    prefixedName: _sr.display_name_prefixed,
    desc: _sr.public_description
  };
};

const c = dataHandler =>
  _.compose(
    dataHandler,
    getDataRoot
  );

const reduceDataChildren = _.compose(
  reduceData,
  c(pullUsableRedditData)
);

const reduceDataSubreddits = _.compose(
  reduceData,
  c(pullUsableSubRedditData)
);

const asyncRedditDataCallback = async (callbackAsyncFunc, reduceTo) => {
  const res = await callbackAsyncFunc();
  if (!res.error) {
    const dataChildren = res.data.children;
    return dataChildren.reduce(reduceTo(), []); //assuming this is static
  }
  return [];
};

export const getParsedChildren = cb =>
  asyncRedditDataCallback(cb, reduceDataChildren);

export const getParsedSubreddits = cb =>
  asyncRedditDataCallback(cb, reduceDataSubreddits);
