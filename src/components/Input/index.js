import { AiOutlineSearch } from "react-icons/ai";
const InputIcon = () => {
  return (
    <div className="input-icon-container">
      <AiOutlineSearch size={20} color="#d0d0d1" />
      <input type="text" placeholder="Procurar Pokémon" />
    </div>
  );
};

export default InputIcon;
