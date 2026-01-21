import { CreateTipoElementoService } from "@proodos/application/Services/TipoElemento/CreateTipoElementoService";
import { DeleteTipoElementoService } from "@proodos/application/Services/TipoElemento/DeleteTipoElementoService";
import { GetAllTiposElementoService } from "@proodos/application/Services/TipoElemento/GetAllTiposElementoService";
import { GetTipoElementoByIdService } from "@proodos/application/Services/TipoElemento/GetTipoElementoByIdService";
import { PatchTipoElementoService } from "@proodos/application/Services/TipoElemento/PatchTipoElementoService";
import { UpdateTipoElementoService } from "@proodos/application/Services/TipoElemento/UpdateTipoElementoService";
import { ITipoElementoRepository } from "@proodos/application/Interfaces/ITipoElementoRepository";
import { ILogger } from "@proodos/application/Interfaces/ILogger";
import { CreateTipoElementoDTO } from "@proodos/application/DTOs/TipoElemento/CreateTipoElementoDTO";
import { PatchTipoElementoDTO } from "@proodos/application/DTOs/TipoElemento/PatchTipoElementoDTO";
import { UpdateTipoElementoDTO } from "@proodos/application/DTOs/TipoElemento/UpdateTipoElementoDTO";

const buildRepository = (): jest.Mocked<ITipoElementoRepository> => ({
  create: jest.fn(),
  update: jest.fn(),
  patch: jest.fn(),
  getById: jest.fn(),
  getAll: jest.fn(),
  delete: jest.fn(),
  exists: jest.fn(),
});

const buildLogger = (): jest.Mocked<ILogger> => ({
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
  debug: jest.fn(),
});

describe("TipoElemento services", () => {
  it("should create tipo elemento", async () => {
    // Arrange
    const repository = buildRepository();
    const logger = buildLogger();
    const dto: CreateTipoElementoDTO = { nombre: "Header" };
    repository.create.mockResolvedValue({ id_tipo_elemento: 1, ...dto } as never);
    const service = new CreateTipoElementoService(repository, logger);

    // Act
    const result = await service.execute(dto);

    // Assert
    expect(logger.info).toHaveBeenCalledWith(
      "[Service] CreateTipoElementoService.execute()"
    );
    expect(repository.create).toHaveBeenCalled();
    expect(result.id_tipo_elemento).toBe(1);
  });

  it("should update tipo elemento", async () => {
    // Arrange
    const repository = buildRepository();
    const dto: UpdateTipoElementoDTO = { id_tipo_elemento: 2, nombre: "Footer" };
    repository.update.mockResolvedValue(dto as never);
    const service = new UpdateTipoElementoService(repository);

    // Act
    const result = await service.execute(dto);

    // Assert
    expect(repository.update).toHaveBeenCalledWith(dto);
    expect(result.id_tipo_elemento).toBe(2);
  });

  it("should patch tipo elemento", async () => {
    // Arrange
    const repository = buildRepository();
    const dto: PatchTipoElementoDTO = { nombre: "Hero" };
    repository.patch.mockResolvedValue({ id_tipo_elemento: 3, nombre: "Hero" } as never);
    const service = new PatchTipoElementoService(repository);

    // Act
    const result = await service.execute(3, dto);

    // Assert
    expect(repository.patch).toHaveBeenCalledWith(3, dto);
    expect(result.nombre).toBe("Hero");
  });

  it("should delete tipo elemento", async () => {
    // Arrange
    const repository = buildRepository();
    const service = new DeleteTipoElementoService(repository);

    // Act
    await service.execute(4);

    // Assert
    expect(repository.delete).toHaveBeenCalledWith(4);
  });

  it("should get tipo elemento by id", async () => {
    // Arrange
    const repository = buildRepository();
    repository.getById.mockResolvedValue({ id_tipo_elemento: 5 } as never);
    const service = new GetTipoElementoByIdService(repository);

    // Act
    const result = await service.execute(5);

    // Assert
    expect(result?.id_tipo_elemento).toBe(5);
  });

  it("should list tipos elemento", async () => {
    // Arrange
    const repository = buildRepository();
    repository.getAll.mockResolvedValue([{ id_tipo_elemento: 6 }] as never);
    const service = new GetAllTiposElementoService(repository);

    // Act
    const result = await service.execute();

    // Assert
    expect(result).toHaveLength(1);
  });
});
