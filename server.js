const express = require("express");
const bodyParser = require("body-parser");
const bookRoutes = require("./routes/books");
const userRoutes = require("./routes/users");
const reviewRoutes = require("./routes/reviews");

const app = express();
app.use(bodyParser.json());
app.use(express.json());

app.use("/books", bookRoutes);
app.use("/users", userRoutes);
app.use("/reviews", reviewRoutes);

app.listen(3000, () => console.log("Server running on http://localhost:3000"));

