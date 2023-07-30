const confirmBtn = document.querySelector("#confirmBtn");
const confirmOrder = document.querySelector("#confirmOrder");
let productList = [];
let cart = [];
let total = 0;

// <===================== Nav Bar Begins =====================>
const container = document.querySelector("#cards-container");
const burger_btn = document.querySelector("#burger-btn");
document.querySelector("#grandTotal").innerHTML = `$ ${total.toFixed(2)}`;
// document.querySelector("#grandTotal").innerHTML = `$ ${total.toFixed(2)}`;

burger_btn.addEventListener("click", () => {
  burger_btn.classList.toggle("open");
  const slice = document.querySelector("#slice");
  slice.classList.toggle("open");
  slice.classList.toggle("close");
});

// <===================== Nav Bar Ends =====================>

// Add an event once the JSON is ready
document.addEventListener("DOMContentLoaded", () => {
  // Obtenemos los datos del JSON usando fetch
  fetch("./json/productsRaizin.json")
    .then((response) => response.json())
    .then((data) => {
      // Asignamos los datos a la variable productList
      productList.push(...data.products);
      // Cargamos los productos en el contenedor
      printProducts(productList);
    })
    .catch((error) => {
      container.innerHTML = `
      <div class="d-block p-4 bg-danger rounded text-center text-white">
      <p>Error fetching product data:<p>
      <br/>
      <p>${error}</p>
      </div>
      `;
    });

  // if (localStorage.getItem("cart")) {
  //   renderCartTable(localStorage.getItem("cart"));
  // }
});

//Create a card dynamically
const dynamicCards = (product) => {
  return `<div class="card flex">              
                <div class="product_image"><img class="inline-block h-12 w-12 rounded-full ring-2 ring-white" src=${product.image}></div>
                <div class="product_title"><p>${product.title}</p></div>
                <div class="product_price"><p><b>$${product.price}</b></p></div>
                <div class="product_description pb"><p>${product.description}</p></div>
                <div class="add"><button class="button-addToCart btn-outline-dark bg-red-100  flex justify-center pt-3" id="${product.id}">Agregar al carrito 🛒</button></div>
          </div>`;
};

// Prints the product list.
const printProducts = (array) => {
  container.innerHTML = "";
  array.forEach((product) => {
    container.innerHTML += dynamicCards(product);
  });
  addListenersToCartBTN();
};

function addListenersToCartBTN() {
  const buttons = document.querySelectorAll("button.button-addToCart");
  for (let button of buttons) {
    button.addEventListener("click", (e) => {
      const selectedProduct = productList.find((product) => product.id === parseInt(e.target.id));

      if (selectedProduct && selectedProduct.stock > 0) {
        addToCart(e.target.id);
        Swal.fire({
          title: `Agregaste ${selectedProduct.title} al carrito`,
          icon: "success",
          showConfirmButton: false,
          timer: 1000,
        });
      } else if (selectedProduct && selectedProduct.stock === 0) {
        Swal.fire({
          title: `No hay stock de ${selectedProduct.title}`,
          icon: "error",
          showConfirmButton: false,
          timer: 1000,
        });
      }
    });
  }
}

// <===================== CART BEGINS =====================>

// const productsCart = JSON.parse(localStorage.getItem("cart")) || [];

const addToCart = (productId) => {
  const selectedProduct = productList.find((product) => product.id === parseInt(productId));

  if (selectedProduct.stock <= 0) {
    Swal.fire({
      title: `No hay stock de ${selectedProduct.title}`,
      icon: "error",
      showConfirmButton: false,
      timer: 1000,
    });

    return;
  }

  if (selectedProduct.stock > 0) {
    // Check if the product is already in the cart
    const exists = cart.some((product) => product.id === selectedProduct.id);

    if (exists) {
      const cartUpdated = cart.map((product) => {
        if (product.id === selectedProduct.id) {
          product.quantity++;
          product.stock--;
          return product;
        }
        return product;
      });

      cart = cartUpdated;
    } else {
      cart.push({ ...selectedProduct, quantity: 1, stock: selectedProduct.stock - 1 });
    }

    console.log(cart);

    saveCart();
    calculateGrandTotal(cart);
    updateProductsCounter();
    renderCartTable(cart); // Added this line to update the cart table
  }
};

const subtractFromCart = (productId) => {
  const cartUpdated = cart.map((product) => {
    if (product.id === productId && product.quantity > 1) {
      product.quantity--;
      return product;
    }
    return product;
  });
  cart = cartUpdated;
  saveCart();
  calculateGrandTotal(cartUpdated);
  updateProductsCounter();
  renderCartTable(cartUpdated);
};

const deleteFromCart = (productId) => {
  const cartUpdated = cart.filter((product) => product.id !== productId);
  renderCartTable(cartUpdated);
};

// confirmBtn.addEventListener("click", () => {
//   Swal.fire({
//     title: `Tu pedido fue realizado con EXITO`,
//     icon: "success",
//     showConfirmButton: false,
//     timer: 1000,
//   });
//   localStorage.removeItem("cart");

//   // A Probar ******************** <<<<------
// });

const saveCart = () => {
  // Save products to local storage
  localStorage.setItem("cart", JSON.stringify(cart));
};

// Function to update the grand total dynamically
const updateProductsCounter = () => {
  const totalProducts = cart.reduce((acc, product) => acc + product.quantity, 0);
  document.querySelector("#totalProducts").textContent = totalProducts;
};

// Function to calculate the grand total
const calculateGrandTotal = (productsList) => {
  productsList.forEach((product) => {
    const totalProductPrice = product.price * product.quantity;
    total += totalProductPrice;
  });
};

// Load items from Local storage and show them on the cart
const renderCartTable = (products) => {
  const tableBody = document.querySelector("#cartTable tbody");

  tableBody.innerHTML = ""; // Clear the table body before populating

  products.forEach((product) => {
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
    productTotalCell.textContent = "$" + total; // Display the total price with 2 decimal places

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

    // Update the cart table with shipping and grand total
    const tableFooter = document.querySelector("#cartTable tfoot");
    tableFooter.innerHTML = ""; // Clear the table footer before updating

    const grandTotalRow = document.createElement("tr");
    grandTotalRow.innerHTML = `<td colspan="5" class="text-end">Grand Total:</td><td>$${total.toFixed(2)}</td>`;
    tableFooter.appendChild(grandTotalRow);

    updateProductsCounter();
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
