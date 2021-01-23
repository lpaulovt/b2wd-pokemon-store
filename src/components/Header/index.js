import { Link } from "react-router-dom";
const Header = () => {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/item/1">Item</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
