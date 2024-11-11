import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {getDataSources,getVendorList} from  '../controllers/dataSourceController.js'

const router = express.Router();

router.post('/getVendorList',authMiddleware,getVendorList);
router.post('/getDataSources' ,authMiddleware,getDataSources);

export default router;