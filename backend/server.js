require("dotenv").config();

const app = require("./app");
const cors = require("cors");



app.use( cors({ origin: ["http://localhost:5173", "http://localhost:5174"], credentials: true, }), );

app.listen(
  3000,

  () => {
    console.log(`Server Running on Port `);
  },
);
