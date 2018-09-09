import _ from "lodash/fp";

const getDataRoot = _.curry(d => d.data);
const reduceData = cb => (acc, data) => [...acc, cb(data)];

const pullUsableRedditData = cb => childData => {
  const _child = cb(childData);
  return {
    key: _child.name,
    title: _child.title,
    subreddit: _child.subreddit,
    thumbnail: _child.thumbnail,
    permalink: _child.permalink,
    fullImg: _child.preview ? _child.preview.images[0].source.url : null,
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

// const generalRedditReduce = _.compose( hmm: TODO: add placeholder here
//   reduceData,
//   _.compose(
//     _,
//     getDataRoot
//   )
// );

const reduceDataChildren = _.compose(
  reduceData,
  _.compose(
    pullUsableRedditData,
    getDataRoot
  )
);

const reduceDataSubreddits = _.compose(
  reduceData,
  _.compose(
    pullUsableSubRedditData,
    getDataRoot
  )
);

const asyncRedditDataCallback = async (callbackAsyncFunc, reduceTo) => {
  const res = await callbackAsyncFunc();
  const dataChildren = res.data.children;
  return dataChildren.reduce(reduceTo(), []); //assuming this is static
};

export const getParsedChildren = async cb =>
  asyncRedditDataCallback(cb, reduceDataChildren);

export const getParsedSubreddits = async cb =>
  asyncRedditDataCallback(cb, reduceDataSubreddits);
