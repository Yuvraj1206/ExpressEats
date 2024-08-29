import React, { useEffect, useState } from "react";
import "./Home.css";
import Card from "../../components/Card/Card";
import Navbar from "../../components/Navbar/Navbar";

const Home = () => {
  const [food_items, setFood_items] = useState([]);
  const [foodCat, setFoodCat] = useState([]);

  const [search, setSearch] = useState("");

  const loadItems = async () => {
    let response = await fetch(
      "https://expresseats-backend.onrender.com/api/foodData",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    response = await response.json();
    // console.log(response[0], response[1]);
    setFood_items(response[0]);
    setFoodCat(response[1]);
    // console.log(foodCat);
  };

  useEffect(() => {
    loadItems();
  }, []);

  return (
    <div className="homeContainer">
      <div className="headComp">
        <Navbar></Navbar>
        <div className="head-container">
          <h1>Express Eats</h1>
          <h3>Taste the convenience with every Bite On Time</h3>
          <div className="search-container">
            <input
              name="search"
              type="search"
              placeholder="Search..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
            <button type="button">
              <i className="fa fa-search"></i>
            </button>
          </div>
        </div>
      </div>

      {foodCat != [] ? (
        foodCat.map((data) => {
          return (
            <div key={data._id}>
              <div key={data._id} className="card_container_title">
                {data.CategoryName}
              </div>

              <div className="card_container">
                {food_items != []
                  ? food_items
                      .filter(
                        (item) =>
                          item.CategoryName === data.CategoryName &&
                          item.name.toLowerCase().includes(search.toLowerCase())
                      )
                      .map((item) => {
                        return (
                          <Card
                            key={item._id}
                            foodItem={item}
                            options={item.options[0]}
                          />
                        );
                      })
                  : "Loading..."}
              </div>
            </div>
          );
        })
      ) : (
        <h2>Loading....</h2>
      )}
    </div>
  );
};

export default Home;
