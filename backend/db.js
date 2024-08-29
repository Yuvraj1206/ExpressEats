const mongoose = require("mongoose");
const mongoURI =
  "mongodb+srv://yuvrajsaha34:YUVraj48%40@cluster0.tjevz3v.mongodb.net/expressEats?retryWrites=true&w=majority&appName=Cluster0";
const clientOptions = {
  serverApi: { version: "1", strict: true, deprecationErrors: true },
};

async function mongoDB() {
  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    await mongoose.connect(mongoURI, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
    let fetched_data = mongoose.connection.db.collection("food_items");
    global.food_items = await fetched_data.find({}).toArray();
    // console.log(global.food_items);

    let fetched_category = mongoose.connection.db.collection("foodCategory");
    global.food_category = await fetched_category.find({}).toArray();
    // console.log(global.food_category);
  } catch (err) {
    console.log(err);
  }
}
// mongoDB().catch(console.dir);

module.exports = mongoDB;
