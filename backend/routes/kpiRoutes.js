const express = require('express');
const { getKPIs, createKPI } = require('../controllers/kpiController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

console.log("test")
router.post('/getKPIs',authMiddleware, getKPIs);
router.get('/createKPI',createKPI)

module.exports = router;
