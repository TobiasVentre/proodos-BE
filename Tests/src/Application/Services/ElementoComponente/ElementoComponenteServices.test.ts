import { CreateElementoComponenteService } from "@proodos/application/Services/ElementoComponente/CreateElementoComponenteService";
import { DeleteElementoComponenteService } from "@proodos/application/Services/ElementoComponente/DeleteElementoComponenteService";
import { GetAllElementosComponenteService } from "@proodos/application/Services/ElementoComponente/GetAllElementosComponenteService";
import { GetElementoComponenteByIdService } from "@proodos/application/Services/ElementoComponente/GetElementoComponenteByIdService";
import { GetElementosByComponenteService } from "@proodos/application/Services/ElementoComponente/GetElementosByComponenteService";
import { PatchElementoComponenteService } from "@proodos/application/Services/ElementoComponente/PatchElementoComponenteService";
import { UpdateElementoComponenteService } from "@proodos/application/Services/ElementoComponente/UpdateElementoComponenteService";
import { NotFoundError } from "@proodos/application/Errors/NotFoundError";
import { IComponenteRepository } from "@proodos/application/Interfaces/IComponenteRepository";
import { IElementoComponenteRepository } from "@proodos/application/Interfaces/IElementoComponenteRepository";
import { ITipoElementoRepository } from "@proodos/application/Interfaces/ITipoElementoRepository";
import { ILogger } from "@proodos/application/Interfaces/ILogger";
import { CreateElementoComponenteDTO } from "@proodos/application/DTOs/ElementoComponente/CreateElementoComponenteDTO";
import { PatchElementoComponenteDTO } from "@proodos/application/DTOs/ElementoComponente/PatchElementoComponenteDTO";
import { UpdateElementoComponenteDTO } from "@proodos/application/DTOs/ElementoComponente/UpdateElementoComponenteDTO";

const buildElementoRepository = (): jest.Mocked<IElementoComponenteRepository> => ({
  create: jest.fn(),
  update: jest.fn(),
  patch: jest.fn(),
  delete: jest.fn(),
  getById: jest.fn(),
  getAll: jest.fn(),
  getByComponente: jest.fn(),
});

const buildComponenteRepository = (): jest.Mocked<IComponenteRepository> => ({
  create: jest.fn(),
  update: jest.fn(),
  patch: jest.fn(),
  delete: jest.fn(),
  softDelete: jest.fn(),
  getById: jest.fn(),
  getAll: jest.fn(),
  getByPlan: jest.fn(),
});

const buildTipoElementoRepository = (): jest.Mocked<ITipoElementoRepository> => ({
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

describe("ElementoComponente services", () => {
  it("should create elemento componente when componente and tipo exist", async () => {
    // Arrange
    const elementoRepository = buildElementoRepository();
    const componenteRepository = buildComponenteRepository();
    const tipoElementoRepository = buildTipoElementoRepository();
    const logger = buildLogger();
    const dto: CreateElementoComponenteDTO = {
      id_componente: 1,
      id_tipo_elemento: 2,
      nombre: "Header",
      icono_img: "icon.png",
      descripcion: "desc",
      link: "https://example.com",
      orden: 1,
      css_url: "styles.css",
    };
    const created = { id_elemento: 9, ...dto };
    componenteRepository.getById.mockResolvedValue({ id_componente: 1 } as never);
    tipoElementoRepository.exists.mockResolvedValue(true);
    elementoRepository.create.mockResolvedValue(created);
    const service = new CreateElementoComponenteService(
      elementoRepository,
      componenteRepository,
      tipoElementoRepository,
      logger
    );

    // Act
    const result = await service.execute(dto);

    // Assert
    expect(logger.info).toHaveBeenCalledWith(
      "[Service] CreateElementoComponenteService.execute()"
    );
    expect(elementoRepository.create).toHaveBeenCalled();
    expect(result).toEqual(created);
  });

  it("should throw NotFoundError when componente does not exist", async () => {
    // Arrange
    const elementoRepository = buildElementoRepository();
    const componenteRepository = buildComponenteRepository();
    const tipoElementoRepository = buildTipoElementoRepository();
    const logger = buildLogger();
    const dto: CreateElementoComponenteDTO = {
      id_componente: 99,
      id_tipo_elemento: 2,
      nombre: "Header",
    };
    componenteRepository.getById.mockResolvedValue(null);
    const service = new CreateElementoComponenteService(
      elementoRepository,
      componenteRepository,
      tipoElementoRepository,
      logger
    );

    // Act
    const action = () => service.execute(dto);

    // Assert
    await expect(action()).rejects.toBeInstanceOf(NotFoundError);
  });

  it("should update elemento componente when dependencies exist", async () => {
    // Arrange
    const elementoRepository = buildElementoRepository();
    const componenteRepository = buildComponenteRepository();
    const tipoElementoRepository = buildTipoElementoRepository();
    const dto: UpdateElementoComponenteDTO = {
      id_elemento: 1,
      id_componente: 2,
      id_tipo_elemento: 3,
      nombre: "Hero",
    };
    componenteRepository.getById.mockResolvedValue({ id_componente: 2 } as never);
    tipoElementoRepository.exists.mockResolvedValue(true);
    elementoRepository.update.mockResolvedValue({
      id_elemento: 1,
      id_componente: 2,
      id_tipo_elemento: 3,
      nombre: "Hero",
    } as never);
    const service = new UpdateElementoComponenteService(
      elementoRepository,
      componenteRepository,
      tipoElementoRepository
    );

    // Act
    const result = await service.execute(dto);

    // Assert
    expect(elementoRepository.update).toHaveBeenCalled();
    expect(result.id_elemento).toBe(1);
  });

  it("should patch elemento componente and validate references", async () => {
    // Arrange
    const elementoRepository = buildElementoRepository();
    const componenteRepository = buildComponenteRepository();
    const tipoElementoRepository = buildTipoElementoRepository();
    const dto: PatchElementoComponenteDTO = { id_componente: 5, id_tipo_elemento: 6 };
    elementoRepository.patch.mockResolvedValue({ id_elemento: 3 } as never);
    componenteRepository.getById.mockResolvedValue({ id_componente: 5 } as never);
    tipoElementoRepository.exists.mockResolvedValue(true);
    const service = new PatchElementoComponenteService(
      elementoRepository,
      componenteRepository,
      tipoElementoRepository
    );

    // Act
    const result = await service.execute(3, dto);

    // Assert
    expect(elementoRepository.patch).toHaveBeenCalledWith(3, dto);
    expect(result.id_elemento).toBe(3);
  });

  it("should delete elemento componente", async () => {
    // Arrange
    const elementoRepository = buildElementoRepository();
    const service = new DeleteElementoComponenteService(elementoRepository);

    // Act
    await service.execute(9);

    // Assert
    expect(elementoRepository.delete).toHaveBeenCalledWith(9);
  });

  it("should get elemento componente by id", async () => {
    // Arrange
    const elementoRepository = buildElementoRepository();
    elementoRepository.getById.mockResolvedValue({ id_elemento: 4 } as never);
    const service = new GetElementoComponenteByIdService(elementoRepository);

    // Act
    const result = await service.execute(4);

    // Assert
    expect(elementoRepository.getById).toHaveBeenCalledWith(4);
    expect(result?.id_elemento).toBe(4);
  });

  it("should list elementos componente", async () => {
    // Arrange
    const elementoRepository = buildElementoRepository();
    elementoRepository.getAll.mockResolvedValue([{ id_elemento: 1 }] as never);
    const service = new GetAllElementosComponenteService(elementoRepository);

    // Act
    const result = await service.execute();

    // Assert
    expect(elementoRepository.getAll).toHaveBeenCalled();
    expect(result).toHaveLength(1);
  });

  it("should list elementos by componente", async () => {
    // Arrange
    const elementoRepository = buildElementoRepository();
    elementoRepository.getByComponente.mockResolvedValue([
      { id_elemento: 1, id_componente: 2 },
    ] as never);
    const service = new GetElementosByComponenteService(elementoRepository);

    // Act
    const result = await service.execute(2);

    // Assert
    expect(elementoRepository.getByComponente).toHaveBeenCalledWith(2);
    expect(result[0].id_componente).toBe(2);
  });
});
