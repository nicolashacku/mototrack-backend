import prisma from "../config/prisma.js";

export const getMoto = async (_req, res) => {
  try {
    const moto = await prisma.moto.findFirst({
      include: {
        contrato: true
      }
    });

    if (!moto) {
      return res.status(404).json({ message: "Moto no encontrada" });
    }

    return res.json(moto);
  } catch (error) {
    return res.status(500).json({
      message: "Error al obtener la moto",
      error: error.message
    });
  }
};

export const createMoto = async (req, res) => {
  try {
    const {
      marca,
      modelo,
      placa,
      anio,
      kmActual,
      ultimoCambioAceiteKm,
      ultimoCambioAceiteFecha,
      intervaloAceite
    } = req.body;

    const moto = await prisma.moto.create({
      data: {
        marca,
        modelo,
        placa,
        anio: Number(anio),
        kmActual: Number(kmActual),
        ultimoCambioAceiteKm: Number(ultimoCambioAceiteKm),
        ultimoCambioAceiteFecha: new Date(ultimoCambioAceiteFecha),
        intervaloAceite: Number(intervaloAceite)
      }
    });

    return res.status(201).json(moto);
  } catch (error) {
    return res.status(500).json({
      message: "Error al crear la moto",
      error: error.message
    });
  }
};

export const updateMoto = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      marca,
      modelo,
      placa,
      anio,
      kmActual,
      ultimoCambioAceiteKm,
      ultimoCambioAceiteFecha,
      intervaloAceite
    } = req.body;

    const moto = await prisma.moto.update({
      where: { id },
      data: {
        marca,
        modelo,
        placa,
        anio: Number(anio),
        kmActual: Number(kmActual),
        ultimoCambioAceiteKm: Number(ultimoCambioAceiteKm),
        ultimoCambioAceiteFecha: new Date(ultimoCambioAceiteFecha),
        intervaloAceite: Number(intervaloAceite)
      }
    });

    return res.json(moto);
  } catch (error) {
    return res.status(500).json({
      message: "Error al actualizar la moto",
      error: error.message
    });
  }
};