const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors({
    origin: [
        "http://localhost:5173",
        "http://localhost:5174",
        "https://e-commerce-eitwdm1cy-talhafaheem1103-1151s-projects.vercel.app"
    ],
    credentials: true
}));

app.use(express.json());

app.use(express.urlencoded({
    extended: true
}));

/* ==========================
   Static Files
========================== */

app.use("/uploads", express.static("uploads"));

/* ==========================
   Routes
========================== */

app.use("/", authRoutes);
app.use("/", sellerRoutes);
app.use("/", productRoutes);
app.use("/", cartRoutes);
app.use("/", orderRoutes);
app.use("/", reviewRoutes);

/* ==========================
   Health Check
========================== */

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "MarketHub API Running"
    });
});

module.exports = app;