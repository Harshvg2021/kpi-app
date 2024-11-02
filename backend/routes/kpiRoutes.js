const express = require("express");
const {
  getKPIs,
  createKPI,
  getTherapyAreas,
  getDistributionModels,
  getRegions,
  getSubjectAreas,
  addCustomKPI,
} = require("../controllers/kpiController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

console.log("test");
router.post("/getKPIs", authMiddleware, getKPIs);
router.post("/createKPI", createKPI);

router.get("/getTherapyAreas", authMiddleware, getTherapyAreas);
router.get("/getDistributionModels", authMiddleware, getDistributionModels);
router.get("/getRegions", authMiddleware, getRegions);
router.get("/getSubjectAreas", authMiddleware, getSubjectAreas);
router.post("/addCustomKPI", authMiddleware, addCustomKPI);

module.exports = router;
