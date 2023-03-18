require('dotenv').config()

const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

const mongourl =
 process.env.MONGO_URI

//   "mongodb+srv://mdhamdan2582:hamdan@cluster0.grcoiwc.mongodb.net/FoodDelivery?retryWrites=true&w=majority";

mongoose
  .connect(mongourl, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("db connected");
  })
  .then(() => {
        mongoose.connection.db.collection("food_items").find({}).toArray(function (err,data) {
        mongoose.connection.db.collection("food_category").find({}).toArray(function (err, catdata) {
            if (err) console.log(err);
            else {
                global.food_items = data;
                global.food_category = catdata;
              // console.log(global.food_items);
              // console.log(global.food_category);
            }
          });
       
      });
  })
  .catch(() => {
    console.log("error in db");
  });

