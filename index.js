require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

//Routes
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to database");
  })
  .catch((error) => {
    console.log("Database Error: ", error);
  });

app.listen(PORT, () => {
  console.log(`The server is running on port ${PORT} `);
});
