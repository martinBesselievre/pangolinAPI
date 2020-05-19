
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import expressJwt from 'express-jwt'
import mongoose from 'mongoose'
import routes from './routes'


let app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Connect to Mongoose and set connection variable
mongoose.connect("mongodb://database/mongodb", {
  useNewUrlParser: true
});
var db = mongoose.connection;
if (!db) console.log("Error connecting db");
else console.log("Db connected successfully");

// Import routes
routes(app)


// use JWT auth to secure the api, the token is passed in the authorization header
app.use(
  expressJwt({
    secret: "Thisismyscretkey",
    getToken: function(req) {
      if (req.headers.authorization && req.headers.authorization.split(" ")[0] === "Bearer") {
        return req.headers.authorization.split(" ")[1];
      } 
      return null;
    }
  }).unless({ path: ["/api/v0/authenticate", "/api/v0/pangolins"] })
);

// start server
let port = process.env.NODE_ENV ? process.env.NODE_ENV : 3000;
app.listen(port, function() {
  console.log("Server listening on port " + port);
});
