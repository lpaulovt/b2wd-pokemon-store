import { Link } from "react-router-dom";
import { AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";
import InputIcon from "../Input";

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          <Link to="/" className="header-logo">
            <span>PokéStore.</span>
          </Link>
          <InputIcon />
        </div>

        <ul className="header-right">
          <li>
            <Link to="/">
              <AiOutlineHeart size={35} color="#fff" />
            </Link>
          </li>
          <li>
            <Link to="/item/1">
              <AiOutlineShoppingCart size={35} color="#fff" />
            </Link>
          </li>
          <li>
            <img
              src="https://avatars.githubusercontent.com/u/62833767?s=460&u=96ec116ca4025205378fe85e2a234998c6b797bd&v=4"
              alt="User profile"
              className="profile"
            />
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
