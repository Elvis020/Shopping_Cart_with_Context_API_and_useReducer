import React from "react";
import { useElvisContext } from "./Context";
import CartItem from "./CartItem";

function CartContainer() {
  const { cart,total,clearCart } = useElvisContext();

  return (
    <>
      {cart.length === 0 ? (
        <section className="cart">
          <header>
            <h2>your shopping Cart</h2>
            <h4 className="empty-cart"> is currently empty</h4>
          </header>
        </section>
      ) : (
        <section className="cart">
          {/* Header */}
          <header>
            <h2>your shoppingCart</h2>
          </header>

          {/* Main Cart */}
          <div>
            {cart.map((item) => {
              return <CartItem key={item.id} {...item} />;
            })}
          </div>

          {/* Footer */}
          <footer>
            <hr />
            <div className="cart-total">
              <h4>
                total <span>GH {total}</span>
              </h4>
            </div>
            <button onClick={() => console.log("Cart has been cleared")} className="btn clear-btn" onClick={clearCart} >
              Clear the Cart
            </button>
          </footer>
        </section>
      )}
    </>
  );
}

export default CartContainer;
