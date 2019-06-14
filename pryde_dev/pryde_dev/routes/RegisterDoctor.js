//"use strict";
const express = require("express");
const router = express.Router();
const con = require("../database_connection/mongoConnection").con();
const HashPassword = require("../UtilityClasses/HashPassword");
const { check, validationResult } = require("express-validator/check");
const uuid = require("uuid");
var jwt = require("jsonwebtoken");
const sendMail = require("../UtilityClasses/SendEmail1").send_email;
//var sessionStorage = require('sessionstorage');
const sessionStorage = require("node-sessionstorage");
/**
 *   Validation array to check for the validation
 **/
const paramValidate = [
  check("first_name")
    .not()
    .isEmpty() &&
    check("first_name")
      .isLength({ min: 2, max: 50 })
      .isAlpha()
      .matches(/^[A-Z]+$/i),
  check("email")
    .not()
    .isEmpty()
    .isEmail(),
  check("password")
    .not()
    .isEmpty()
    .isLength({ min: 2, max: 30 })
];

router.post("/", paramValidate, (req, res) => {
  //console.log('****************COOKIE TEST************');
  //console.log(req.cookies['test']);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  con.then(db => {
    db.collection("DoctorProfile")
      .findOne({ email: req.body.email })
      .then(user => {
        if (user) {
          return res.status(400).json({ email: "Email already exists" });
        } else {
          let csrf_token = uuid.v4();
          let auth_token = uuid.v4();

          const newUser = {
            active: false,
            first_name: req.body.first_name,
            email: req.body.email,
            password: HashPassword.encrypt(req.body.password),
            email_verification_code: jwt.sign({ foo: "bar" }, "shhhhh", {
              expiresIn: 12000
            }),
            password_date: new Date().toLocaleString("en-US", {
              timeZone: "Asia/Kolkata"
            }),
            csrf_token: csrf_token,
            auth_token: auth_token
          };

          console.log("Register Body Passed" + req.body);
          db.collection("DoctorProfile").insertOne(newUser, (err, result1) => {
            if (err) {
              res.send({ status: "Sorry Something Went Wrong", error: err });
            } else {
              console.log(
                "EMAILOBJECT INSIDE REGISTERDOCTOR:" + JSON.stringify(newUser)
              );
              sendMail(newUser);
              res.cookie("auth_token", auth_token);
              res.send({ status: "registered", result: result1 });
              updateDoctorSession(); //Enetering the same tokens to the Doctor's Session
            }
          });

          var session_obj = {
            email: req.body.email,
            csrf_token,
            auth_token,
            expired: false
          };

          //Function to insert the same tokens to the Doctor's Session
          updateDoctorSession = () => {
            //   console.log("updateDoctorSession");
            db.collection("DoctorSession").insertOne(
              session_obj,
              (err, result1) => {
                if (err) {
                  //  res.send({insert:'Doctor Session Insert Failed',error:err})
                  console.log("Insert doctor Session error");
                } else {
                  //res.send({insert:' Doctor Session Insert Success'});
                  console.log("Insert doctor Session success");
                }
              }
            );
          }; //End Of UpdateDoctorSession
        } //else part
      }); //then end
  });
});

router.get("/", (req, res) => {
  con.then(db => {
    db.collection("DoctorProfile")
      .find()
      .sort({ first_name: -1 })
      .toArray((err, array) => {
        res.send(array);
      });
  });
  con.catch(() => {
    console.log("error");
  });
});

module.exports = router;
