import { Router } from "express";
import {
  getMantenimientos,
  registrarCambioAceite
} from "../controllers/mantenimientoController.js";
import { authRequired, requireOwner } from "../middleware/auth.js";

const router = Router();

router.get("/", authRequired, getMantenimientos);
router.post("/cambio-aceite", authRequired, requireOwner, registrarCambioAceite);

export default router;