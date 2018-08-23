import * as p from "../util/parsers";
import * as rg from "../util/redditGets";

test("should return parsed object", async () => {
  const data = await p.getParsedChildren(rg.getSubject);
  console.log("parsed obj is ", data);
  return expect(data);
});
