import express = require("express");
import {getAllWorkshops, getWorkshopFromParamID, updateWorkshopToIsEnded, createWorkshop, updateWorkshop, deleteWorkshop} from "../controllers/workshopController";

const router = express.Router();

router.route("/").get(getAllWorkshops).post(createWorkshop);
router.route("/:id").get(getWorkshopFromParamID).patch(updateWorkshopToIsEnded).patch(updateWorkshop).delete(deleteWorkshop);

export default router;