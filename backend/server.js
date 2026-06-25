require("dotenv").config();

const app = require("./app");

const PORT =  3000;

app.listen(
  3000,

  () => {
    console.log(`Server Running on Port ${PORT}`);
  },
);
