import { Router } from "express";
import {
  createPago,
  deletePago,
  getPagos,
  updatePago,
  updatePagoEstado
} from "../controllers/pagoController.js";
import { authRequired, requireOwner } from "../middleware/auth.js";
import upload from "../config/upload.js";

const router = Router();

router.get("/", authRequired, getPagos);
router.post("/", authRequired, upload.single("comprobante"), createPago);
router.put("/:id", authRequired, upload.single("comprobante"), updatePago);
router.patch("/:id/estado", authRequired, requireOwner, updatePagoEstado);
router.delete("/:id", authRequired, requireOwner, deletePago);

export default router;