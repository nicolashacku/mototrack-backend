import { Router } from "express";
import {
  createPago,
  deletePago,
  getPagos,
  updatePagoEstado
} from "../controllers/pagoController.js";

const router = Router();

router.get("/", getPagos);
router.post("/", createPago);
router.patch("/:id/estado", updatePagoEstado);
router.delete("/:id", deletePago);

export default router;