const express = require('express');
const {signup, signin, signWithGoogle} = require('../controller/auth');
const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/google', signWithGoogle);


module.exports = router;