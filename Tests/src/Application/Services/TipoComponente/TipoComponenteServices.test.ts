import { CreateTipoComponenteService } from "@proodos/application/Services/TipoComponente/CreateTipoComponenteService";
import { GetAllTiposComponenteService } from "@proodos/application/Services/TipoComponente/GetAllTiposComponenteService";
import { GetTipoComponenteByIdService } from "@proodos/application/Services/TipoComponente/GetTipoComponenteByIdService";
import { PatchTipoComponenteService } from "@proodos/application/Services/TipoComponente/PatchTipoComponenteService";
import { UpdateTipoComponenteService } from "@proodos/application/Services/TipoComponente/UpdateTipoComponenteService";
import { ITipoComponenteRepository } from "@proodos/application/Interfaces/ITipoComponenteRepository";
import { ILogger } from "@proodos/application/Interfaces/ILogger";
import { CreateTipoComponenteDTO } from "@proodos/application/DTOs/TipoComponente/CreateTipoComponenteDTO";
import { PatchTipoComponenteDTO } from "@proodos/application/DTOs/TipoComponente/PatchTipoComponenteDTO";
import { UpdateTipoComponenteDTO } from "@proodos/application/DTOs/TipoComponente/UpdateTipoComponenteDTO";

const buildRepository = (): jest.Mocked<ITipoComponenteRepository> => ({
  create: jest.fn(),
  update: jest.fn(),
  patch: jest.fn(),
  getById: jest.fn(),
  getAll: jest.fn(),
  exists: jest.fn(),
});

const buildLogger = (): jest.Mocked<ILogger> => ({
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
  debug: jest.fn(),
});

describe("TipoComponente services", () => {
  it("should create tipo componente", async () => {
    // Arrange
    const repository = buildRepository();
    const logger = buildLogger();
    const dto: CreateTipoComponenteDTO = { nombre: "Hero", estado: "ACTIVO" };
    repository.create.mockResolvedValue({ id_tipo_componente: 1, ...dto } as never);
    const service = new CreateTipoComponenteService(repository, logger);

    // Act
    const result = await service.execute(dto);

    // Assert
    expect(logger.info).toHaveBeenCalledWith(
      "[Service] CreateTipoComponenteService.execute()"
    );
    expect(repository.create).toHaveBeenCalled();
    expect(result.id_tipo_componente).toBe(1);
  });

  it("should update tipo componente", async () => {
    // Arrange
    const repository = buildRepository();
    const dto: UpdateTipoComponenteDTO = {
      id_tipo_componente: 2,
      nombre: "Banner",
      estado: "INACTIVO",
    };
    repository.update.mockResolvedValue(dto as never);
    const service = new UpdateTipoComponenteService(repository);

    // Act
    const result = await service.execute(dto);

    // Assert
    expect(repository.update).toHaveBeenCalledWith(dto);
    expect(result.id_tipo_componente).toBe(2);
  });

  it("should patch tipo componente", async () => {
    // Arrange
    const repository = buildRepository();
    const dto: PatchTipoComponenteDTO = { nombre: "Promo" };
    repository.patch.mockResolvedValue({ id_tipo_componente: 3, nombre: "Promo" } as never);
    const service = new PatchTipoComponenteService(repository);

    // Act
    const result = await service.execute(3, dto);

    // Assert
    expect(repository.patch).toHaveBeenCalledWith(3, dto);
    expect(result.nombre).toBe("Promo");
  });

  it("should get tipo componente by id", async () => {
    // Arrange
    const repository = buildRepository();
    const logger = buildLogger();
    repository.getById.mockResolvedValue({ id_tipo_componente: 4 } as never);
    const service = new GetTipoComponenteByIdService(repository, logger);

    // Act
    const result = await service.execute(4);

    // Assert
    expect(result?.id_tipo_componente).toBe(4);
  });

  it("should list tipos componente", async () => {
    // Arrange
    const repository = buildRepository();
    const logger = buildLogger();
    repository.getAll.mockResolvedValue([{ id_tipo_componente: 5 }] as never);
    const service = new GetAllTiposComponenteService(repository, logger);

    // Act
    const result = await service.execute();

    // Assert
    expect(result).toHaveLength(1);
  });
});
