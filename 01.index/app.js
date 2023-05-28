fetch("https://646e69389c677e23218ba227.mockapi.io/Products")
  .then((result) => result.json())
  .then(
    (products) =>
      (document.querySelector(".content").innerHTML = products
        .map(
          (product) =>
            `<div class="card" style="width: 18rem;">
              <img src="${product.productImage}" class="card-img-top" alt="...">
              <div class="card-body">
                  <h5 class="card-title">${product.productName}</h5>
                  <span>
                    <p class="card-text">${product.price} RON</p>
                    <a href="#" class="btn btn-primary">Detail</a>
                  </span>
               </div>   
            </div>
        </div>`
        )
        .join(""))
  );
