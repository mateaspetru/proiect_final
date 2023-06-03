const url = `https://646e69389c677e23218ba227.mockapi.io/Products`;

fetch(url)
  .then((result) => result.json())
  .then((products) => {
    populateWithProducts(products);
  });

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
            >
              Remove
            </button>
          </td>
        </tr>`
    )
    .join("");
}
