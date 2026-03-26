import { Router } from "express";
import {
  seedAllData,
  getUsersDebug,
  getContratoDebug,
} from "../controllers/devController.js";

const router = Router();

router.post("/seed-all", seedAllData);
router.get("/users", getUsersDebug);
router.get("/contrato", getContratoDebug);

export default router;