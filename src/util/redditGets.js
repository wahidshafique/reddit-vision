import dog from "../data/dog";

let IS_MOCKED = process.env.REACT_APP_MOCK_API || false;

console.log(process.env);

export async function getSubject(
  { subreddit = "r/funny", subjectTitle = "dog" } = {},
  mocked = IS_MOCKED
) {
  if (mocked) {
    console.log("mocked api call");
    return dog;
  }
  console.log("true api call");
  const res = await fetch(
    `https://www.reddit.com/${subreddit}/search.json?q=${subjectTitle}&restrict_sr=1`
  );
  return res.json(); // assuming that the api generally looks the same across the board
}

export async function getListOfSubreddits() {
  const res = await fetch(`https://www.reddit.com/reddits.json`);
  return res.json();
}
