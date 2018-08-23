import dog from "../data/dog";

let IS_MOCKED = true;

export async function getSubject(subjectTitle, mocked = IS_MOCKED) {
  if (mocked) {
    console.log("mocked api call");
    return dog;
  }
  console.log("true api call");
  const res = await fetch(
    `https://www.reddit.com/r/aww/search.json?q=${subjectTitle}&restrict_sr=1`
  );
  return res.json(); // assuming that the api generally looks the same across the board
}
