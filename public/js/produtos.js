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
      <div class="card-imageDiv">
        <img class="card-image" src="${features.image}" />
      </div>
      <h2 class="title" translate="yes">${features.title}</h2>
      <div class="sales">
        <span class="count">Vendas: ${features.count}</span>
        <span class="rate">${features.rate}</span>
      </div>
    </div>
    `;

    content.innerHTML += cardProduto;
  });
}
