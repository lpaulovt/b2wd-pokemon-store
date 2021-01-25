import { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/Header";
import Cart from "./components/Cart";
import Routes from "./routes";

import "./global.scss";

function App() {
  const [isOpenCart, setIsOpenCart] = useState(false);
  const [cartData, setCartData] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  /*   setInterval(() => {
    setTotalPrice(
      cartData.reduce((total, { price = 0, count }) => total + count * price, 0)
    );
  }, 10);
 */
  useEffect(() => {
    setCartData(JSON.parse(localStorage.getItem("cartData")));
  }, []);

  return (
    <Router>
      <Header isOpenCart={isOpenCart} setIsOpenCart={setIsOpenCart} />
      <Routes
        cartData={cartData}
        setCartData={setCartData}
        totalPrice={totalPrice}
        setTotalPrice={setTotalPrice}
      />
      <Cart
        isOpenCart={isOpenCart}
        setIsOpenCart={setIsOpenCart}
        cartData={cartData}
      />
    </Router>
  );
}

export default App;
