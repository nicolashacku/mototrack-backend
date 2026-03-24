import prisma from "../config/prisma.js";

export const getRepuestos = async (_req, res) => {
  try {
    const repuestos = await prisma.repuesto.findMany({
      orderBy: { fecha: "desc" }
    });

    return res.json(repuestos);
  } catch (error) {
    return res.status(500).json({
      message: "Error al obtener repuestos",
      error: error.message
    });
  }
};

export const createRepuesto = async (req, res) => {
  try {
    const { fecha, nombre, costo, pagadoPor, categoria, contratoId } = req.body;

    const repuesto = await prisma.repuesto.create({
      data: {
        fecha: new Date(fecha),
        nombre,
        costo: Number(costo),
        pagadoPor,
        categoria,
        contratoId
      }
    });

    return res.status(201).json(repuesto);
  } catch (error) {
    return res.status(500).json({
      message: "Error al crear repuesto",
      error: error.message
    });
  }
};

export const deleteRepuesto = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.repuesto.delete({
      where: { id }
    });

    return res.json({ message: "Repuesto eliminado correctamente" });
  } catch (error) {
    return res.status(500).json({
      message: "Error al eliminar repuesto",
      error: error.message
    });
  }
};