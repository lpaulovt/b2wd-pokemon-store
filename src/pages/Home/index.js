import React, { useEffect, useState } from "react";
import api from "../../services/api";
import Button from "../../components/Button";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

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
      <div class="main-content">
        <h1 className="title">Our Pokémon</h1>
        <section className="cards">
          {data === null
            ? null
            : data.map((item) => (
                <Card key={item.name} data={item} addCart={addCart} />
              ))}
        </section>
        <section className="main-buttons">
          <Button
            label={<IoIosArrowBack color="#fff" size={24} />}
            onClick={() => getPreviousData()}
            type="shortIcon"
            disabled={previousUrl === null ? true : false}
          />
          <Button
            label={<IoIosArrowForward color="#fff" size={24} />}
            onClick={() => getNextData()}
            type="shortIcon"
            disabled={false}
          />
        </section>

        {/*   <button disabled={previousUrl === null ? true : false}>voltar</button>
        <button onClick={() => getNextData()}>proximo</button>
        <div>{cart !== null ? cart.map((i) => <li>{i.name}</li>) : null}</div> */}
      </div>
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
  console.log(pokemon);

  function handleClick() {
    let data = {
      id: pokemon.id,
      name: pokemon.name,
      img: pokemon.sprites.other["official-artwork"].front_default,
    };

    addCart(data);
  }

  return (
    <>
      {pokemon === null ? null : (
        <div className="card">
          <img
            src={pokemon.sprites.other["official-artwork"].front_default}
            alt=""
            className="card-image"
          />
          <div className="card-info">
            <h2>{pokemon.name}</h2>
            <div class="types">
              {pokemon.types.map((type) => (
                <span>{type.type.name}</span>
              ))}
            </div>

            <h3>R$2000,00</h3>
          </div>
          <div class="card-overlay">
            <Button
              label="Adicionar ao carrinho"
              onClick={handleClick}
              type="primmary"
            />
          </div>
        </div>
      )}
    </>
  );
};
