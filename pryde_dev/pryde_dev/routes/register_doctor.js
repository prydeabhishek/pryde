var express = require('express');
var router = express.Router();
let DoctorRegistrationModel = require('../models/doctorRegistrationModel');

/* Registring A New Doctor */
router.post('/', async (req, res, next)=> {
  try {
    let doctor = new DoctorRegistrationModel(req.body);
    let result = await doctor.save();
    res.send(result);
} catch (error) {
    res.status(500).send(error);
} 
});


//**For Testing Purpose */
router.get("/", async (request, response) => {
    try {
        var result = await DoctorRegistrationModel.find().exec();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
  });
  

module.exports = router;
