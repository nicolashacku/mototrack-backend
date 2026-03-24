-- CreateTable
CREATE TABLE `Moto` (
    `id` VARCHAR(191) NOT NULL,
    `marca` VARCHAR(191) NOT NULL,
    `modelo` VARCHAR(191) NOT NULL,
    `placa` VARCHAR(191) NOT NULL,
    `anio` INTEGER NOT NULL,
    `kmActual` INTEGER NOT NULL,
    `ultimoCambioAceiteKm` INTEGER NOT NULL,
    `ultimoCambioAceiteFecha` DATETIME(3) NOT NULL,
    `intervaloAceite` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Moto_placa_key`(`placa`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Contrato` (
    `id` VARCHAR(191) NOT NULL,
    `cuotaDiaria` INTEGER NOT NULL,
    `fechaInicio` DATETIME(3) NOT NULL,
    `arrendatario` VARCHAR(191) NOT NULL,
    `dueno` VARCHAR(191) NOT NULL,
    `motoId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Contrato_motoId_key`(`motoId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pago` (
    `id` VARCHAR(191) NOT NULL,
    `fecha` DATETIME(3) NOT NULL,
    `monto` INTEGER NOT NULL,
    `semana` VARCHAR(191) NOT NULL,
    `estado` ENUM('VERIFICADO', 'PENDIENTE', 'RECHAZADO') NOT NULL DEFAULT 'PENDIENTE',
    `comprobante` VARCHAR(191) NULL,
    `contratoId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Repuesto` (
    `id` VARCHAR(191) NOT NULL,
    `fecha` DATETIME(3) NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `costo` INTEGER NOT NULL,
    `pagadoPor` ENUM('DUENO', 'ARRENDATARIO') NOT NULL,
    `categoria` VARCHAR(191) NOT NULL,
    `contratoId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Contrato` ADD CONSTRAINT `Contrato_motoId_fkey` FOREIGN KEY (`motoId`) REFERENCES `Moto`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pago` ADD CONSTRAINT `Pago_contratoId_fkey` FOREIGN KEY (`contratoId`) REFERENCES `Contrato`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Repuesto` ADD CONSTRAINT `Repuesto_contratoId_fkey` FOREIGN KEY (`contratoId`) REFERENCES `Contrato`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
