import { productList } from "./json/productsRaizin.js";
const confirmBtn = document.querySelector("#confirmBtn");
const confirmOrder = document.querySelector("#confirmOrder");

confirmBtn.addEventListener("click", () => {
  confirmOrder.innerHTML = "Tu compra fue realizada correctamente";
  setTimeout(() => {
    confirmOrder.innerHTML = "";
  }, 2500);
});
// <===================== Nav Bar Begins =====================>
const container = document.querySelector("#cards-container");
const burger_btn = document.querySelector("#burger-btn");
burger_btn.addEventListener("click", () => {
  burger_btn.classList.toggle("open");
  const slice = document.querySelector("#slice");
  slice.classList.toggle("open");
  slice.classList.toggle("close");
});
// <===================== Nav Bar Ends =====================>

// Add and evennt once the JSON is ready
document.addEventListener("DOMContentLoaded", () => {
  // Obtenemos los datos del JSON usando fetch
  fetch("./json/productsRaizin.json")
    .then((response) => response.json())
    .then((data) => {
      // Asignamos los datos a la variable productList
      productList.push(...data.products);
      // Cargamos los productos en el contenedor
      loadProducts(productList);
    })
    .catch((error) => {
      console.error("Error fetching product data:", error);
    });
});
//Create the card dynamically
const dynamicCards = (product) => {
  return `<div class="card flex">              
                <div class="product_image"><img class="inline-block h-12 w-12 rounded-full ring-2 ring-white" src=${product.image}></div>
                <div class="product_title"><p>${product.title}</p></div>
                <div class="product_price"><p><b>$${product.price}</b></p></div>
                <div class="product_description pb"><p>${product.description}</p></div>
                <div class="add"><button class="button-addToCart btn-outline-dark bg-red-100  flex justify-center pt-3" id="${product.id}">Agregar al carrito 🛒</button></div>
          </div>`;
};

function addClickToCartBTN() {
  const buttons = document.querySelectorAll("button.button-addToCart");
  for (let button of buttons) {
    button.addEventListener("click", (e) => {
      const productId = e.target.id;
      const selectedProduct = productList.find((product) => product.id === parseInt(productId));

      if (selectedProduct && selectedProduct.stock > 0) {
        addToCart(productId);
        document.querySelector("#message").innerHTML = `Agregaste ${selectedProduct.title} al carrito`;
        setTimeout(() => {
          document.querySelector("#message").innerHTML = "";
        }, 2500);
      } else {
        document.querySelector("#message").innerHTML = "No hay stock disponible para este producto.";
        setTimeout(() => {
          document.querySelector("#message").innerHTML = "";
        }, 2500);
      }
    });
  }
}

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

const productsCart = JSON.parse(localStorage.getItem("cart")) || [];

const addToCart = (productId) => {
  if (productId > 0) {
    const selectedProduct = productList.find((product) => product.id === parseInt(productId));

    if (selectedProduct) {
      // Check if the product is already in the cart
      const cartItem = productsCart.find((item) => item.id === selectedProduct.id);
      if (cartItem) {
        cartItem.quantity++;
      } else {
        productsCart.push({ ...selectedProduct, quantity: 1 });
      }

      saveCart();
      updateGrandTotal();
      updateTotalProducts();
      document.querySelector("#message").innerHTML = `Agregaste ${selectedProduct.title} al carrito`;
      setTimeout(() => {
        document.querySelector("#message").innerHTML = "";
      }, 2500);
    } else {
      document.querySelector("#message").innerHTML = "";
    }
  }
};

const subtractFromCart = (productId) => {
  if (productId > 0) {
    const index = productsCart.findIndex((product) => product.id === productId);
    if (index !== -1) {
      productsCart[index].quantity--;
      if (productsCart[index].quantity === 0) {
        productsCart.splice(index, 1); // Remove the product from the cart if quantity becomes 0
      }
      saveCart();
      populateCartTable(); // Update the cart table after subtracting
    }
  }
};

const deleteFromCart = (productId) => {
  if (productId > 0) {
    const index = productsCart.findIndex((product) => product.id === productId);
    if (index !== -1) {
      productsCart.splice(index, 1); // Remove the product from the cart
      saveCart();
      populateCartTable(); // Update the cart table after deleting
    }
  }
};

const saveCart = () => {
  // Save products to local storage
  localStorage.setItem("cart", JSON.stringify(productsCart));
};

// Function to apply the discount code and update the grand total

const applyDiscount = () => {
  const discountCode = document.querySelector("#discount").value;
  // aplly your discount code and calculate the discount amount
  const discountAmount = 10;
  // Add event listener for the Apply Discount button
  document.querySelector("#applyDiscount").addEventListener("click", applyDiscount);

  // Calculate the grand total with the discount applied
  const grandTotal = calculateGrandTotal();
  const totalWithDiscount = grandTotal - discountAmount;

  // Display the updated grand total
  document.querySelector("#grandTotal").textContent = "$" + totalWithDiscount.toFixed(2);
};

// Function to update the grand total dynamically
const updateGrandTotal = () => {
  const grandTotal = calculateGrandTotal();
  document.querySelector("#grandTotal").textContent = "$" + grandTotal.toFixed(2);
};

// Function to calculate the grand total
const calculateGrandTotal = () => {
  let total = 0;
  productsCart.forEach((product) => {
    const totalPrice = product.price * product.quantity;
    total += totalPrice;
  });
  // Add shipping to the total
  const shipping = parseFloat(document.querySelector("#shipping").value);
  total += isNaN(shipping) ? 0 : shipping;

  return total;
};

// Function to update the total products count
const updateTotalProducts = () => {
  const totalProducts = productsCart.reduce((acc, product) => acc + product.quantity, 0);
  document.querySelector("#totalProducts").textContent = totalProducts;
};

const grandTotal = calculateGrandTotal();
document.querySelector("#grandTotal").textContent = "$" + grandTotal.toFixed(2);

// Load items from Local storage and show them on the cart
const populateCartTable = () => {
  const tableBody = document.querySelector("#cartTable tbody");
  tableBody.innerHTML = ""; // Clear the table body before populating

  productsCart.forEach((product) => {
    const row = document.createElement("tr");
    const productNameCell = document.createElement("td");
    const productCategoryCell = document.createElement("td");
    const productPriceCell = document.createElement("td");
    const productQuantityCell = document.createElement("td");
    const productTotalCell = document.createElement("td");
    const productActionsCell = document.createElement("td"); // Cell for buttons

    productNameCell.textContent = product.title;
    productCategoryCell.textContent = product.category;
    productPriceCell.textContent = "$" + product.price.toFixed(2);
    productQuantityCell.textContent = product.quantity;

    // Calculate the total price for the product (price * quantity)
    const totalPrice = product.price * product.quantity;
    productTotalCell.textContent = "$" + totalPrice.toFixed(2); // Display the total price with 2 decimal places

    // Create buttons for actions
    const addButton = document.createElement("button");
    addButton.classList.add("quantity-btn");
    addButton.textContent = " + ";
    addButton.addEventListener("click", () => {
      addToCart(product.id); // increase quantity
    });

    const subtractButton = document.createElement("button");
    subtractButton.classList.add("quantity-btn");
    subtractButton.textContent = " - ";
    subtractButton.addEventListener("click", () => {
      subtractFromCart(product.id); // decrease quantity
    });

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-btn");
    deleteButton.textContent = "Borrar";
    deleteButton.addEventListener("click", () => {
      deleteFromCart(product.id); //remove the product from cart
    });

    updateTotalProducts();
    // Append buttons to the actions cell
    productActionsCell.appendChild(addButton);
    productActionsCell.appendChild(subtractButton);
    productActionsCell.appendChild(deleteButton);

    row.appendChild(productNameCell);
    row.appendChild(productCategoryCell);
    row.appendChild(productPriceCell);
    row.appendChild(productQuantityCell);
    row.appendChild(productTotalCell);
    row.appendChild(productActionsCell); // Append the actions cell to the row

    tableBody.appendChild(row);
  });
};

// Invoke populateCartTable once the page is loaded
populateCartTable();
