import { Switch, Route } from "react-router-dom";
import Home from "../pages/Home/index";
import Item from "../pages/Item/index";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/item/1" component={Item} />
    </Switch>
  );
};

export default Routes;
