const url = `https://646e69389c677e23218ba227.mockapi.io/Products`;
fetch(url)
  .then((result) => result.json())
  .then((products) => {
    createCards(products);

    detailButton();
  });

function detailButton() {
  const detailButtons = document.querySelectorAll(".detailButton");
  detailButtons.forEach((detailButton) => {
    detailButton.addEventListener("click", function () {
      const productId = detailButton.getAttribute("data-product-id");
      window.location.href = `/detail/detail.html?id=${productId}`;
    });
  });
}

function createCards(products) {
  document.querySelector(".content").innerHTML = products
    .map(
      (product) =>
        `<div class="card" style="width: 18rem;">
          <img src="${product.image}" class="card-img-top" alt="...">
          <div class="card-body">
              <h5 class="card-title">${product.name}</h5>
              <span>
                <p class="card-text">${product.price} RON</p>
                <a  data-product-id="${product.id}" class="btn btn-primary btn-success detailButton">Detail</a>
              </span>
           </div>
        </div>
    </div>`
    )
    .join("");
}
