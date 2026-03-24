import { Router } from "express";
import {
  createContrato,
  getContrato,
  updateContrato
} from "../controllers/contratoController.js";

const router = Router();

router.get("/", getContrato);
router.post("/", createContrato);
router.put("/:id", updateContrato);

export default router;