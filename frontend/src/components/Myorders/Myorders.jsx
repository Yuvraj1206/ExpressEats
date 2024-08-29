import React, { useEffect, useState } from "react";
import "./Myorders.css";
import Navbar from "../Navbar/Navbar";

const Myorders = () => {
  const [orderData, setorderData] = useState([]);

  const fetchMyOrder = async () => {
    let response = await fetch("http://localhost:5000/api/myOrderData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: localStorage.getItem("userEmail"),
      }),
    });

    response = await response.json();
    // console.log(response[0].reverse());
    setorderData(response[0]);
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);

  let data;

  return (
    <div>
      <Navbar></Navbar>
      {orderData != [] ? (
        orderData.map((item) => {
          return item.map((arrayData, index) => {
            return (
              <div key={index}>
                {arrayData.order_date ? (
                  <div className="dateHead">
                    {(data = arrayData.order_date)}
                  </div>
                ) : (
                  <div className="col-12 col-md-6 col-lg-3">
                    <div
                      className="card mt-3"
                      style={{ width: "16rem", maxHeight: "360px" }}
                    >
                      <img
                        src={arrayData.img}
                        className="card-img-top"
                        alt="..."
                        style={{ height: "120px", objectFit: "fill" }}
                      />
                      <div
                        className="card-body"
                        style={{ backgroundColor: "#252222de" }}
                      >
                        <h5 className="card-title">{arrayData.name}</h5>
                        <div
                          className="container w-100 p-0"
                          style={{ height: "70px" }}
                        >
                          <div>
                            <span className="m-1">{arrayData.qty}</span>
                            <span className="m-1">{arrayData.size}</span>
                          </div>

                          <div className="m-1">{data}</div>
                          <div className=" d-inline ms-2 h-100 w-20 fs-5">
                            ₹{arrayData.price}/-
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          });
        })
      ) : (
        <h3>You have no orders,Yet.</h3>
      )}
    </div>
  );
};

export default Myorders;
