import dog from "../data/dog";

let IS_MOCKED = false;
//there is def some rate limiting going on on reddits part

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
