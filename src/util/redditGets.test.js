import * as rg from "../util/redditGets";

test("does this thing even work with dogs", async () => {
  const data = await rg.getSubject();
  console.log(data);
  return expect(data);
});
