import { Router } from "express";
import {
  createRepuesto,
  deleteRepuesto,
  getRepuestos,
  updateRepuesto
} from "../controllers/repuestoController.js";
import { authRequired, requireOwner } from "../middleware/auth.js";
import upload from "../config/upload.js";

const router = Router();

router.get("/", authRequired, getRepuestos);
router.post("/", authRequired, requireOwner, upload.single("imagen"), createRepuesto);
router.put("/:id", authRequired, requireOwner, upload.single("imagen"), updateRepuesto);
router.delete("/:id", authRequired, requireOwner, deleteRepuesto);

export default router;