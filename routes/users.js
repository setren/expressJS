var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});
router.get('/comments', (req, res) => {
  res.send('comments')
  console.log('users.js')
})
module.exports = router;
