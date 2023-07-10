import { productList } from "./json/productsRaizin.js";

const saveCart = () => {
  if (productsCart.length > 0) {
    localStorage.setItem("productsCart", JSON.stringify(productsCart));
  }
};

const retrieveCart = () => {
  return JSON.parse(localStorage.getItem("productsCart")) || [];
};

const productsCart = retrieveCart();

const addToCart = (productId) => {
  if (productId > 0) {
    const result = productList.find((product) => product.id === parseInt(productId));
    if (result !== undefined) {
      productsCart.push(result);
      saveCart();
      document.getElementById("message").innerHTML = `Product ${productId} added to cart`;
    } else {
      document.getElementById("message").innerHTML = "I couldn't match and product to that ID";
    }
  }
};

addToCart();
