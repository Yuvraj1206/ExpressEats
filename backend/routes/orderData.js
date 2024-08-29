const express = require("express");
const Orders = require("../models/Orders");
const router = express.Router();

router.post("/orderdata", async (req, res) => {
  let data = req.body.order_data;
  await data.splice(0, 0, { order_date: req.body.order_date }); //adding date in data at 0 index
  let emailId = await Orders.findOne({ email: req.body.email });

  if (emailId === null) {
    try {
      await Orders.create({
        email: req.body.email,
        order_data: [data],
      }).then(() => {
        res.json({ success: true });
      });
    } catch (error) {
      console.log(error.message);
      res.send("Server Error", error.message);
    }
  } else {
    try {
      await Orders.findOneAndUpdate(
        { email: req.body.email },
        { $push: { order_data: data } }
      ).then(() => {
        res.json({ success: true });
      });
    } catch (error) {
      console.log(error.message);
      res.send("Server Error", error.message);
    }
  }
});

router.post("/myOrderData", async (req, res) => {
  try {
    let eId = await Orders.findOne({ email: req.body.email });
    // console.log(eId);
    res.send([eId.order_data]);
  } catch (error) {
    res.send(error.message);
  }
});

module.exports = router;
