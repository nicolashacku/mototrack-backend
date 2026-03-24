import prisma from "../config/prisma.js";

export const getMantenimientos = async (req, res) => {
  try {
    const contrato = await prisma.contrato.findUnique({
      where: { id: req.user.contratoId },
      include: { moto: true }
    });

    const logs = await prisma.maintenanceLog.findMany({
      where: { motoId: contrato.moto.id },
      orderBy: { fecha: "desc" }
    });

    return res.json(logs);
  } catch (error) {
    return res.status(500).json({
      message: "Error al obtener mantenimientos",
      error: error.message
    });
  }
};

export const registrarCambioAceite = async (req, res) => {
  try {
    const { motoId, fecha, km, detalle, costo } = req.body;

    const log = await prisma.maintenanceLog.create({
      data: {
        tipo: "OIL_CHANGE",
        fecha: new Date(fecha),
        km: Number(km),
        detalle: detalle || "Cambio de aceite",
        costo: costo ? Number(costo) : null,
        motoId
      }
    });

    await prisma.moto.update({
      where: { id: motoId },
      data: {
        kmActual: Number(km),
        ultimoCambioAceiteKm: Number(km),
        ultimoCambioAceiteFecha: new Date(fecha)
      }
    });

    return res.status(201).json(log);
  } catch (error) {
    return res.status(500).json({
      message: "Error al registrar cambio de aceite",
      error: error.message
    });
  }
};