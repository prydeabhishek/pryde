var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors=require('cors');
var MongoClient = require('mongodb').MongoClient;
// var session=require('express-session');
// var csrf=require('csurf');


var register_doctor_router=require('./routes/RegisterDoctor');
var profile_doctor_router=require('./routes/ProfileDoctor');
var change_passsword_doctor_router=require('./routes/ChangePasswordDoctor');
var verify_phone_doctor_router=require('./routes/VerifyPhoneDoctor.1');
var verify_email_doctor_router=require('./routes/VerifyEmailDoctor1');
var set_schedule_doctor_router=require('./routes/DoctorSetSchedule1');
var get_schedule_doctor_router=require('./routes/DoctorGetSchedule');
var save_prescription_router=require('./routes/DoctorPreparePrescription');
var loginRouter=require('./routes/Login');

var app = express();
app.use(cors());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers",
//    "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });
// app.use(function(req, res, next) {
//   res.header('Access-Control-Allow-Origin', "*");
//   res.header('Content-Type', 'application/json')
//   res.header('Access-Control-Allow-Credentials', true);
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   next();
// });
app.use('/register_doctor',register_doctor_router);
app.use('/api/login',loginRouter);
app.use('/profile_doctor',profile_doctor_router);
app.use('/change_passsword_doctor',change_passsword_doctor_router);
app.use('/verify_phone_doctor',verify_phone_doctor_router);
app.use('/verify_email_doctor',verify_email_doctor_router);
app.use('/set_schedule_doctor',set_schedule_doctor_router);
app.use('/get_schedule_doctor',get_schedule_doctor_router);
app.use('/save_prescription',save_prescription_router);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// // DB Config
// const db = require('./database_connection/mongoConnection').mongoURI;

// // Connect to MongoDB
// MongoClient
//   .connect(db)
//   .then(() => console.log("MongoDB successfully connected"))
//   .catch(err => console.log(err));

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server up and running on port ${port} !`));
module.exports = app;
