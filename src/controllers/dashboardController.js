import prisma from "../config/prisma.js";

const mapPago = (p) => ({
  id: p.id,
  fecha: p.fecha,
  monto: p.monto,
  semana: p.semana,
  estado: p.estado.toLowerCase(),
  comprobante: p.comprobante
});

const mapRepuesto = (r) => ({
  id: r.id,
  fecha: r.fecha,
  nombre: r.nombre,
  costo: r.costo,
  pagadoPor: r.pagadoPor === "DUENO" ? "dueño" : "arrendatario",
  categoria: r.categoria,
  imagen: r.imagen
});

export const getDashboardData = async (req, res) => {
  try {
    const contratoId = req.user.contratoId;

    const contrato = await prisma.contrato.findUnique({
      where: { id: contratoId },
      include: {
        moto: true,
        pagos: { orderBy: { fecha: "desc" } },
        repuestos: { orderBy: { fecha: "desc" } }
      }
    });

    if (!contrato) {
      return res.status(404).json({ message: "Contrato no encontrado" });
    }

    const mantenimientos = await prisma.maintenanceLog.findMany({
      where: { motoId: contrato.moto.id },
      orderBy: { fecha: "desc" }
    });

    const pagosVerificados = contrato.pagos
      .filter((p) => p.estado === "VERIFICADO")
      .reduce((acc, p) => acc + p.monto, 0);

    const diasDesdeInicio = Math.max(
      0,
      Math.floor((new Date() - new Date(contrato.fechaInicio)) / 86400000)
    );

    const totalGenerado = diasDesdeInicio * contrato.cuotaDiaria;
    const deudaActual = totalGenerado - pagosVerificados;

    return res.json({
      moto: {
        id: contrato.moto.id,
        marca: contrato.moto.marca,
        modelo: contrato.moto.modelo,
        placa: contrato.moto.placa,
        año: contrato.moto.anio,
        kmActual: contrato.moto.kmActual,
        ultimoCambioAceite: {
          km: contrato.moto.ultimoCambioAceiteKm,
          fecha: contrato.moto.ultimoCambioAceiteFecha
        },
        intervaloAceite: contrato.moto.intervaloAceite
      },
      contrato: {
        id: contrato.id,
        cuotaDiaria: contrato.cuotaDiaria,
        fechaInicio: contrato.fechaInicio,
        arrendatario: contrato.arrendatario,
        dueño: contrato.dueno
      },
      pagos: contrato.pagos.map(mapPago),
      repuestos: contrato.repuestos.map(mapRepuesto),
      mantenimientos,
      summary: {
        diasDesdeInicio,
        totalGenerado,
        totalPagado: pagosVerificados,
        deudaActual,
        totalRepuestos: contrato.repuestos.reduce((acc, r) => acc + r.costo, 0),
        ultimoPago: contrato.pagos[0] ? mapPago(contrato.pagos[0]) : null,
        ultimoMantenimiento: mantenimientos[0] || null
      }
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error al obtener dashboard",
      error: error.message
    });
  }
};