if (!JSON.parse(localStorage.getItem('userCart'))) {
  localStorage.setItem('userCart', JSON.stringify([]));
}

const readUserCart = () => JSON.parse(localStorage.getItem('userCart'));

const addToCart = (product) => {
  if (product) {
    const cartItems = readUserCart();
    const newCartItems = ([...cartItems, product]);
    localStorage.setItem('userCart', JSON.stringify(newCartItems));
  }
};

const getCartItems = () => readUserCart();

const removeItemCart = (productId) => {
  const cartItems = readUserCart();
  const cartItemProduct = cartItems.filter((element) => element.id === productId.id);
  cartItemProduct.pop();
  const cartItemsFilter = cartItems
    .filter((element) => element.id !== productId.id);
  const newCartItems = [...cartItemProduct, ...cartItemsFilter];
  localStorage.setItem('userCart', JSON.stringify(newCartItems));
};

export { addToCart, getCartItems, removeItemCart };
