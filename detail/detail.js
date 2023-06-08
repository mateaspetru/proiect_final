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
      <img src="${product.image}" class="img-fluid rounded-start" alt="...">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">${product.name}  </h5>
        <h5 class="card-title">${product.price} RON  </h5>

        <p class="card-text">${product.detail}</p>
        <p class="card-text">In stoc: ${product.stock} buc.</p>
        <span>
          <p class="card-text">Cantitate</p>
          <input type="number" name="cantitate" id="cantitate" />
        </span>
        <a href="#" product-id="${getProductIdFromURL()}" class="btn btn-primary add-to-cart"><i class="fa-solid fa-basket-shopping"></i> Adauga in cos</a>



        
      </div>
    </div>
  </div>
</div>
  `;
  qtyInputValue();
  productAddedToCart(product);
}

function productAddedToCart(product) {
  const addToCartBtn = document.querySelector(".add-to-cart");
  addToCartBtn.addEventListener("click", (e) => {
    if (e.target.classList.contains("add-to-cart")) {
      const qty = document.querySelector("#cantitate").value;
      if (qty <= 0) {
        qtyInputValue();
      } else {
        bannerDisplay(product);
      }
    }
  });
}

function qtyInputValue() {
  document.querySelector("#cantitate").value = 1;
}
function bannerDisplay(product) {
  const bannerMessage = document.querySelector(".banner");
  bannerMessage.innerHTML = `
  ${product.name} a fost adaugat in cosul de cumparaturi`;
  bannerMessage.style.display = "block";

  if (bannerMessage.style.display === "block") {
    setTimeout(() => {
      bannerMessage.style.display = "none";
    }, 1000);
  }
}
