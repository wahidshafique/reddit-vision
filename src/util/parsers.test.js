import * as p from "../util/parsers";
import * as rg from "../util/redditGets";

test("should return parsed object", async () => {
  const data = await p.getParsedChildren(rg.getSubject);
  console.log("parsed obj is ", data);
  return expect(data);
});

test("should return parsed sr object", async () => {
  const data = await p.getParsedSubreddits();
  console.log("parsed sr obj is ", data);
  return expect(data);
});
