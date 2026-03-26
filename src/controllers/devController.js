import prisma from "../config/prisma.js";
import bcrypt from "bcryptjs";

export const seedAllData = async (_req, res) => {
  try {
    const existingContrato = await prisma.contrato.findFirst({
      include: {
        moto: true,
      },
    });

    if (existingContrato) {
      return res.json({
        ok: true,
        message: "La base ya tenía datos iniciales",
        contratoId: existingContrato.id,
        motoId: existingContrato.motoId,
      });
    }

    const moto = await prisma.moto.create({
      data: {
        marca: "AKT",
        modelo: "NKD 125",
        placa: "EGD34F",
        anio: 2024,
        kmActual: 0,
        ultimoCambioAceiteKm: 0,
        ultimoCambioAceiteFecha: new Date("2026-03-20T00:00:00.000Z"),
        intervaloAceite: 3000,
      },
    });

    const contrato = await prisma.contrato.create({
      data: {
        cuotaDiaria: 30000,
        fechaInicio: new Date("2026-03-20T00:00:00.000Z"),
        arrendatario: "Juan Trujillo",
        dueno: "Propietario",
        motoId: moto.id,
      },
    });

    await prisma.repuesto.createMany({
      data: [
        {
          fecha: new Date("2026-03-20T00:00:00.000Z"),
          nombre: "Aceite Castrol 20W50",
          costo: 39000,
          pagadoPor: "DUENO",
          categoria: "mantenimiento",
          contratoId: contrato.id,
        },
        {
          fecha: new Date("2026-03-20T00:00:00.000Z"),
          nombre: "Guaya velocimetro",
          costo: 19000,
          pagadoPor: "DUENO",
          categoria: "mecanico",
          contratoId: contrato.id,
        },
        {
          fecha: new Date("2026-03-20T00:00:00.000Z"),
          nombre: "Retenedor pata de cambios",
          costo: 7000,
          pagadoPor: "DUENO",
          categoria: "mecanico",
          contratoId: contrato.id,
        },
        {
          fecha: new Date("2026-03-20T00:00:00.000Z"),
          nombre: "Pera de cambios",
          costo: 25000,
          pagadoPor: "DUENO",
          categoria: "transmision",
          contratoId: contrato.id,
        },
      ],
    });

    await prisma.maintenanceLog.create({
      data: {
        tipo: "OIL_CHANGE",
        fecha: new Date("2026-03-20T00:00:00.000Z"),
        km: 0,
        detalle: "Cambio inicial de aceite",
        costo: 39000,
        motoId: moto.id,
      },
    });

    const ownerHash = await bcrypt.hash("123456", 10);
    const tenantHash = await bcrypt.hash("123456", 10);

    await prisma.user.createMany({
      data: [
        {
          nombre: "Propietario",
          email: "owner@mototrack.com",
          passwordHash: ownerHash,
          role: "OWNER",
          contratoId: contrato.id,
        },
        {
          nombre: "Juan Trujillo",
          email: "juan@mototrack.com",
          passwordHash: tenantHash,
          role: "TENANT",
          contratoId: contrato.id,
        },
      ],
    });

    return res.json({
      ok: true,
      message: "Datos iniciales creados correctamente",
      motoId: moto.id,
      contratoId: contrato.id,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error sembrando datos",
      error: error.message,
    });
  }
};

export const getUsersDebug = async (_req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        nombre: true,
        email: true,
        role: true,
        contratoId: true,
      },
    });

    return res.json(users);
  } catch (error) {
    return res.status(500).json({
      message: "Error al obtener usuarios",
      error: error.message,
    });
  }
};

export const getContratoDebug = async (_req, res) => {
  try {
    const contrato = await prisma.contrato.findFirst({
      include: {
        moto: true,
      },
    });

    return res.json(contrato);
  } catch (error) {
    return res.status(500).json({
      message: "Error al obtener contrato",
      error: error.message,
    });
  }
};