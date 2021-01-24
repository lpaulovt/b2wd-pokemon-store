import React from "react";
import Button from "../Button";
import { IoIosArrowBack } from "react-icons/io";

const Cart = ({ isOpenCart, setIsOpenCart, cartData }) => {
  if (isOpenCart === true) {
    return (
      <section className="cart-overlay">
        <div className="cart-container">
          <div className="cart-header">
            <Button
              label={<IoIosArrowBack color="#fff" size={24} />}
              onClick={() => setIsOpenCart(false)}
              type="shortIcon"
              disabled={false}
            />
            <span>Carrinho</span>
          </div>

          <div>
            {cartData !== null
              ? cartData.map((i) => <li key={i.id}>{i.name}</li>)
              : null}
          </div>

          <Button
            label="Finalizar"
            onClick={() => setIsOpenCart(false)}
            type="primmary"
          />
        </div>
      </section>
    );
  }
  return null;
};

export default Cart;
