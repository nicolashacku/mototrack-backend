import prisma from "../config/prisma.js";

export const getDashboardData = async (_req, res) => {
  try {
    const moto = await prisma.moto.findFirst({
      include: {
        contrato: true
      }
    });

    if (!moto || !moto.contrato) {
      return res.status(404).json({
        message: "No hay datos iniciales cargados en la base de datos."
      });
    }

    const contrato = await prisma.contrato.findUnique({
      where: { id: moto.contrato.id }
    });

    const pagos = await prisma.pago.findMany({
      where: { contratoId: contrato.id },
      orderBy: { fecha: "desc" }
    });

    const repuestos = await prisma.repuesto.findMany({
      where: { contratoId: contrato.id },
      orderBy: { fecha: "desc" }
    });

    return res.json({
      moto: {
        id: moto.id,
        marca: moto.marca,
        modelo: moto.modelo,
        placa: moto.placa,
        año: moto.anio,
        kmActual: moto.kmActual,
        ultimoCambioAceite: {
          km: moto.ultimoCambioAceiteKm,
          fecha: moto.ultimoCambioAceiteFecha
        },
        intervaloAceite: moto.intervaloAceite
      },
      contrato: {
        id: contrato.id,
        cuotaDiaria: contrato.cuotaDiaria,
        fechaInicio: contrato.fechaInicio,
        arrendatario: contrato.arrendatario,
        dueño: contrato.dueno
      },
      pagos: pagos.map((p) => ({
        id: p.id,
        fecha: p.fecha,
        monto: p.monto,
        semana: p.semana,
        estado: p.estado.toLowerCase(),
        comprobante: p.comprobante
      })),
      repuestos: repuestos.map((r) => ({
        id: r.id,
        fecha: r.fecha,
        nombre: r.nombre,
        costo: r.costo,
        pagadoPor: r.pagadoPor === "DUENO" ? "dueño" : "arrendatario",
        categoria: r.categoria
      }))
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error al obtener dashboard",
      error: error.message
    });
  }
};