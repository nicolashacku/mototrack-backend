import { Router } from "express";
import { updateKmActual } from "../controllers/motoController.js";
import { authRequired, requireOwner } from "../middleware/auth.js";

const router = Router();

router.patch("/:id/km", authRequired, requireOwner, updateKmActual);

export default router;