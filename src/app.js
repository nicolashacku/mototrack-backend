import express from "express";
import cors from "cors";

import dashboardRoutes from "./routes/dashboardRoutes.js";
import motoRoutes from "./routes/motoRoutes.js";
import contratoRoutes from "./routes/contratoRoutes.js";
import pagoRoutes from "./routes/pagoRoutes.js";
import repuestoRoutes from "./routes/repuestoRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({
    ok: true,
    message: "MotoTrack API funcionando"
  });
});

app.use("/api/dashboard", dashboardRoutes);
app.use("/api/moto", motoRoutes);
app.use("/api/contrato", contratoRoutes);
app.use("/api/pagos", pagoRoutes);
app.use("/api/repuestos", repuestoRoutes);

export default app;