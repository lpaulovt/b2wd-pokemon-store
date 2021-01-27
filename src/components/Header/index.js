import { AiOutlineShoppingCart } from "react-icons/ai";
import { FiShoppingBag } from "react-icons/fi";
import InputIcon from "../Input";

const Header = ({
  isOpenCart,
  setIsOpenCart,
  switchStore,
  setSwitchStore,
  searchPokemon,
  setSearchPokemon,
  setCartData,
  setTotalPrice,
}) => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          <button
            onClick={() => {
              localStorage.clear();
              setCartData(null);
              setTotalPrice(0);
              setSwitchStore(!switchStore);
            }}
            className="header-logo"
          >
            <span>{switchStore ? "WaterStore." : "FireStore."}</span>
          </button>
          <span className="container-input">
            <InputIcon
              value={searchPokemon}
              setValue={setSearchPokemon}
              placeholder={
                switchStore
                  ? "pesquisa aqui, é rapidinho ;)"
                  : "Procurar Pokémon "
              }
            />
          </span>
        </div>
        <ul className="header-right">
          <li>
            <button type="button" onClick={() => setIsOpenCart(!isOpenCart)}>
              {switchStore ? (
                <FiShoppingBag size={35} color="#fff" />
              ) : (
                <AiOutlineShoppingCart size={35} color="#fff" />
              )}
            </button>
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
      <span className="container-input-out">
        <InputIcon
          value={searchPokemon}
          setValue={setSearchPokemon}
          placeholder={
            switchStore ? "pesquisa aqui, é rapidinho ;)" : "Procurar Pokémon "
          }
        />
      </span>
    </header>
  );
};

export default Header;
