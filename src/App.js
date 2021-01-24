import { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/Header";
import Cart from "./components/Cart";
import Routes from "./routes";

import "./global.scss";

function App() {
  const [isOpenCart, setIsOpenCart] = useState(false);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    setCartData(JSON.parse(localStorage.getItem("cartData")));
  }, []);

  return (
    <Router>
      <Header isOpenCart={isOpenCart} setIsOpenCart={setIsOpenCart} />
      <Routes cartData={cartData} setCartData={setCartData} />
      <Cart
        isOpenCart={isOpenCart}
        setIsOpenCart={setIsOpenCart}
        cartData={cartData}
      />
    </Router>
  );
}

export default App;
