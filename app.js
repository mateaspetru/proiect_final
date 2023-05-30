fetch("https://646e69389c677e23218ba227.mockapi.io/Products")
  .then((result) => result.json())
  .then((products) => {
    document.querySelector(".content").innerHTML = products
      .map(
        (product) =>
          `<div class="card" style="width: 18rem;">
              <img src="${product.productImage}" class="card-img-top" alt="...">
              <div class="card-body">
                  <h5 class="card-title">${product.productName}</h5>
                  <span>
                    <p class="card-text">${product.price} RON</p>
                    <a data-product-id="${product.id}" class="btn btn-primary detailButton">Detail</a>
                  </span>
               </div>
            </div>
        </div>`
      )
      .join("");

    // crearea paginii detail

    const detailButtons = document.querySelectorAll(".detailButton");
    detailButtons.forEach((detailButton) => {
      detailButton.addEventListener("click", function () {
        const productId = detailButton.getAttribute("data-product-id");
        window.open(`detail.html?id=` + productId);
      });
    });
  });