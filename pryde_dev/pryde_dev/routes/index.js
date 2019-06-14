var express = require('express');
var router = express.Router();

// const csrf=require('csurf');
// let csrfProtection=csrf();
// router.use(csrfProtection);
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
