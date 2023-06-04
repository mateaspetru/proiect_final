// constant
const url = `https://646e69389c677e23218ba227.mockapi.io/Products`;
const addNewProduct = document.querySelector(".add-new-product");
//
fetchdata();

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
