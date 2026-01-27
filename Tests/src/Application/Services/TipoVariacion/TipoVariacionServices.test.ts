import { CreateTipoVariacionService } from "@proodos/application/Services/TipoVariacion/CreateTipoVariacionService";
import { GetAllTiposVariacionService } from "@proodos/application/Services/TipoVariacion/GetAllTiposVariacionService";
import { GetTipoVariacionByIdService } from "@proodos/application/Services/TipoVariacion/GetTipoVariacionByIdService";
import { GetVariacionesByTipoComponenteService } from "@proodos/application/Services/TipoVariacion/GetVariacionesByTipoComponenteService";
import { PatchTipoVariacionService } from "@proodos/application/Services/TipoVariacion/PatchTipoVariacionService";
import { UpdateTipoVariacionService } from "@proodos/application/Services/TipoVariacion/UpdateTipoVariacionService";
import { ensureTipoComponenteExists } from "@proodos/application/Services/TipoVariacion/ensureTipoComponenteExists";
import { NotFoundError } from "@proodos/application/Errors/NotFoundError";
import { ITipoComponenteRepository } from "@proodos/application/Interfaces/ITipoComponenteRepository";
import { ITipoVariacionRepository } from "@proodos/application/Interfaces/ITipoVariacionRepository";
import { ILogger } from "@proodos/application/Interfaces/ILogger";
import { CreateTipoVariacionDTO } from "@proodos/application/DTOs/TipoVariacion/CreateTipoVariacionDTO";
import { PatchTipoVariacionDTO } from "@proodos/application/DTOs/TipoVariacion/PatchTipoVariacionDTO";
import { UpdateTipoVariacionDTO } from "@proodos/application/DTOs/TipoVariacion/UpdateTipoVariacionDTO";

const buildVariacionRepository = (): jest.Mocked<ITipoVariacionRepository> => ({
  create: jest.fn(),
  update: jest.fn(),
  patch: jest.fn(),
  getById: jest.fn(),
  getAll: jest.fn(),
  getByTipoComponente: jest.fn(),
  delete: jest.fn(),
});

const buildTipoComponenteRepository = (): jest.Mocked<ITipoComponenteRepository> => ({
  create: jest.fn(),
  update: jest.fn(),
  patch: jest.fn(),
  getById: jest.fn(),
  getAll: jest.fn(),
  exists: jest.fn(),
  delete: jest.fn(),
});

const buildLogger = (): jest.Mocked<ILogger> => ({
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
  debug: jest.fn(),
});

describe("TipoVariacion services", () => {
  it("should ensure tipo componente exists", async () => {
    // Arrange
    const tipoComponenteRepository = buildTipoComponenteRepository();
    tipoComponenteRepository.exists.mockResolvedValue(true);

    // Act
    const result = await ensureTipoComponenteExists(tipoComponenteRepository, 1);

    // Assert
    expect(result).toBeUndefined();
  });

  it("should throw NotFoundError when tipo componente does not exist", async () => {
    // Arrange
    const tipoComponenteRepository = buildTipoComponenteRepository();
    tipoComponenteRepository.exists.mockResolvedValue(false);

    // Act
    const action = () => ensureTipoComponenteExists(tipoComponenteRepository, 99);

    // Assert
    await expect(action()).rejects.toBeInstanceOf(NotFoundError);
  });

  it("should create tipo variacion", async () => {
    // Arrange
    const variacionRepository = buildVariacionRepository();
    const tipoComponenteRepository = buildTipoComponenteRepository();
    const logger = buildLogger();
    const dto: CreateTipoVariacionDTO = {
      id_tipo_componente: 2,
      nombre: "Variante",
    };
    tipoComponenteRepository.exists.mockResolvedValue(true);
    variacionRepository.create.mockResolvedValue({ id_tipo_variacion: 1 } as never);
    const service = new CreateTipoVariacionService(
      variacionRepository,
      tipoComponenteRepository,
      logger
    );

    // Act
    const result = await service.execute(dto);

    // Assert
    expect(logger.info).toHaveBeenCalledWith(
      "[Service] CreateTipoVariacionService.execute()"
    );
    expect(result.id_tipo_variacion).toBe(1);
  });

  it("should update tipo variacion", async () => {
    // Arrange
    const variacionRepository = buildVariacionRepository();
    const tipoComponenteRepository = buildTipoComponenteRepository();
    const dto: UpdateTipoVariacionDTO = {
      id_tipo_variacion: 3,
      id_tipo_componente: 2,
      nombre: "Variante",
    };
    tipoComponenteRepository.exists.mockResolvedValue(true);
    variacionRepository.update.mockResolvedValue({ id_tipo_variacion: 3 } as never);
    const service = new UpdateTipoVariacionService(
      variacionRepository,
      tipoComponenteRepository
    );

    // Act
    const result = await service.execute(dto);

    // Assert
    expect(variacionRepository.update).toHaveBeenCalled();
    expect(result.id_tipo_variacion).toBe(3);
  });

  it("should patch tipo variacion", async () => {
    // Arrange
    const variacionRepository = buildVariacionRepository();
    const tipoComponenteRepository = buildTipoComponenteRepository();
    const dto: PatchTipoVariacionDTO = { nombre: "Variante 2" };
    variacionRepository.patch.mockResolvedValue({ id_tipo_variacion: 4 } as never);
    const service = new PatchTipoVariacionService(
      variacionRepository,
      tipoComponenteRepository
    );

    // Act
    const result = await service.execute(4, dto);

    // Assert
    expect(variacionRepository.patch).toHaveBeenCalledWith(4, dto);
    expect(result.id_tipo_variacion).toBe(4);
  });

  it("should validate tipo componente when patching with id_tipo_componente", async () => {
    // Arrange
    const variacionRepository = buildVariacionRepository();
    const tipoComponenteRepository = buildTipoComponenteRepository();
    const dto: PatchTipoVariacionDTO = { id_tipo_componente: 9 };
    tipoComponenteRepository.exists.mockResolvedValue(true);
    variacionRepository.patch.mockResolvedValue({ id_tipo_variacion: 10 } as never);
    const service = new PatchTipoVariacionService(
      variacionRepository,
      tipoComponenteRepository
    );

    // Act
    const result = await service.execute(10, dto);

    // Assert
    expect(tipoComponenteRepository.exists).toHaveBeenCalledWith(9);
    expect(result.id_tipo_variacion).toBe(10);
  });

  it("should get tipo variacion by id", async () => {
    // Arrange
    const variacionRepository = buildVariacionRepository();
    const logger = buildLogger();
    variacionRepository.getById.mockResolvedValue({ id_tipo_variacion: 5 } as never);
    const service = new GetTipoVariacionByIdService(variacionRepository, logger);

    // Act
    const result = await service.execute(5);

    // Assert
    expect(result?.id_tipo_variacion).toBe(5);
  });

  it("should list tipos variacion", async () => {
    // Arrange
    const variacionRepository = buildVariacionRepository();
    const logger = buildLogger();
    variacionRepository.getAll.mockResolvedValue([{ id_tipo_variacion: 6 }] as never);
    const service = new GetAllTiposVariacionService(variacionRepository, logger);

    // Act
    const result = await service.execute();

    // Assert
    expect(result).toHaveLength(1);
  });

  it("should list variaciones by tipo componente", async () => {
    // Arrange
    const variacionRepository = buildVariacionRepository();
    const logger = buildLogger();
    variacionRepository.getByTipoComponente.mockResolvedValue([
      { id_tipo_variacion: 7, id_tipo_componente: 2 },
    ] as never);
    const service = new GetVariacionesByTipoComponenteService(variacionRepository, logger);

    // Act
    const result = await service.execute(2);

    // Assert
    expect(result[0].id_tipo_componente).toBe(2);
  });
});
