/**
 * The Server Can be configured and created here...
 *
 * You can find the JSON Data file here in the Data module. Feel free to impliment a framework if needed.
 */

/*
-- This is the product data, you can view it in the file itself for more details 
{
    "_id": "019",
    "isActive": "false",
    "price": "23.00",
    "picture": "/img/products/N16501_430.png",
    "name": "Damage Reverse Thickening Conditioner",
    "about": "Dolor voluptate velit consequat duis. Aute ad officia fugiat esse anim exercitation voluptate excepteur pariatur sit culpa duis qui esse. Labore amet ad eu veniam nostrud minim labore aliquip est sint voluptate nostrud reprehenderit. Ipsum nostrud culpa consequat reprehenderit.",
    "tags": [
        "ojon",
        "conditioner"
    ]
}
*/
const data = require("./data");
const http = require("http");
const express = require("express");
const cors = require('cors');

const { paginate } = require("./utils");

const hostname = "localhost";
const port = 3035;

/**
 * Start the Node Server Here...
 *
 * The http.createServer() method creates a new server that listens at the specified port.
 * The requestListener function (function (req, res)) is executed each time the server gets a request.
 * The Request object 'req' represents the request to the server.
 * The ServerResponse object 'res' represents the writable stream back to the client.
 */

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//CORS middleware
const allowCrossDomain = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
};

app.use(cors());
app.use(allowCrossDomain);

app.post("/data", (req, res, next) => {
  const { searchTerm, page = 1, limit = 10 } = req.body;

  /* Filter out results using Name, about, and tags attribute of product */
  let searchResults = data.filter((product) => {
    /* Search by lowercase to support case-insensitive search */
    if (
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.about.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.tags.map((tag) => tag.toLowerCase()).includes(searchTerm)
    )
      return true;
  });

  return res.status(200).json(paginate(searchResults, page, limit));
});

/* 404 Route Handler  */
app.use((req, res, next) => {
  const error = new Error("Page not found!");
  error.status = 404;
  next(error);
});

/* Global Error Handler  */
app.use((err, req, res, next) => {
  /* 
       Extract Error code & message from error if not available set defaults 
    */
  const { status = 500, message = "Something wen't wrong" } = err;
  res.status(status).json({ message });
});

/* Pass our express app as request listener to Raw HTTP Server of Node. */
http.createServer(app).listen(port);

console.log(`[Server running on ${hostname}:${port}]`);
