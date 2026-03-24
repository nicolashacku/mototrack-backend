import { Router } from "express";
import {
  createRepuesto,
  deleteRepuesto,
  getRepuestos
} from "../controllers/repuestoController.js";

const router = Router();

router.get("/", getRepuestos);
router.post("/", createRepuesto);
router.delete("/:id", deleteRepuesto);

export default router;