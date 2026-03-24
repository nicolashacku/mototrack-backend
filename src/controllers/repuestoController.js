import prisma from "../config/prisma.js";

export const getRepuestos = async (req, res) => {
  try {
    const repuestos = await prisma.repuesto.findMany({
      where: { contratoId: req.user.contratoId },
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
    const { fecha, nombre, costo, pagadoPor, categoria } = req.body;

    const repuesto = await prisma.repuesto.create({
      data: {
        fecha: new Date(fecha),
        nombre,
        costo: Number(costo),
        pagadoPor,
        categoria,
        imagen: req.file ? `/uploads/${req.file.filename}` : null,
        contratoId: req.user.contratoId
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

export const updateRepuesto = async (req, res) => {
  try {
    const { id } = req.params;
    const { fecha, nombre, costo, pagadoPor, categoria } = req.body;

    const repuesto = await prisma.repuesto.update({
      where: { id },
      data: {
        fecha: new Date(fecha),
        nombre,
        costo: Number(costo),
        pagadoPor,
        categoria,
        ...(req.file ? { imagen: `/uploads/${req.file.filename}` } : {})
      }
    });

    return res.json(repuesto);
  } catch (error) {
    return res.status(500).json({
      message: "Error al editar repuesto",
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