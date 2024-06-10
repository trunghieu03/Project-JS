const newsRouter = require('./news');
const userRouter = require('./User'); 
const adminRouter = require('./admin');
const bookRouter = require('./detailsbook');

function route(app){

app.use('/', userRouter);
app.use('/admin', adminRouter);
app.use('/book', bookRouter);
}

module.exports= route;