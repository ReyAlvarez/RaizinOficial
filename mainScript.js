import { productList } from "./json/productsRaizin.js";

// <===================== Nav Bar Begins =====================>
const container = document.querySelector("#cards-container");
const burger_btn = document.querySelector("#burger-btn");
burger_btn.addEventListener("click", () => {
  burger_btn.classList.toggle("open");
  if (burger_btn.classList.contains("open")) {
    const slice = document.querySelector("#slice");
    slice.classList.toggle("open");
    slice.classList.toggle("close");
  } else {
    slice.classList.toggle("open");
    slice.classList.toggle("close");
  }
});
// <===================== Nav Bar Ends =====================>

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
      // showMessage(`Agregaste ${e.target.id} al carrito`);
      console.log(productsCart);

      // showMessage("El producto se agrego correctamente al carrito 😃");
    });
  }
};

// const showMessage = (message) => {
//   const msg = document.querySelector("div.class-alertas");
//   msg.textContent = message;
//   setTimeout(() => {
//     msg.textContent = "";
//   }, 3000);
// };

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

// <===================== CART BEGINS =====================>

const productsCart = [];

const addToCart = (productId) => {
  if (productId > 0) {
    const result = productList.find((product) => product.id === parseInt(productId));
    if (result) {
      productsCart.push(result);
      saveCart();
      document.querySelector("#message").innerHTML = `Agregaste ${productId} was added to cart`;
      setTimeout(() => {
        document.querySelector("#message").innerHTML = "";
      }, 2500);
    } else {
      document.querySelector("#message").innerHTML = "";
    }
  }
};

const saveCart = () => {
  if (productsCart.length > 0) {
    localStorage.setItem("productsCart", JSON.stringify(productsCart));
  }
};

const retrieveCart = () => {
  return JSON.parse(localStorage.getItem("productsCart")) || [];
};

const populateCartTable = () => {
  const cartData = retrieveCart();
  const tableBody = document.querySelector("#cartTable tbody");
  tableBody.innerHTML = ""; // Clear the table body before populating

  // Use a map to store the product IDs and their corresponding quantities
  const productQuantityMap = new Map();

  cartData.forEach((product) => {
    // Check if the product ID already exists in the map
    if (productQuantityMap.has(product.id)) {
      // If it exists, increment the quantity
      productQuantityMap.set(product.id, productQuantityMap.get(product.id) + 1);
    } else {
      // If it doesn't exist, set the quantity to 1 and add the product ID to the map
      productQuantityMap.set(product.id, 1);
    }
  });

  cartData.forEach((product) => {
    const row = document.createElement("tr");
    const productNameCell = document.createElement("td");
    const productCategoryCell = document.createElement("td");
    const productPriceCell = document.createElement("td");
    const productQuantityCell = document.createElement("td");
    const productTotalCell = document.createElement("td");

    productNameCell.textContent = product.title;
    productCategoryCell.textContent = product.category;
    productPriceCell.textContent = "$" + product.price.toFixed(2);

    // Get the quantity for the current product from the map
    const quantity = productQuantityMap.get(product.id);
    productQuantityCell.textContent = quantity;

    // Calculate the total price for the product (price * quantity)
    const totalPrice = product.price * quantity;
    productTotalCell.textContent = "$" + totalPrice.toFixed(2); // Display the total price with 2 decimal places

    row.appendChild(productNameCell);
    row.appendChild(productCategoryCell);
    row.appendChild(productPriceCell);
    row.appendChild(productQuantityCell);
    row.appendChild(productTotalCell);
    tableBody.appendChild(row);
  });
};

// const populateCartTable = () => {
//   const cartData = retrieveCart();
//   const tableBody = document.querySelector("#cartTable tbody");
//   tableBody.innerHTML = ""; // Clear the table body before populating

//   cartData.forEach((product) => {
//     const row = document.createElement("tr");
//     const productNameCell = document.createElement("td");
//     const productCategoryCell = document.createElement("td");
//     const productPriceCell = document.createElement("td");

//     productNameCell.textContent = product.title; // Assuming the product object has a 'name' property
//     productCategoryCell.textContent = product.category; // Assuming the product object has a 'category' property
//     productPriceCell.textContent = "$" + product.price; // Assuming the product object has a 'price' property

//     row.appendChild(productNameCell);
//     row.appendChild(productCategoryCell);
//     row.appendChild(productPriceCell);
//     tableBody.appendChild(row);
//   });
// };

// Call the function to populate the table when the page loads or whenever needed
populateCartTable();
