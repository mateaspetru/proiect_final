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
          // ` <div class="card">
          //     <img src="${product.productImage}" alt="" />
          //     <h1 class="product-name">${product.productName}</h1>
          //     <h3 class="product-price">${product.price} RON</h3>
          //     <a class="nav-link active" aria-current="page" href="#"
          //   ><i class="fa-solid fa-basket-shopping"></i>Adauga in cos</a
          // >
          //     </div>`
        )
        .join(""))
  );
