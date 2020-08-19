const express = require('express');
const router = express.Router();

const AbsenceManager = require('../controllers/AbsenceManager.controller');

// register controllers
const absenceManager = new AbsenceManager();
absenceManager.register(router);


module.exports = router;