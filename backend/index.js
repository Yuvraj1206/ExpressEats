const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

const cors = require("cors");
app.use(cors());

const mongoDb = require("./db");
mongoDb().catch(console.dir);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.json());
app.use("/api", require("./routes/createUser")); //signup and login , dono me use ho ra
app.use("/api", require("./routes/displayUser")); //data layenge backed se
app.use("/api", require("./routes/orderData"));
app.use("/api", require("./routes/orderData"));

app.listen(port, () => {
  console.log("server is running on port:", port);
});
