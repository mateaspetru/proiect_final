const keys = Object.keys(localStorage);
const url = `https://646e69389c677e23218ba227.mockapi.io/Products`;
const tableBody = document.querySelector("tbody");
let rowCount = [];
let total = 0;
const productQty = document.querySelector(".product-qty");
loadingSceen();
keys.forEach((key) => {
  const value = localStorage.getItem(key);
  const keyName = JSON.parse(value);
  rowCount.push(parseInt(keyName["qty"]));
  fetch(url + "/" + keyName["idOfElement"])
    .then((result) => result.json())
    .then((product) => {
      populateWithProduct(product, keyName);
      const subtotalAllProduct = product.price * keyName["qty"];
      total = total + subtotalAllProduct;
      let h5 = document.querySelector("h5");
      h5.textContent = `Total: $ ${total}`;
    });
  decreaseQty();
  increaseQty();
  removeProductFromCart();
});
numberOfProducts();

function populateWithProduct(product, keyName) {
  const tr = document.createElement("tr");
  tr.classList = "number-of-product";
  tr.innerHTML = `
        <td>${product.name}</td>
        <td class="product-price">$ ${product.price}</td>
        <td class="product-qty"><button type="button" class="btn margin-right btn-danger decrese-qty" product-id = '${
          product.id
        }' data-key="${product.name}"
          >-</button>
        <span class="value">${
          keyName["qty"]
        }</span> Buc  <button type="button" class="btn margin-left btn-success increse-qty" product-id = '${
    product.id
  }'
        data-key="${product.name}" >+</button>
        </td>
        <td class="product-price subtotal">$ ${subtotal(product, keyName)}</td>
        <td class="remove-button">
            <button type="button" class="btn btn-danger remove-product-from-basket" data-key="${
              product.name
            }"> Remove </button>
        </td>
      `;
  tableBody.appendChild(tr);
}

function subtotal(product, keyName) {
  return product.price * keyName["qty"];
}

function removeProductFromCart() {
  const removeBtn = document.querySelector("tbody");
  removeBtn.addEventListener("click", (e) => {
    e.stopImmediatePropagation();
    if (e.target.classList.contains("remove-product-from-basket")) {
      const key = e.target.getAttribute("data-key");

      localStorage.removeItem(key);
      location.reload();
    }
  });
}

function numberOfProducts() {
  const sum = rowCount.reduce(
    (acumulator, curentValue) => acumulator + curentValue,
    0
  );
  productQty.textContent = `Produse: ${sum} BUC.`;
}

function decreaseQty() {
  const body = document.querySelector("tbody");
  body.addEventListener("click", (e) => {
    if (e.target.classList.contains("decrese-qty")) {
      e.stopImmediatePropagation();
      const productName = e.target.getAttribute("data-key");
      const idOfElement = e.target.getAttribute("product-id");

      let qty = e.target.nextElementSibling;
      let tmp = qty.textContent;
      --tmp;
      qty.textContent = tmp;
      const data = {
        qty: tmp,
        idOfElement: idOfElement,
      };
      localStorage.setItem(productName, JSON.stringify(data));
      location.reload();
    }
  });
}

function increaseQty() {
  const body = document.querySelector("tbody");
  body.addEventListener("click", (e) => {
    if (e.target.classList.contains("increse-qty")) {
      e.stopImmediatePropagation();
      const productName = e.target.getAttribute("data-key");
      const idOfElement = e.target.getAttribute("product-id");
      let qty = e.target.previousElementSibling;
      let tmp = qty.textContent;
      ++tmp;
      qty.textContent = tmp;

      const data = {
        qty: tmp,
        idOfElement: idOfElement,
      };
      localStorage.setItem(productName, JSON.stringify(data));
      location.reload();
    }
  });
}
function loadingSceen() {
  setTimeout(function () {
    document.getElementById("loading-screen").style.display = "none";
  }, 500);
}
function finalizareComanda() {
  localStorage.clear();
  bannerDisplay();
  setTimeout(() => {
    location.reload();
  }, 1000);
}
function bannerDisplay(product) {
  const bannerMessage = document.querySelector(".banner");
  bannerMessage.innerHTML = `
  Comanda dvs  a fost adaugata cu succes!`;
  bannerMessage.style.display = "block";
  if (bannerMessage.style.display === "block") {
    setTimeout(() => {
      bannerMessage.style.display = "none";
    }, 1000);
  }
}
