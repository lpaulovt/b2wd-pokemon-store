import React, { useState, useEffect } from "react";
import api from "../../services/api";
import Button from "../Button";

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

export default Card;
