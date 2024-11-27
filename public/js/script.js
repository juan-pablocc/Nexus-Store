let cart = [];
// Botão ABRIR/FECHAR
document.getElementById("fechar").addEventListener("click", () => {
  document.querySelector(".shopcar-content").classList.remove("active");
  document.querySelector(".shopcar-content").classList.add("desactive");
});

(async () => {
  const response = await fetch("https://fakestoreapi.com/products");
  const data = await response.json();

  displayProducts(data);
})();

function displayProducts(data) {
  const content = document.querySelector(".produtos-content");

  data.forEach((el) => {
    const features = {
      category: el.category,
      description: el.description,
      id: el.id,
      image: el.image,
      price: el.price,
      rate: el.rating.rate,
      count: el.rating.count,
      title: el.title,
    };
    // console.log("Features: ", features);

    const cardProduto = `
    <div class="card">
        <div class="image">
          <img src="${features.image}" alt="" />
        </div>
        <div class="card-info">
          <p class="text-title name">${features.title}</p>
          <div class="rate">
            <div class="rating">
              <input type="radio" name="rating" id="star5" value="5" class="input" />
              <label for="star5" class="star label"></label>

              <input type="radio" name="rating" id="star4" value="4" class="input" />
              <label for="star4" class="star label"></label>

              <input type="radio" name="rating" id="star3" value="3" class="input" />
              <label for="star3" class="star label"></label>

              <input type="radio" name="rating" id="star2" value="2" class="input" />
              <label for="star2" class="star label"></label>

              <input type="radio" name="rating" id="star1" value="1" class="input" />
              <label for="star1" class="star label"></label>
            </div>
          </div>
        </div>
        <div class="card-footer">
          <span class="text-title">$${features.price}</span>
          <button class="card-button">
            <svg class="svg-icon" viewBox="0 0 20 20">
              <path
                d="M17.72,5.011H8.026c-0.271,0-0.49,0.219-0.49,0.489c0,0.271,0.219,0.489,0.49,0.489h8.962l-1.979,4.773H6.763L4.935,5.343C4.926,5.316,4.897,5.309,4.884,5.286c-0.011-0.024,0-0.051-0.017-0.074C4.833,5.166,4.025,4.081,2.33,3.908C2.068,3.883,1.822,4.075,1.795,4.344C1.767,4.612,1.962,4.853,2.231,4.88c1.143,0.118,1.703,0.738,1.808,0.866l1.91,5.661c0.066,0.199,0.252,0.333,0.463,0.333h8.924c0.116,0,0.22-0.053,0.308-0.128c0.027-0.023,0.042-0.048,0.063-0.076c0.026-0.034,0.063-0.058,0.08-0.099l2.384-5.75c0.062-0.151,0.046-0.323-0.045-0.458C18.036,5.092,17.883,5.011,17.72,5.011z"
              ></path>
              <path
                d="M8.251,12.386c-1.023,0-1.856,0.834-1.856,1.856s0.833,1.853,1.856,1.853c1.021,0,1.853-0.83,1.853-1.853S9.273,12.386,8.251,12.386z M8.251,15.116c-0.484,0-0.877-0.393-0.877-0.874c0-0.484,0.394-0.878,0.877-0.878c0.482,0,0.875,0.394,0.875,0.878C9.126,14.724,8.733,15.116,8.251,15.116z"
              ></path>
              <path
                d="M13.972,12.386c-1.022,0-1.855,0.834-1.855,1.856s0.833,1.853,1.855,1.853s1.854-0.83,1.854-1.853S14.994,12.386,13.972,12.386z M13.972,15.116c-0.484,0-0.878-0.393-0.878-0.874c0-0.484,0.394-0.878,0.878-0.878c0.482,0,0.875,0.394,0.875,0.878C14.847,14.724,14.454,15.116,13.972,15.116z"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    `;

    content.innerHTML += cardProduto;
  });

  const buttons = document.querySelectorAll("button.card-button");
  buttons.forEach((bt) => {
    bt.addEventListener("click", (e) => {
      const cardElement = e.target.closest(".card");
      const featuresCard = {
        img: cardElement.querySelector(".image > img").src,
        title: cardElement.querySelector(".card-info > .name").innerHTML,
        price: cardElement.querySelector(".card-footer > span").innerHTML,
      };
      cart.push(featuresCard);
    });
  });
}

document.getElementById("shop-car").addEventListener("click", () => {
  document.querySelector(".shopcar-content").classList.remove("desactive");
  document.querySelector(".shopcar-content").classList.add("active");

  displayProductCart(cart);
});

function displayProductCart(cart) {
  const product_sales = document.getElementById("products-sales");

  // Clear the cart before displaying new items
  product_sales.innerHTML = "";

  cart.forEach((i) => {
    const item = `
      <div class="pedido">
        <div class="pedido-img">
          <img src="${i.img}" alt="" />
        </div>
        <div class="pedido-content">
          <h4>${i.title}</h4>
          <p>${i.price}</p>
          <input type="number" name="quantity" id="quantity" step="1" value="1" min="1" />
        </div>
      </div>
    `;

    product_sales.innerHTML += item;
  });
}
