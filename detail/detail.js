function getProductIdFromURL() {
  var searchParams = new URLSearchParams(window.location.search);
  return searchParams.get("id");
}

fetch(
  "https://646e69389c677e23218ba227.mockapi.io/Products/" +
    getProductIdFromURL()
)
  .then((result) => result.json())
  .then((product) => createCards(product));

function createCards(product) {
  document.querySelector(".container").innerHTML = `
  <div class="card" style="width: 30rem;">
      <img src="${product.productImage}" class="card-img-top" alt="...">
      <div class="card-body">
          <h5 class="card-title">${product.productName}</h5>
          <p class="card-text">${product.productDetail}</p>
          <span>
            <p class="card-text">${product.price}RON</p>
            <a href="#" class="btn btn-primary">
            <i style="padding: 0px" class="fa-solid fa-basket-shopping"></i>
            </a>
            
          </span>

      </div>
  </div>`;
}

/* <div class="card" style="width: 18rem;">
<img src="${product.productImage}" class="card-img-top" alt="...">
<div class="card-body">
    <h5 class="card-title">${product.productName}</h5>
    <span>
      <p class="card-text">${product.price} RON</p>
     
    </span>
 </div>
</div>
</div> */
