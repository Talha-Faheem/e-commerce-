const express =require("express")
const mysql=require("mysql2")
const cors = require('cors');

const app = express();

app.use(express.urlencoded({extended:true}));
app.use(express.json());
// app.use(express.static("views"));

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"t@lh@.11",
    database:"ecommerce_platform"
});

db.connect(err=>{
    if(err){
        console.log("Database connection error");
    }else{
        console.log("MySQL Connected");
    }
});


app.get("/data", function (req, res) {
  const sql = "SELECT * FROM Products ";

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Failed to fetch data",
      });
    }

    res.status(200).json({
      success: true,
      books: result,
    });
  });
});

app.listen(3000)