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

export const retrieveCart = () => {
  return JSON.parse(localStorage.getItem("productsCart")) || [];
};

export const showCartItems = retrieveCart();
// console.log(showCartItems);

function displayCartItems() {
  const tableBody = document.querySelector("#cartTable tbody");
  tableBody.innerHTML = "";

  showCartItems.forEach((item) => {
    const row = document.createElement("tr");
    const nameCell = document.createElement("td");
    const priceCell = document.createElement("td");

    nameCell.textContent = item.title;
    priceCell.textContent = item.price;
    // imageCell.textContent = item.image;

    row.appendChild(nameCell);
    row.appendChild(priceCell);
    tableBody.appendChild(row);
  });
}
displayCartItems();
