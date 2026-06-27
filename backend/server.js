require("dotenv").config();

const app = require("./app");
const cors = require("cors");



app.use( cors({ origin: ["http://localhost:5173", "http://localhost:5174","https://e-commerce-eitwdm1cy-talhafaheem1103-1151s-projects.vercel.app"], credentials: true, }), );

app.listen(
  10000,

  () => {
    console.log(`Server Running on Port `);
  },
);
