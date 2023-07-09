const saveCart = () => {
  if (productosCart.length > 0) {
    localStorage.setItem("productosFav", JSON.stringify(productosFav));
  }
};

const recuperarFavoritos = () => {
  return JSON.parse(localStorage.getItem("productosFav")) || [];
};

const productsCart = recuperarFavoritos();

const addToCart = (productId) => {
  if (productId > 0) {
    const result = productsRaizin.find((product) => product.id === parseInt(productId));
    console.log(result);
    if (result !== undefined) {
      productsCart.push(result);
    } else {
      document.getElementById("message").innerHTML = "I couldn't match and product to that ID";
    }
  }
};
