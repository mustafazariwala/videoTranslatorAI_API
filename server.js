// Add Environment Variables from the .env file to the process 
require('dotenv').config();
// Creating port value from the environment variable or default value
const PORT = process.env.PORT || 3000;

// Initializing express server 
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();
var cors = require('cors')
const client = require('./utils/databasepg');
const { authMiddleware } = require('./middleware/authMiddleware');

client.connect().then((res) => {
  console.log("Connected to the database");
}).catch((err) => {
  console.log(err);
  console.log("Error connecting to the database");
});

app.use(cors())
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({
//     extended: true
// }));

// Middleware to parse the incoming request data as Json Objects
app.use(express.json());

app.use('/uploads',express.static(path.join(__dirname, "uploads")));

// Import Routes from different folders
app.use('/', require('./routes/index'))

app.use('/health', (req, res) => {
  res.status(200).send('Healthy')
})

app.get('*', function(req, res){
  var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
  res.status(404).send(`${fullUrl} 404 Not Found`);
});

// Listen to the port value and log the port value
app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));