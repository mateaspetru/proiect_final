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
  <div class="card mb-3" style="max-width: 540px;">
  <div class="row g-0">
    <div class="col-md-4">
      <img src="${product.productImage}" class="img-fluid rounded-start" alt="...">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">${product.productName}  </h5>
        <h5 class="card-title">${product.price} RON  </h5>

        <p class="card-text">${product.productDetail}</p>
        <p class="card-text">In stoc: ${product.stock} buc.</p>
        <span>
          <p class="card-text">Cantitate</p>
          <input type="number" name="cantitate" id="cantitate" />
        </span>
        <a href="#" class="btn btn-primary detailButton"><i class="fa-solid fa-basket-shopping"></i> Adauga in cos</a>



        
      </div>
    </div>
  </div>
</div>
  `;
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
