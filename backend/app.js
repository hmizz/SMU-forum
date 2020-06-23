const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const postsRoutes = require("./routes/posts");
const eventsRoutes = require("./routes/events");
const userRoutes = require("./routes/users")

const app = express();

mongoose.connect("mongodb+srv://DevAcc:azerty1234@webproject-prfbn.mongodb.net/test?retryWrites=true&w=majority"
,{ useNewUrlParser: true,useUnifiedTopology: true})
.then(() => {
    console.log('Conneted to database');
}).catch(() => {
    console.log('Failed to Connet to database');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
  });

app.use("/api/posts",postsRoutes);
app.use("/api/user",userRoutes);

module.exports = app;