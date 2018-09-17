//import { KEY } from "../secrets";
const KEY = null;

import { chunk } from "lodash";

const MAX_REQUEST_QUOTA = 16;

const annonateEndpoint = `https://vision.googleapis.com/v1/images:annotate?key=${KEY ||
  process.env.KEY}`;

const singleReq = (img, maxResultsPer) => ({
  image: {
    source: {
      imageUri: img
    }
  },
  features: [
    {
      type: "LABEL_DETECTION",
      maxResults: maxResultsPer
    }
  ]
});

const filterInvalidThumbs = invalidIndices => (img, index) => {
  if (img === "self" || img === "") {
    console.warn("post with no thumbnail/img detected");
    invalidIndices.push(index);
  }
  return img !== "self" || img !== "";
};

const sendRequestToAnnotate = (postBody, invalidIndices) => {
  return fetch(annonateEndpoint, {
    method: "POST",
    mode: "cors",
    redirect: "follow", // manual, *follow, error
    referrer: "no-referrer", // no-referrer, *client
    body: JSON.stringify(postBody) // body data type must match "Content-Type" header
  }).then(res =>
    res.json().then(responses => ({
      ...responses,
      invalidIndices
    }))
  );
};

export function labelImages({ imageUris = [], maxResultsPer = 1 }) {
  let invalidIndices = []; //will store invalid thumbnails and recover them later (after network req)

  const requestArray = imageUris
    .filter(filterInvalidThumbs(invalidIndices))
    .map(img => singleReq(img, maxResultsPer))
    .filter(r => r !== undefined);

  const chunkedArrayBits = chunk(requestArray, MAX_REQUEST_QUOTA);

  console.log("chunked", chunkedArrayBits);

  if (chunkedArrayBits.length > 1) {
    return Promise.all(
      chunkedArrayBits.map(req => {
        console.log(req);
        const postBody = {
          requests: req
        };
        return sendRequestToAnnotate(postBody, invalidIndices);
      })
    ).then(res => {
      console.log("promsie res", res);
      return {
        responses: res.reduce((acc, item) => {
          console.log("ITEM", item);
          acc.push(...item.responses);
          return acc;
        }, []),
        invalidIndices: res[0].invalidIndices
      };
    });
  } else {
    const postBody = {
      requests: [chunkedArrayBits[0]]
    };
    return sendRequestToAnnotate(postBody, invalidIndices);
    //}
  }
}
