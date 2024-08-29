import React, { useEffect, useRef, useState } from "react";
import "./Card.css";
import { useCart } from "../../context/Cart";

const Card = (props) => {
  let options = props.options;
  let priceOptions = Object.keys(options);

  let sizeRef = useRef();

  const [size, setSize] = useState("");
  const [qty, setQty] = useState(1);

  const cart = useCart(); //context api

  const handleAddToCart = async () => {
    for (const item of cart.state) {
      if (item.id === props.foodItem._id) {
        if (item.size === size) {
          await cart.dispatch({
            type: "UPDATE",
            id: props.foodItem._id,
            price: finalPrice,
            qty: qty,
          });
          return;
        }
      }
    }

    await cart.dispatch({
      type: "ADD",
      id: props.foodItem._id,
      name: props.foodItem.name,
      qty: qty,
      size: size,
      img: props.foodItem.img,
      price: finalPrice,
    });
    console.log(cart.state);
  };

  useEffect(() => {
    setSize(sizeRef.current.value);
  }, []);
  let finalPrice = qty * parseInt(options[size]);

  return (
    <div
      className="card food-card"
      style={{ maxWidth: "280px", color: "black", maxHeight: "500px" }}
    >
      <img
        className="card-img-top"
        src={props.foodItem.img}
        alt="Card image cap"
        style={{ maxHeight: "200px", objectFit: "fill" }}
      />
      <div className="card-body" style={{ color: "white" }}>
        <h5 className="card-title">{props.foodItem.name}</h5>
        <p className="card-text">{props.foodItem.description}</p>
        <div className=" w-100">
          <select
            className="m-2 h-100 bg-danger border-0 rounded"
            onChange={(e) => setQty(e.target.value)}
          >
            {Array.from(Array(6), (e, i) => {
              return (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              );
            })}
          </select>

          <select
            className="h-100 m-2 bg-danger rounded border-0"
            onChange={(e) => setSize(e.target.value)}
            ref={sizeRef}
          >
            {priceOptions.map((option) => (
              <option value={option} key={option}>
                {option}
              </option>
            ))}
          </select>

          <div className="d-inline h-100 font-weight-bold">{`₹${finalPrice}`}</div>
        </div>
        <hr />
        <div className="btn btn-success" onClick={handleAddToCart}>
          Add to cart
        </div>
      </div>
    </div>
  );
};

export default Card;
