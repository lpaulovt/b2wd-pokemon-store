import React, { useEffect, useState } from "react";
import api from "../../services/api";
import Card from "../../components/Card/index";
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
