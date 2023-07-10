import { productList } from "./json/productsRaizin.js";
const container = document.querySelector("#container");

const dynamicCards = (product) => {
  return `<div class="card flex">              
                <div class="product_image "><img class="inline-block h-12 w-12 rounded-full ring-2 ring-white" src=${product.image}></div>
                <div class="product_title"><p>${product.title}</p></div>
                <div class="product_price"><p><b>$${product.price}</b></p></div>
                <div class="product_description pb"><p>${product.description}</p></div>
                <div class="add"><button class="button-addToCart btn-outline-dark bg-red-100  flex justify-center pt-3" id="${product.id}">Agregar al carrito 🛒</button></div>
          </div>`;
};

const addClickToCartBTN = () => {
  const buttons = document.querySelectorAll("button.button-addToCart");
  for (const button of buttons) {
    button.addEventListener("click", (e) => {
      addToCart(e.target.id);
      saveCart();
      showMessage("El producto se agrego correctamente al carrito 😃");
    });
  }
};

const showMessage = (message) => {
  const msg = document.querySelector(".class-alertas");
  msg.textContent = message;
  setTimeout(() => {
    msg.textContent = "";
  }, 3000);
};

const loadProducts = (array) => {
  container.innerHTML = "";
  if (array.length > 0) {
    array.forEach((product) => {
      container.innerHTML += dynamicCards(product);
    });
    addClickToCartBTN();
  } else {
    container.innerHTML = "No hay productos disponibles";
  }
};

loadProducts(productList);
