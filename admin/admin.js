// constant
const url = `https://646e69389c677e23218ba227.mockapi.io/Products`;
const addNewProduct = document.querySelector(".add-new-product");

//
fetchdata();
addNewProduct.addEventListener("click", onClickCreateInputsForNewProduct);

// function

function populateWithProducts(products) {
  document.querySelector("tbody").innerHTML = products
    .map(
      (product) =>
        `<tr>
          <td><img src="${product.image}" alt="" /></td>
          <td>${product.name}</td>
          <td>${product.price}</td>
          <td>${product.stock}</td>
          <td>
            <button
              type="button"
              class="btn btn-danger remove-product-from-basket"
              product-id="${product.id}"
            >
              Remove
            </button>
          </td>
        </tr>`
    )
    .join("");
}
async function fetchdata() {
  try {
    const response = await fetch(url);
    const products = await response.json();
    populateWithProducts(products);
  } catch (error) {
    console.log(error);
  }
}

function onClickCreateInputsForNewProduct(e) {
  if (e.target.classList.contains("add-new-product")) {
    const inputsForNewProduct = document.querySelector(".container");
    inputsForNewProduct.innerHTML = `
    <div class="antet">
        <div class="flex2">
            <h1>Adaugare produs</h1>
        </div>
        <div class="flex1">
            <button type="button" class="btn btn-primary width-50  save">
              <i class="fa-solid fa-plus"></i>
              Save
            </button>
            <button type="button" class="btn btn-primary width-50 btn-light cancel">
            
              Cancel
            </button>
        </div>
    </div>
    <div class="inputs">

    <div class="input-group mb-3">
        <span class="input-group-text" id="inputGroup-sizing-default">Imagine</span>
        <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
    </div>

    <div class="input-group mb-3">
        <span class="input-group-text" id="inputGroup-sizing-default">Nume</span>
        <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
    </div>

    <div class="input-group input-group-lg mb-3">
        <span class="input-group-text" id="inputGroup-sizing-lg">Descriere</span>
        <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg">
    </div>

    <div class="input-group mb-3">
        <span class="input-group-text" id="inputGroup-sizing-default">Pret</span>
        <input type="number" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
    </div>

    <div class="input-group mb-3">
        <span class="input-group-text" id="inputGroup-sizing-default">Cantitate</span>
        <input type="number" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
    </div>

    </div>
    `;
  }
}
