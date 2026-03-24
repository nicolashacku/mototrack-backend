import { PrismaClient, EstadoPago, PagadoPor } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
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

  await prisma.pago.createMany({
    data: []
  });

  console.log("Seed completado correctamente.");
  console.log("Moto:", moto.placa, moto.modelo);
  console.log("Contrato:", contrato.arrendatario, "-", contrato.cuotaDiaria);
}

main()
  .catch((e) => {
    console.error("Error en seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });