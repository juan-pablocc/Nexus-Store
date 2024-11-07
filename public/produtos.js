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
    <div class="produto">
        <img
          src="${features.image}"
          alt=""
          class="img-produto"
        />
        <h2 class="nome">${features.title}</h2>
        <p class="descricao">${features.description}</p>
        <div>
          <p class="valor">${features.price}</p>
          <p><span class="vendidos">${features.count}</span>
          <span class="avaliacao">${features.rate}</span></p>
        </div>
      </div>
    `;

    content.innerHTML += cardProduto;
  });
}
