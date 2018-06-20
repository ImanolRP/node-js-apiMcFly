const express = require("express"); 
const app = express();
const port = 8090;
const bodyParser = require('body-parser');
const notes_routes = require('./routes/noteRoutes');


app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: false })); 
app.use((req,res,next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use('/api', notes_routes);

const server = app.listen(port, function () {
  console.log('Server is running..'); 
});