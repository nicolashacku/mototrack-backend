import express from "express";
import cors from "cors";
import path from "path";
import devRoutes from "./routes/devRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import pagoRoutes from "./routes/pagoRoutes.js";
import repuestoRoutes from "./routes/repuestoRoutes.js";
import motoRoutes from "./routes/motoRoutes.js";
import mantenimientoRoutes from "./routes/mantenimientoRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.get("/", (_req, res) => {
  res.json({
    ok: true,
    message: "MotoTrack API funcionando"
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/pagos", pagoRoutes);
app.use("/api/repuestos", repuestoRoutes);
app.use("/api/moto", motoRoutes);
app.use("/api/mantenimiento", mantenimientoRoutes);
app.use("/api/dev", devRoutes);
export default app;