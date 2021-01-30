const express = require("express");
const router = express.Router();


/* GET home page */
router.get(`/profile`, (req, res, next) => res.render(`user-views/profile`));

module.exports = router;
