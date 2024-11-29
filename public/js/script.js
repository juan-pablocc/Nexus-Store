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

    const cardProduto = `
    <div class="card" data-id="${features.id}">
      <div class="image">
        <img src="${features.image}" alt="${features.title}" />
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
      </div>
    </div>
    `;

    content.innerHTML += cardProduto;
  });

  const buttons = document.querySelectorAll("button.card-button");
  const numberCart = document.querySelector("span.quantity");
  buttons.forEach((bt) => {
    bt.addEventListener("click", (e) => {
      const cardElement = e.target.closest(".card");
      const featuresCard = {
        id: cardElement.dataset.id,
        img: cardElement.querySelector(".image > img").src,
        title: cardElement.querySelector(".card-info > .name").innerHTML,
        price: cardElement.querySelector(".card-footer > span").innerHTML,
        quantity: 1, // Inicializa a quantidade
      };

      // Verifica se o item já está no carrinho e aumenta a quantidade
      const existingItem = cart.find((item) => item.id === featuresCard.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push(featuresCard);
      }

      numberCart.innerHTML = cart.length;
    });
  });

  const cards = document.querySelectorAll(".card");

  cards.forEach((card) => {
    card.addEventListener("click", () => {
      document.querySelector(".produto-view").classList.remove("desactive");
      document.querySelector(".produto-view").classList.add("active");
    });
  });
}

document.getElementById("shop-car").addEventListener("click", () => {
  document.querySelector(".shopcar-content").classList.remove("desactive");
  document.querySelector(".shopcar-content").classList.add("active");

  displayProductCart(cart);
  displayValores();
});

function displayProductCart(cart) {
  const product_sales = document.getElementById("products-sales");

  // Limpar o carrinho antes de exibir novos itens
  product_sales.innerHTML = "";

  if (cart.length === 0) {
    product_sales.innerHTML = `<p class="empty-cart-message">O carrinho está vazio</p>`;
  } else {
    cart.forEach((i, index) => {
      const item = `
      <div class="pedido" data-id="${i.id}">
        <div class="pedido-img">
          <img src="${i.img}" alt="${i.title}" />
        </div>
        <div class="pedido-content">
          <h4>${i.title}</h4>
          <p>${i.price}</p>
          <div class="quantity-container">
            <button type="button" class="btn-decrease">-</button>
            <input type="number" class="quantity" readonly value="${i.quantity}" min="1" />
            <button type="button" class="btn-increase">+</button>
          </div>
        </div>
      </div>
    `;
      product_sales.innerHTML += item;
    });

    // Atualizar a quantidade e remover itens
    document.querySelectorAll(".btn-decrease").forEach((btn, index) => {
      btn.addEventListener("click", () => {
        const input = btn.closest(".pedido").querySelector(".quantity");
        let newQuantity = Math.max(0, parseInt(input.value) - 1);
        input.value = newQuantity;
        cart[index].quantity = newQuantity;

        // Se a quantidade for 0, remove o item do carrinho
        if (newQuantity === 0) {
          cart.splice(index, 1); // Remove o item do carrinho
        }

        displayValores();
        updateCartNumber(cart);
        displayProductCart(cart); // Reexibe o carrinho atualizado
      });
    });

    document.querySelectorAll(".btn-increase").forEach((btn, index) => {
      btn.addEventListener("click", () => {
        const input = btn.closest(".pedido").querySelector(".quantity");
        let newQuantity = parseInt(input.value) + 1;
        input.value = newQuantity;
        cart[index].quantity = newQuantity;

        displayValores();
      });
    });
  }
}

function displayValores() {
  const contentTotalValue = document.querySelector("p.total-produtos");
  const contentFreteValue = document.querySelector("p.total-frete");
  const contentTotalPageValue = document.querySelector("p.total-pagamento");

  let soma = 0;

  cart.forEach((item) => {
    const price = parsePrice(item.price); // Usar a função para tratar o preço
    soma += price * item.quantity;
  });

  const frete = (soma * 0.1).toFixed(2); // Calcula 10% de frete
  const total = (soma + parseFloat(frete)).toFixed(2);

  if (soma == 0) {
    contentTotalValue.innerHTML = "0,00";
  } else {
    contentTotalValue.innerHTML = soma;
  }

  contentFreteValue.innerHTML = frete;
  contentTotalPageValue.innerHTML = total;
}

// Função para tratar o preço, removendo caracteres não numéricos
function parsePrice(price) {
  return parseFloat(price.replace(/[^\d.]/g, ""));
}

// Função para atualizar o número de itens no carrinho
function updateCartNumber(cart) {
  const numberCart = document.querySelector("span.quantity");
  numberCart.innerHTML = cart.length;
}
