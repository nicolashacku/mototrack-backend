import prisma from "../config/prisma.js";

export const getPagos = async (req, res) => {
  try {
    const pagos = await prisma.pago.findMany({
      where: { contratoId: req.user.contratoId },
      orderBy: { fecha: "desc" }
    });

    return res.json(
      pagos.map((p) => ({
        ...p,
        estado: p.estado.toLowerCase()
      }))
    );
  } catch (error) {
    return res.status(500).json({
      message: "Error al obtener pagos",
      error: error.message
    });
  }
};

export const createPago = async (req, res) => {
  try {
    const { fecha, monto, semana } = req.body;

    const pago = await prisma.pago.create({
      data: {
        fecha: new Date(fecha),
        monto: Number(monto),
        semana,
        estado: "PENDIENTE",
        comprobante: req.file ? `/uploads/${req.file.filename}` : null,
        contratoId: req.user.contratoId
      }
    });

    return res.status(201).json(pago);
  } catch (error) {
    return res.status(500).json({
      message: "Error al crear pago",
      error: error.message
    });
  }
};

export const updatePago = async (req, res) => {
  try {
    const { id } = req.params;
    const { fecha, monto, semana } = req.body;

    const pago = await prisma.pago.update({
      where: { id },
      data: {
        fecha: new Date(fecha),
        monto: Number(monto),
        semana,
        ...(req.file ? { comprobante: `/uploads/${req.file.filename}` } : {})
      }
    });

    return res.json(pago);
  } catch (error) {
    return res.status(500).json({
      message: "Error al editar pago",
      error: error.message
    });
  }
};

export const updatePagoEstado = async (req, res) => {
  try {
    const { id } = req.params;
    const { estado } = req.body;

    const pago = await prisma.pago.update({
      where: { id },
      data: { estado }
    });

    return res.json(pago);
  } catch (error) {
    return res.status(500).json({
      message: "Error al actualizar estado del pago",
      error: error.message
    });
  }
};

export const deletePago = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.pago.delete({
      where: { id }
    });

    return res.json({ message: "Pago eliminado correctamente" });
  } catch (error) {
    return res.status(500).json({
      message: "Error al eliminar pago",
      error: error.message
    });
  }
};