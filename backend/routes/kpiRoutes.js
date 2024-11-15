import express from "express";
import {
  getKPIs,
  createKPI,
  getTherapyAreas,
  getDistributionModels,
  getRegions,
  getSubjectAreas,
  addCustomKPI,
  deleteCustomKPI,
  editCustomKPI,
  getCategories,
  addManyCustomKPI,
  getKpiFilterByReport,
} from "../controllers/kpiController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

console.log("test");

router.post("/getKPIs", authMiddleware, getKPIs);
router.post("/createKPI", createKPI);

router.get("/getTherapyAreas", authMiddleware, getTherapyAreas);
router.get("/getDistributionModels", authMiddleware, getDistributionModels);
router.get("/getRegions", authMiddleware, getRegions);
router.get("/getSubjectAreas", authMiddleware, getSubjectAreas);
router.get("/getCategories", authMiddleware, getCategories);
router.post("/addCustomKPI", authMiddleware, addCustomKPI);
router.post("/addManyCustomKPIs", authMiddleware, addManyCustomKPI);
router.post("/getKpiByReports", authMiddleware, getKpiFilterByReport);

router.delete("/deleteCustomKPI", authMiddleware, deleteCustomKPI);
router.put("/editCustomKPI", authMiddleware, editCustomKPI);

export default router;
