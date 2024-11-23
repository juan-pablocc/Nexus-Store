document.getElementById("fechar").addEventListener("click", () => {
  document.querySelector(".shopcar-content").classList.remove("active");
  document.querySelector(".shopcar-content").classList.add("desactive");
});

document.getElementById("shop-car").addEventListener("click", () => {
  document.querySelector(".shopcar-content").classList.remove("desactive");
  document.querySelector(".shopcar-content").classList.add("active");
});
