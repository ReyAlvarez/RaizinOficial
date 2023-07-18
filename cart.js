import { productList } from "./json/productsRaizin.js";

// <===================== VARIABLES =====================>
const carrito = document.querySelector("#carrito");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");
const listaCursos = document.querySelector("#lista-cursos");
let articulosCarrito = [];

export function loadCartEventListeners() {
  // Cuando agregas un curso presionando el Btn agregar al carrito
  listaCursos.addEventListener("click", agregarCurso);

  // Eliminar cursos del carrito
  carrito.addEventListener("click", eliminarCurso);

  //Vaciar Carrito
  vaciarCarritoBtn.addEventListener("click", () => {
    articulosCarrito = []; // Reseteamos el Arreglo para que quede vacio nuevamente
    limpiarHTML(); // Eliminamos todo el HTML
  });
}

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

// const retrieveCart = () => {
//   return JSON.parse(localStorage.getItem("productsCart")) || [];
// };

// const productsCart = retrieveCart();
