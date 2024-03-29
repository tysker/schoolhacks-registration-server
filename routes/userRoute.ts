import express = require("express");
import {getAllUsersFromAWorkshop, createUserAndAddToWorkshop} from "../controllers/userController";

const router = express.Router();

router.route("/:id").get(getAllUsersFromAWorkshop).post(createUserAndAddToWorkshop);
export default router;