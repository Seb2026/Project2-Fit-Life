const express = require("express");
const router = express.Router();

const routeGuard = require(`../configs/route-guard.config`);

router.get(`/profile`, routeGuard, (req, res, next) => {
    res.render(`user-views/profile`);
});

module.exports = router;
