function getProductIdFromURL() {
  var searchParams = new URLSearchParams(window.location.search);
  return searchParams.get("id");
}

fetch(
  "https://646e69389c677e23218ba227.mockapi.io/Products/" +
    getProductIdFromURL()
)
  .then((result) => result.json())
  .then((product) => console.log(product));
