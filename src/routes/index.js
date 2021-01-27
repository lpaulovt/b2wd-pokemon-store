import { Switch, Route } from "react-router-dom";
import Home from "../pages/Home/index";
import Item from "../pages/Item/index";

const Routes = ({
  cartData,
  setCartData,
  searchPokemon,
  setSearchPokemon,
  totalPrice,
  setTotalPrice,
  switchStore,
  setSwitchStore,
  modalBuy,
  setModalBuy,
}) => {
  return (
    <Switch>
      <Route exact path="/">
        <Home
          cartData={cartData}
          setCartData={setCartData}
          totalPrice={totalPrice}
          setTotalPrice={setTotalPrice}
          switchStore={switchStore}
          setSwitchStore={setSwitchStore}
          searchPokemon={searchPokemon}
          setSearchPokemon={setSearchPokemon}
          modalBuy={modalBuy}
          setModalBuy={setModalBuy}
        />
      </Route>
      <Route path="/item/1">
        <Item />
      </Route>
    </Switch>
  );
};

export default Routes;
