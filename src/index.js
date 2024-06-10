const  path = require('path')
const express = require('express')
const mongoose = require('mongoose');
const {engine} = require('express-handlebars')
const methodOverride = require('method-override')
const morgan =  require('morgan')

const app = express()

const port = 3000
app.use(methodOverride('_method'))
// connect
const route  = require('./routes');
const  db= require ('./config/db')
db.connect();
//connect

app.use(express.static(path.join(__dirname,'public')));

app.use(express.urlencoded({
  extended:true
}))
app.use(express.json());
app.engine('hbs', engine({
  extname: '.hbs'
}));
app.set('view engine', 'hbs');
app.set('views',path.join( __dirname,'resources/views'));

app.use(morgan('combined'));


route(app);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})