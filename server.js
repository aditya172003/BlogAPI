const express = require("express");
const connectdb = require("./config/dbConnection");
const errorHandler = require("./middlewares/errorHandler");
const cors = require("cors");
const cookieparser = require('cookie-parser')
const dotenv = require("dotenv").config();
const {rateLimiterUsingThirdParty}= require('./middlewares/rateLimit');

connectdb();

const app = express();

const port = process.env.PORT || 8080;

// var whitelist = [
//   "http://localhost:3000",
// ];
// var corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
// };

// app.use(cors(corsOptions));
app.use(cookieparser())
app.use(express.json());
app.use(rateLimiterUsingThirdParty);
app.get("/",(req,res)=>{
  res.send("from express server ")

})

app.use("/api/blog", require("./routes/blogRoutes"));

app.use("/api/user", require("./routes/userRoutes"));

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
