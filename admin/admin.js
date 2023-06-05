// constant
const url = `https://646e69389c677e23218ba227.mockapi.io/Products`;
const addNewProduct = document.querySelector(".add-new-product");
const tBody = document.querySelector("tbody");
// end of constants

//call
fetchdata();
addNewProduct.addEventListener("click", onClickCreateInputsForNewProduct);
tBody.addEventListener("click", removeProductFromDataBase);
// end of call

// function
function populateWithProducts(products) {
  document.querySelector("tbody").innerHTML = products
    .map(
      (product) =>
        `<tr>
          <td><img src="${product.image}" alt="" /></td>
          <td class="product-name" product-id="${product.id}"> ${product.name}</td>
          <td>${product.price}</td>
          <td>${product.stock}</td>
          <td>
            <button
              type="button"
              class="btn btn-danger remove-product-from-api"
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
        <input type="text" class="form-control imagine-produs" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
    </div>

    <div class="input-group mb-3">
        <span class="input-group-text" id="inputGroup-sizing-default">Nume</span>
        <input type="text" class="form-control nume-produs" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
    </div>

    <div class="input-group input-group-lg mb-3">
        <span class="input-group-text" id="inputGroup-sizing-lg">Descriere</span>
        <input type="text" class="form-control descriere-produs" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg">
    </div>

    <div class="input-group mb-3">
        <span class="input-group-text" id="inputGroup-sizing-default">Pret</span>
        <input type="number" class="form-control pret-produs" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
    </div>

    <div class="input-group mb-3">
        <span class="input-group-text" id="inputGroup-sizing-default">Cantitate</span>
        <input type="number" class="form-control cantitate-produs" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
    </div>

    </div>
    `;
  }
  document
    .querySelector(".cancel")
    .addEventListener("click", restoreProductsTable);

  document.querySelector(".save").addEventListener("click", newProductCreate);
}

function restoreProductsTable(e) {
  if (e.target.classList.contains("cancel")) {
    location.reload();
  }
}

function removeProductFromDataBase(e) {
  if (e.target.classList.contains("remove-product-from-api")) {
    const removeBtn = e.target;
    const atributeId = removeBtn.getAttribute("product-id");

    fetch(url + "/" + atributeId, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.ok) {
        location.reload();
      }
    });
  }
}

function newProductCreate() {
  const imagine = document.querySelector(".imagine-produs").value;
  const nume = document.querySelector(".nume-produs").value;
  const descriere = document.querySelector(".descriere-produs").value;
  const pret = document.querySelector(".pret-produs").value;
  const cantitate = document.querySelector(".cantitate-produs").value;
  const product = {
    name: nume,
    price: pret,
    image: imagine,
    detail: descriere,
    stock: cantitate,
  };
  console.log(product);
  return product;
}

function postProduct(product) {
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "aplication/json",
    },
    body: JSON.stringify(product),
  });
}

// end of function
