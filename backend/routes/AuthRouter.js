const express = require('express');
const router = express.Router();
const { signupvalidation,loginvalidation } = require('../middlewares/Authvalidation');

const { signup,login } = require('../controllers/authcontrollers');



/*router.post('/login', (req, res) => {
    res.send('Login success');
});*/
router.post('/signup', signupvalidation, signup);
router.post('/login',loginvalidation , login);


module.exports = router;


  