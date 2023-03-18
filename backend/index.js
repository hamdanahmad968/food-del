~require('dotenv').config()
const express = require("express");
const app = express();
const cors = require('cors');
const port = process.env.port || 5000;
require("./db");
const model = require("./routes/CreateUser");
const Displaydata = require("./routes/Displaydata")
const Order = require("./routes/Orderdata");
 const MyOrder = require("./routes/myorderData")
//  const path = require('path');





 const allowedOrigins = ['http://localhost:3000', 'http://localhost:5000'];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      var msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));

// app.use(express.static(path.join(__dirname, 'build')));





app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin , X-Requested-With, Content-Type , Accept"
  );
  next();
});
app.use(express.json());
app.use(cors());
app.use("/api", model);  // login and signup routes
app.use("/api", Displaydata);
app.use("/api", Order);
app.use("/api" , MyOrder)

app.get("/", (req, res) => {
  res.send("connected backend");
});


// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
