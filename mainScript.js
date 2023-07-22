import { addToCart, saveCart, productsCart, showCartItems } from "./cart.js";
// import { saveCart } from "./cart.js";
import { productList } from "./json/productsRaizin.js";

// <===================== VARIABLES =====================>
const cart = document.querySelector("#cart");
const cartContainer = document.querySelector("#product-list");
const emptyCartBtn = document.querySelector("#empty-cart");
const productListAdd = document.querySelector("#product-list");
// let productsCart = [];
export function loadCartEventListeners() {
  // Cuando agregas un curso presionando el Btn agregar al carrito
  productListAdd.addEventListener("click", addProduct);

  // Eliminar cursos del carrito
  cart.addEventListener("click", deleteProduct);

  //Vaciar Carrito
  emptyCartBtn.addEventListener("click", () => {
    productsNavCart = []; // Reseteamos el Arreglo para que quede vacio nuevamente
    limpiarHTML(); // Eliminamos todo el HTML
  });
}

// <===================== FUNCIONES =====================>
// Add Product to nav cart
function addProduct(e) {
  e.preventDefault();
  if (e.target.classList.contains("add-product")) {
    const selectedProduct = e.target.parentElement.parentElement;
    readProductData(selectedProduct);
  }
}

// Eliminar Curso
function deleteProduct(e) {
  if (e.target.classList.contains("delete-product")) {
    const productId = e.target.getAttribute("data-id");
    // Elimina del arreglo productsCart con el data-id
    productsNavCart = productsCart.filter((product) => product.id !== productId);
    productHTML();
  }
}

// Lee el contenido del HTML al que le dimos click y extrae la informacion del curso
function readProductData(product) {
  //   console.log(product);
  // Crear un objeto con el contenido del curso actual
  const infoProduct = {
    imagen: product.querySelector("img").src,
    titulo: product.querySelector("h4").textContent,
    precio: product.querySelector(".precio span").textContent,
    id: product.querySelector("a").getAttribute("data-id"), // Mediante getAttribiute() extraigo la informacion de data-id para darsela a el key del objeto infoCurso
    cantidad: 1,
  };
  // Revisa si un elemento ya existe en el carrito.

  const exists = productsNavCart.some((product) => product.id === infoProduct.id); // .some() devuelve boolean
  if (exists) {
    // Actualizo cantidad carrito
    const products = productsNavCart.map((product) => {
      if (product.id === infoProduct.id) {
        product.cantidad++;
        return product; // Retorna el objeto actualizado
      } else {
        return product; // Retorna los objetosque no son los duplicados pero que siguen siendo importantes para nuestro carrito de compras
      }
    });
  } else {
    // Agrega el elemento al carrito
    productsNavCart = [...productsNavCart, infoProduct];
  }

  //Agrega elementos al arreglo del carrito

  console.log(productsNavCart);
  productHTML();
}

// Muestra el Carrito de compras en el HTML <=====================

function productHTML() {
  // Limpar el HTML
  // limpiarHTML();         <-------- Descomentar !!!

  // Recorre el carrito y genera el HTML
  productsNavCart.forEach((product) => {
    const { imagen, titulo, precio, cantidad, id } = product; // Destructuring

    const row = document.createElement("tr");
    row.innerHTML = `
    <tr>
    <td><img src=${product.imagen} width="100px"></td>
        <td>${product.titulo}</td>
        <td>${product.precio}</td>
        <td>${product.cantidad}</td>
        <td>
        <a href="#" class="delete-product" data-id="${product.id}"> X </a>
        </td>
    </tr>
        `;

    // Agrega el HTML del carrito en el tbody
    cartContainer.appendChild(row);
  });
}

// Eliminar los cursos del tbody
function limpiarHTML() {
  //   cartContainer.innerHTML = "";  // Forma LENTA de borrar
  //
  while (cartContainer.firstChild) {
    cartContainer.removeChild(cartContainer.firstChild);
  }
}

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
      console.log(productsCart);

      // showMessage("El producto se agrego correctamente al carrito 😃");
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
