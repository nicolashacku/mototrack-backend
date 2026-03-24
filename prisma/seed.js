import { PrismaClient, PagadoPor, UserRole, MaintenanceType } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  await prisma.user.deleteMany();
  await prisma.maintenanceLog.deleteMany();
  await prisma.pago.deleteMany();
  await prisma.repuesto.deleteMany();
  await prisma.contrato.deleteMany();
  await prisma.moto.deleteMany();

  const moto = await prisma.moto.create({
    data: {
      marca: "AKT",
      modelo: "NKD 125",
      placa: "EGD34F",
      anio: 2024,
      kmActual: 0,
      ultimoCambioAceiteKm: 0,
      ultimoCambioAceiteFecha: new Date("2026-03-20T00:00:00.000Z"),
      intervaloAceite: 3000
    }
  });

  const contrato = await prisma.contrato.create({
    data: {
      cuotaDiaria: 30000,
      fechaInicio: new Date("2026-03-20T00:00:00.000Z"),
      arrendatario: "Juan Trujillo",
      dueno: "Propietario",
      motoId: moto.id
    }
  });

  await prisma.repuesto.createMany({
    data: [
      {
        fecha: new Date("2026-03-20T00:00:00.000Z"),
        nombre: "Aceite Castrol 20W50",
        costo: 39000,
        pagadoPor: PagadoPor.DUENO,
        categoria: "mantenimiento",
        contratoId: contrato.id
      },
      {
        fecha: new Date("2026-03-20T00:00:00.000Z"),
        nombre: "Guaya velocimetro",
        costo: 19000,
        pagadoPor: PagadoPor.DUENO,
        categoria: "mecanico",
        contratoId: contrato.id
      },
      {
        fecha: new Date("2026-03-20T00:00:00.000Z"),
        nombre: "Retenedor pata de cambios",
        costo: 7000,
        pagadoPor: PagadoPor.DUENO,
        categoria: "mecanico",
        contratoId: contrato.id
      },
      {
        fecha: new Date("2026-03-20T00:00:00.000Z"),
        nombre: "Pera de cambios",
        costo: 25000,
        pagadoPor: PagadoPor.DUENO,
        categoria: "transmision",
        contratoId: contrato.id
      }
    ]
  });

  await prisma.maintenanceLog.create({
    data: {
      tipo: MaintenanceType.OIL_CHANGE,
      fecha: new Date("2026-03-20T00:00:00.000Z"),
      km: 0,
      detalle: "Cambio inicial de aceite",
      costo: 39000,
      motoId: moto.id
    }
  });

  const ownerHash = await bcrypt.hash("123456", 10);
  const tenantHash = await bcrypt.hash("123456", 10);

  await prisma.user.createMany({
    data: [
      {
        nombre: "Propietario",
        email: "owner@mototrack.com",
        passwordHash: ownerHash,
        role: UserRole.OWNER,
        contratoId: contrato.id
      },
      {
        nombre: "Juan Trujillo",
        email: "juan@mototrack.com",
        passwordHash: tenantHash,
        role: UserRole.TENANT,
        contratoId: contrato.id
      }
    ]
  });

  console.log("Seed completado.");
  console.log("OWNER -> owner@mototrack.com / 123456");
  console.log("TENANT -> juan@mototrack.com / 123456");
}

main()
  .catch((e) => {
    console.error("Error en seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });