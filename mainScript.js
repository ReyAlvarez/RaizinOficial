import { addToCart, saveCart, productsCart } from "./cart.js";
// import { saveCart } from "./cart.js";
import { productList } from "./json/productsRaizin.js";

// <===================== VARIABLES =====================>
const cart = document.querySelector("#cart");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const emptyCartBtn = document.querySelector("#empty-cart");
const productListAdd = document.querySelector("#product-list");
let articulosCarrito = [];

export function loadCartEventListeners() {
  // Cuando agregas un curso presionando el Btn agregar al carrito
  productListAdd.addEventListener("click", agregarCurso);

  // Eliminar cursos del carrito
  cart.addEventListener("click", eliminarCurso);

  //Vaciar Carrito
  emptyCartBtn.addEventListener("click", () => {
    articulosCarrito = []; // Reseteamos el Arreglo para que quede vacio nuevamente
    limpiarHTML(); // Eliminamos todo el HTML
  });
}

// <===================== FUNCIONES =====================>
// Add Product to nav cart
function agregarCurso(e) {
  e.preventDefault();
  if (e.target.classList.contains("agregar-carrito")) {
    const cursoSeleccionado = e.target.parentElement.parentElement;
    leerDatosCurso(cursoSeleccionado);
  }
}

// Eliminar Curso
function eliminarCurso(e) {
  if (e.target.classList.contains("borrar-curso")) {
    const cursoId = e.target.getAttribute("data-id");
    // Elimina del arreglo articulosCarrito con el data-id
    articulosCarrito = articulosCarrito.filter((curso) => curso.id !== cursoId);
    carritoHTML();
  }
}

// Lee el contenido del HTML al que le dimos click y extrae la informacion del curso
function leerDatosCurso(curso) {
  //   console.log(curso);
  // Crear un objeto con el contenido del curso actual
  const infoCurso = {
    imagen: curso.querySelector("img").src,
    titulo: curso.querySelector("h4").textContent,
    precio: curso.querySelector(".precio span").textContent,
    id: curso.querySelector("a").getAttribute("data-id"), // Mediante getAttribiute() extraigo la informacion de data-id para darsela a el key del objeto infoCurso
    cantidad: 1,
  };
  // Revisa si un elemento ya existe en el carrito.

  const existe = articulosCarrito.some((curso) => curso.id === infoCurso.id); // .some() devuelve boolean
  if (existe) {
    // Actualizo cantidad carrito
    const cursos = articulosCarrito.map((curso) => {
      if (curso.id === infoCurso.id) {
        curso.cantidad++;
        return curso; // Retorna el objeto actualizado
      } else {
        return curso; // Retorna los objetosque no son los duplicados pero que siguen siendo importantes para nuestro carrito de compras
      }
    });
  } else {
    // Agrega el elemento al carrito
    articulosCarrito = [...articulosCarrito, infoCurso];
  }

  //Agrega elementos al arreglo del carrito

  console.log(articulosCarrito);
  carritoHTML();
}

// Muestra el Carrito de compras en el HTML <=====================

function carritoHTML() {
  // Limpar el HTML
  // limpiarHTML();         <-------- Descomentar !!!

  // Recorre el carrito y genera el HTML
  articulosCarrito.forEach((curso) => {
    const { imagen, titulo, precio, cantidad, id } = curso; // Destructuring

    const row = document.createElement("tr");
    row.innerHTML = `
    <tr>
    <td><img src=${curso.imagen} width="100px"></td>
        <td>${curso.titulo}</td>
        <td>${curso.precio}</td>
        <td>${curso.cantidad}</td>
        <td>
        <a href="#" class="borrar-curso" data-id="${curso.id}"> X </a>
        </td>
    </tr>
        `;

    // Agrega el HTML del carrito en el tbody
    contenedorCarrito.appendChild(row);
  });
}

// Eliminar los cursos del tbody
function limpiarHTML() {
  //   contenedorCarrito.innerHTML = "";  // Forma LENTA de borrar
  //
  while (contenedorCarrito.firstChild) {
    contenedorCarrito.removeChild(contenedorCarrito.firstChild);
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
