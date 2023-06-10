const keys = Object.keys(localStorage);
const url = `https://646e69389c677e23218ba227.mockapi.io/Products`;
const tableBody = document.querySelector("tbody");
const productQty = document.querySelector(".product-qty");
let rowCount = [];
let totalPrice = [];
console.log(totalPrice);
keys.forEach((key) => {
  const value = localStorage.getItem(key);
  const keyName = JSON.parse(value);
  rowCount.push(parseInt(keyName["qty"]));

  fetch(url + "/" + keyName["idOfElement"])
    .then((result) => result.json())
    .then((product) => {
      populateWithProduct(product, keyName);
      totalPrice.push(parseInt(subtotal(product, keyName)));
      removeProductFromCart();
    });
});
numberOfProducts();

function populateWithProduct(product, keyName) {
  const tr = document.createElement("tr");
  tr.classList = "number-of-product";
  tr.innerHTML = `
        <td>${product.name}</td>
        <td class="product-price">${product.price} Ron</td>
        <td class="product-qty">${keyName["qty"]} Buc</td>
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

// function totalPriceOfProducts() {
//   const total = document.querySelector(".card-title");
//   const sum = totalPrice.reduce(
//     (acumulator, curentValue) => acumulator + curentValue,
//     0
//   );
//   console.log(sum);
// }

// totalPriceOfProducts();
