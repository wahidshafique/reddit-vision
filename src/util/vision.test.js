import * as v from "../util/vision";

test("does this thing even work", async () => {
  const data = await v.labelImages({
    imageUris: ["https://i.redd.it/xhjwycxclvg11.jpg"]
  });
  console.log("data", data);
  console.log("response", data.response);
  return expect(data);
});

//https://cloud.google.com/vision/docs/images/faulkner.jpg GOOD
//https://b.thumbs.redditmedia.com/yMjVjdXIh9mGx7U3kyYhdqzPvxnvJLnwa8_DhEgf-lQ.jpg BAD

//URL: https://i.redd.it/xhjwycxclvg11.jpg GOOD
