import { productList } from "./json/productsRaizin.js";
const container = document.querySelector("#container");

const dynamicCards = (product) => {
  return `<div class="card flex">              
                <div class="product_image "><img class="inline-block h-12 w-12 rounded-full ring-2 ring-white" src=${product.image}></div>
                <div class="product_title"><p>${product.title}</p></div>
                <div class="product_price"><p><b>$${product.price}</b></p></div>
                <div class="product_description pb"><p>${product.description}</p>
                <div class="add"><button class="button-addToCart flex justify-center pt-3 " id="${product.id}">Agregar al carrito</button></div>
          </div>`;
};
console.log(dynamicCards);
function loadProducts() {
  productList.forEach((product) => {
    container.innerHTML += dynamicCards(product);
  });
}
loadProducts();
