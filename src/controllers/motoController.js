import prisma from "../config/prisma.js";

export const updateKmActual = async (req, res) => {
  try {
    const { id } = req.params;
    const { kmActual } = req.body;

    const moto = await prisma.moto.update({
      where: { id },
      data: {
        kmActual: Number(kmActual)
      }
    });

    await prisma.maintenanceLog.create({
      data: {
        tipo: "KM_UPDATE",
        fecha: new Date(),
        km: Number(kmActual),
        detalle: "Actualización manual de kilometraje",
        motoId: id
      }
    });

    return res.json(moto);
  } catch (error) {
    return res.status(500).json({
      message: "Error al actualizar kilometraje",
      error: error.message
    });
  }
};