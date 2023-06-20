function getProductIdFromURL() {
  var searchParams = new URLSearchParams(window.location.search);
  return searchParams.get("id");
}
setTimeout(function () {
  document.getElementById("loading-screen").style.display = "none";
}, 200);
fetch(
  "https://646e69389c677e23218ba227.mockapi.io/Products/" +
    getProductIdFromURL()
)
  .then((result) => result.json())
  .then((product) => createCards(product));

function createCards(product) {
  document.querySelector(".container").innerHTML = `
<div class="card mb-3">
    <img src="${
      product.image
    }" class="card-img-top" alt="..." style="max-width: 300px;">
    <div class="card-body">
      <h5 class="card-title">${product.name}</h5>
      <h5 class="card-title">${product.price} RON</h5>
      <p class="card-text">${product.detail}</p>
      <p class="card-text"><small class="text-body-secondary">In stoc: ${
        product.stock
      } buc.</small></p>
      <span>
          <p class="card-text">Cantitate</p>
          <input type="number" name="cantitate" id="cantitate" />
      </span>
        <a href="#"  product-id="${getProductIdFromURL()}" class="btn btn-primary btn-success add-to-cart"><i class="fa-solid fa-basket-shopping"></i> Adauga in cos</a>
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
      const stock = `${product.stock}`;
      const idOfElement = document
        .querySelector(".add-to-cart")
        .getAttribute("product-id");
      if (qty <= 0) {
        qtyInputValue();
      } else if (Number(qty) > stock) {
        alert(`Cantitate inexistenta in stock`);
      } else {
        bannerDisplay(product);
        // local storage
        const data = {
          qty: qty,
          idOfElement: idOfElement,
        };
        localStorage.setItem(`${product.name}`, JSON.stringify(data));
        // end of local storage
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
    }, 700);
  }
}
