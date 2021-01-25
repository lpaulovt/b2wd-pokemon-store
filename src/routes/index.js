import { Switch, Route } from "react-router-dom";
import Home from "../pages/Home/index";
import Item from "../pages/Item/index";

const Routes = ({ cartData, setCartData, totalPrice, setTotalPrice }) => {
  return (
    <Switch>
      <Route exact path="/">
        <Home
          cartData={cartData}
          setCartData={setCartData}
          totalPrice={totalPrice}
          setTotalPrice={setTotalPrice}
        />
      </Route>
      <Route path="/item/1">
        <Item />
      </Route>
    </Switch>
  );
};

export default Routes;
