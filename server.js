const express = require("express");
const connectDB = require("./config/db");
const path = require("path");

const app = express();

//CONNCECT DATABASE
connectDB();

//Init Middleware
app.use(express.json({ extended: false }));

//WE NEED TO DEFINE OUR ROUTES
app.use("/api/user", require("./routes/user"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/contacts", require("./routes/contacts"));

//SERVE STATIC ASSETS IN PRODUCTION(BASICALLY SERVE REACT IN PRODUCTION)
if (process.env.NODE_ENV === "production") {
  //SET STATIC FOLDER
  app.use(express.static("client/build"));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on ${PORT}`));
