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
  const [switchStore, setSwitchStore] = useState(false);

  useEffect(() => {
    setCartData(JSON.parse(localStorage.getItem("cartData")));
    setTotalPrice(JSON.parse(localStorage.getItem("totalPrice")));
  }, []);

  return (
    <div className={switchStore ? `water` : null}>
      <Router>
        <Header
          isOpenCart={isOpenCart}
          setIsOpenCart={setIsOpenCart}
          switchStore={switchStore}
          setSwitchStore={setSwitchStore}
        />
        <Routes
          cartData={cartData}
          setCartData={setCartData}
          totalPrice={totalPrice}
          setTotalPrice={setTotalPrice}
          switchStore={switchStore}
          setSwitchStore={setSwitchStore}
        />
        <Cart
          isOpenCart={isOpenCart}
          setIsOpenCart={setIsOpenCart}
          cartData={cartData}
        />
      </Router>
    </div>
  );
}

export default App;
