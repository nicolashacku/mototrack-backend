import prisma from "../config/prisma.js";

export const getContrato = async (_req, res) => {
  try {
    const contrato = await prisma.contrato.findFirst({
      include: {
        moto: true,
        pagos: true,
        repuestos: true
      }
    });

    if (!contrato) {
      return res.status(404).json({ message: "Contrato no encontrado" });
    }

    return res.json(contrato);
  } catch (error) {
    return res.status(500).json({
      message: "Error al obtener contrato",
      error: error.message
    });
  }
};

export const createContrato = async (req, res) => {
  try {
    const { cuotaDiaria, fechaInicio, arrendatario, dueno, motoId } = req.body;

    const contrato = await prisma.contrato.create({
      data: {
        cuotaDiaria: Number(cuotaDiaria),
        fechaInicio: new Date(fechaInicio),
        arrendatario,
        dueno,
        motoId
      }
    });

    return res.status(201).json(contrato);
  } catch (error) {
    return res.status(500).json({
      message: "Error al crear contrato",
      error: error.message
    });
  }
};

export const updateContrato = async (req, res) => {
  try {
    const { id } = req.params;
    const { cuotaDiaria, fechaInicio, arrendatario, dueno } = req.body;

    const contrato = await prisma.contrato.update({
      where: { id },
      data: {
        cuotaDiaria: Number(cuotaDiaria),
        fechaInicio: new Date(fechaInicio),
        arrendatario,
        dueno
      }
    });

    return res.json(contrato);
  } catch (error) {
    return res.status(500).json({
      message: "Error al actualizar contrato",
      error: error.message
    });
  }
};