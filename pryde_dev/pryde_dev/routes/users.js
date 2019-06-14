var express = require('express');
var router = express.Router();
// var connection=require('../database_connection/database');
let EmailModel = require('../models/email');
/* GET users listing. */
router.post('/', async (req, res, next)=> {
  try {
    let email = new EmailModel(req.body);
    let result = await email.save();
    res.send(result);
} catch (error) {
    res.status(500).send(error);
} 
});
 router.get("/people", async (request, response) => {
  try {
      var result = await EmailModel.find().exec();
      response.send(result);
  } catch (error) {
      response.status(500).send(error);
  }
});
  //****** */
// let msg = new EmailModel({
//   email: 'ADA.LOVELACE@GMAIL'
// })
// msg.save()
//    .then(doc => {
//      console.log(doc);
//      res.send(doc);
//    })
//    .catch(err => {
//      console.error(err);
//      res.send(err);
//    })


module.exports = router;
