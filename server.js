const express = require("express");
const connectDB = require("./config/db");

const app = express();

//CONNCECT DATABASE
connectDB();

//Init Middleware
app.use(express.json({ extended: false }));

app.get("/", (req, res) => res.json({ msg: "hey there!!" }));

//WE NEED TO DEFINE OUR ROUTES
app.use("/api/user", require("./routes/user"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/contacts", require("./routes/contacts"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on ${PORT}`));
 