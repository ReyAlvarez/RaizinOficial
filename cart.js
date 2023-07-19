// <===================== IMPORTS =====================>

import { productList } from "./json/productsRaizin.js";

export const productsCart = [];
export const saveCart = () => {
  if (productsCart.length > 0) {
    localStorage.setItem("productsCart", JSON.stringify(productsCart));
  }
};

export const addToCart = (productId) => {
  if (productId > 0) {
    const result = productList.find((product) => product.id === parseInt(productId));
    if (result) {
      productsCart.push(result);
      saveCart();
      document.getElementById("message").innerHTML = `Agregaste ${productId} was added to cart`;
    } else {
      document.getElementById("message").innerHTML = "";
    }
  }
};

const retrieveCart = () => {
  return JSON.parse(localStorage.getItem("productsCart")) || [];
};

const productsCart = retrieveCart();
