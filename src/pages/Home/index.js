import React, { useEffect, useState } from "react";
import api from "../../services/api";
import Card from "../../components/Card/index";
import Button from "../../components/Button";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { AiOutlineShoppingCart } from "react-icons/ai";

const Home = ({ cartData, setCartData }) => {
  const [data, setData] = useState(null);
  const [nextUrl, setNextUrl] = useState("");
  const [previousUrl, setPreviousUrl] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);

  const amountOfItems = (id) =>
    cartData.filter((item) => item.id === id).length;

  useEffect(() => {
    api
      .get(`pokemon`)
      .then((response) => {
        setData(response.data.results);
        setNextUrl(response.data.next);
        setPreviousUrl(response.data.previous);
      })
      .catch((error) => console.log(error));
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
    let array = cartData || [];
    let alreadyExists = false;

    array.forEach((item) => {
      if (item.id === newItem.id) {
        console.log(item);
        alreadyExists = true;
        item.count += 1;
        setCartData([...array]);
      }
    });

    if (!alreadyExists) {
      array.push({ ...newItem, count: 1 });
    }
    console.log(cartData);

    if (cartData !== null) {
      let total = cartData.reduce(
        (total, { price = 0, count }) => total + count * price,
        0
      );
      setTotalPrice(total);
    } else {
      setTotalPrice(newItem.price);
    }
    setCartData([...array]);

    localStorage.setItem("cartData", JSON.stringify(cartData));
  }

  function itemQuantity(item) {
    let array = cartData || [];
    console.log("entrou");
    array.forEach((pokemon) => {
      console.log(item.id);
      if (pokemon.id === item.id) {
        console.log(pokemon);
        if (pokemon.count <= 0) {
          removeFromCart(item);
        } else {
          item.count -= 2;
        }
        setCartData([...array]);
      }
    });
  }

  const removeFromCart = (item) => {
    setCartData((currentCart) => {
      const indexOfItemToRemove = currentCart.findIndex(
        (cartItem) => cartItem.id === item.id
      );

      if (indexOfItemToRemove === -1) {
        return currentCart;
      }

      return [
        ...currentCart.slice(0, indexOfItemToRemove),
        ...currentCart.slice(indexOfItemToRemove + 1),
      ];
    });
  };

  return (
    <main className="main">
      <div className="main-content">
        <h1 className="title">Our Pokémon</h1>
        <section>
          <div className="cards">
            {data === null
              ? null
              : data.map((item) => (
                  <Card key={item.name} data={item} addCart={addCart} />
                ))}
          </div>
          <div className="side-cart">
            <div className="side-cart-header">
              <AiOutlineShoppingCart size={20} color="#cd121f" />
              <h1>Carrinho</h1>
            </div>
            {cartData !== null
              ? cartData.map((item) => (
                  <div className="cart-item" key={item.id}>
                    <img src={item.img} alt={item.name} />
                    <div className="cart-item-info">
                      <h3>{item.name}</h3>
                      <div>
                        {item.types.map((type) => (
                          <span key={type.type.name}>{type.type.name}</span>
                        ))}
                      </div>
                      <button onClick={() => itemQuantity(item)}>--</button>
                      <span>
                        {item.count} x R${item.price}
                      </span>
                      <button onClick={() => removeFromCart(item)}> X </button>
                    </div>
                  </div>
                ))
              : null}
            <div className="side-cart-price">
              <span>Total:</span> <h3>R${totalPrice}</h3>
            </div>
            <Button label="Finalizar" onClick={() => null} type="primmary" />
          </div>
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
      </div>
    </main>
  );
};

export default Home;
