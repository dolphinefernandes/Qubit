const qubitHeadline = document.getElementById("qubit-headline");
const qubitName = document.getElementById("qubit-Name");

getdata();

async function getdata() {
  return queryFetch(
    `query PlacementContent (
    $mode: Mode!
    $placementId: String!
    $attributes: Attributes!
    $resolveVisitorState: Boolean!
  ) {
    placementContent(
      mode: $mode
      placementId: $placementId
      attributes: $attributes
      resolveVisitorState: $resolveVisitorState
    ) {
      content
      callbackData
      visitorId
    }
  }`,
    {
      mode: "LIVE",
      placementId: "f0JOWTrnSPKFnwE0c75wYw",
      resolveVisitorState: true,
      attributes: {
        visitor: {
          id: "",
          url: "https://www.myprotein.com",
        },
        user: {},
        product: {},
        view: {
          currency: "GBP",
          type: "home",
          subtypes: [],
          language: "en-gb",
        },
      },
    }
  ).then((response) => {
    const data = response.data.placementContent.content;
    console.log(response)
    qubitHeadline.innerHTML = data.headline;
    data.recs.forEach((recs) => {
      const img = document.createElement("img");
      img.src = recs.details.image_url;
      const src = document.getElementById("qubit-image");
      src.appendChild(img);
    });
  });
}

async function queryFetch(query, variables) {
  return fetch("https://api.qubit.com/placements/query", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: query,
      variables: variables,
    }),
  }).then((res) => res.json());
}
