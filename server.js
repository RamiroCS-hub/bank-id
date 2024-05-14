require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors")
const PORT = process.env.PORT || 3001;
const { sequelize } = require("./config/database");

app.use(express.json());
app.use(cors({ origin: true, credentials:true }));

app.use("/", (req, res) => {
    res.json({
        message: "Welcome to the API",
        status: 200,
    })
});

sequelize.sync().then(() => {
    console.log("Database synced succesfully");
})

app.listen(PORT, () => {
    console.log(`server is listening on http://localhost:${PORT}`);
})

