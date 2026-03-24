import { Router } from "express";
import {
  createMoto,
  getMoto,
  updateMoto
} from "../controllers/motoController.js";

const router = Router();

router.get("/", getMoto);
router.post("/", createMoto);
router.put("/:id", updateMoto);

export default router;