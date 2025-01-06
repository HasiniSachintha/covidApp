const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes/users");
const errorHandler = require("./middlewares/errorHandler");
const app = express();
const cors = require('cors');

// app.use(cors());

// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', 'http://localhost:8081'); // Replace with your actual origin
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   next();
// });

const corsOptions = {
  origin: '*', // Allow all origins (use cautiously in production)
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specific HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers
};
app.use(cors(corsOptions));
app.use(express.json());
 
//! Connect to mongodb
mongoose
  .connect("") //db url
  .then(() => console.log("Db connected successfully"))
  .catch((e) => console.log(e));

//!Routes
app.use("/", router);
//!error handler
app.use(errorHandler);
//! Start the server
const PORT = 8000;
app.listen(PORT, console.log(`Server is up and running`));
