import React, { useEffect, useState } from "react";
import api from "../../services/api";

const Home = () => {
  const [data, setData] = useState(null);
  const [nextUrl, setNextUrl] = useState("");
  const [previousUrl, setPreviousUrl] = useState("");
  const [cart, setCart] = useState([]);

  useEffect(() => {
    api
      .get(`pokemon`)
      .then((response) => {
        setData(response.data.results);
        setNextUrl(response.data.next);
        setPreviousUrl(response.data.previous);
      })
      .catch((error) => console.log(error));

    setCart(JSON.parse(localStorage.getItem("cartItem")));
  }, []);

  function getNextData() {
    api
      .get(`pokemon${nextUrl.substring(33)}`)
      .then((response) => {
        setData(response.data.results);
        setNextUrl(response.data.next);
        setPreviousUrl(response.data.previous);
      })
      .catch((error) => console.log(error));
  }

  function getPreviousData() {
    api
      .get(`pokemon${previousUrl.substring(33)}`)
      .then((response) => {
        setData(response.data.results);
        setNextUrl(response.data.next);
        setPreviousUrl(response.data.previous);
      })
      .catch((error) => console.log(error));
  }

  function addCart(newItem) {
    let array = cart || [];
    array.push(newItem);
    setCart([...array]);

    localStorage.setItem("cartItem", JSON.stringify(cart));
  }

  return (
    <main className="main">
      <h1 className="title">Our Pokémon</h1>
      <ul style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
        {data === null
          ? null
          : data.map((item) => (
              <Card key={item.name} data={item} addCart={addCart} />
            ))}
      </ul>
      <button
        onClick={() => getPreviousData()}
        disabled={previousUrl === null ? true : false}
      >
        voltar
      </button>
      <button onClick={() => getNextData()}>proximo</button>
      <div>{cart !== null ? cart.map((i) => <li>{i.name}</li>) : null}</div>
    </main>
  );
};

export default Home;

const Card = ({ data, addCart }) => {
  const url = data.url;
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    api
      .get(`pokemon/${url.substring(33)}`)
      .then((response) => {
        setPokemon(response.data);
      })
      .catch((error) => console.log(error));
  }, [url]);

  function handleClick() {
    let data = {
      id: pokemon.id,
      name: pokemon.name,
      img: pokemon.sprites.other["official-artwork"].front_default,
    };

    addCart(data);
  }

  return (
    <div>
      {pokemon === null ? null : (
        <>
          <img
            src={pokemon.sprites.other["official-artwork"].front_default}
            alt="dfddf"
          />
          <h1>{pokemon.name}</h1>
          <button onClick={handleClick}> Add</button>
        </>
      )}
    </div>
  );
};
