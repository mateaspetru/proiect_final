const keys = Object.keys(localStorage);
const url = `https://646e69389c677e23218ba227.mockapi.io/Products`;
const tableBody = document.querySelector("tbody");
let rowCount = [];
let total = 0;
const productQty = document.querySelector(".product-qty");
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
      h5.textContent = `Total: ${total} RON`;
    });
  decreseQty();
  increseQty();
  removeProductFromCart();
});
numberOfProducts();

function populateWithProduct(product, keyName) {
  const tr = document.createElement("tr");
  tr.classList = "number-of-product";
  tr.innerHTML = `
        <td>${product.name}</td>
        <td class="product-price">${product.price} Ron</td>
        <td class="product-qty"><button type="button" class="btn margin-right btn-danger decrese-qty" data-key="${
          product.name
        }" >-</button>
        <span class="value">${
          keyName["qty"]
        }</span> Buc  <button type="button" class="btn margin-left btn-success increse-qty">+</button>
        </td>
        <td class="product-price subtotal">${subtotal(
          product,
          keyName
        )} RON</td>
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

function decreseQty() {
  const body = document.querySelector("tbody");
  body.addEventListener("click", (e) => {
    if (e.target.classList.contains("decrese-qty")) {
      e.stopImmediatePropagation();
      const productName = e.target.getAttribute("data-key");
      let qty = e.target.nextElementSibling;
      let tmp = qty.textContent;
      --tmp;
      qty.textContent = tmp;

      // const data = {
      //   qty: qty,
      // };
      // localStorage.setItem(productName, JSON.stringify(data));
    }
  });
}

function increseQty() {
  const body = document.querySelector("tbody");
  body.addEventListener("click", (e) => {
    if (e.target.classList.contains("increse-qty")) {
      e.stopImmediatePropagation();
      const productName = e.target.getAttribute("data-key");
      let qty = e.target.previousElementSibling;
      let tmp = qty.textContent;
      ++tmp;
      qty.textContent = tmp;

      // const data = {
      //   qty: qty,
      // };
      // localStorage.setItem(productName, JSON.stringify(data));
    }
  });
}
