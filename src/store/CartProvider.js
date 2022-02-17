import CartContext from "./cart-context";

const CartProvider = (props) => {
  const addItemToCart = (item) => {};
  const removeItemFromCart = (id) => {};

  const cartContextHelper = {
    items: [],
    totalAmount: 0,
    addItem: addItemToCart,
    removeItem: removeItemFromCart,
  };

  return (
    <CartContext.Provider value={cartContextHelper}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
