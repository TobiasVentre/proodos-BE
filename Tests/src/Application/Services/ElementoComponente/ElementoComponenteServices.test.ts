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
import { ICreateElementoComponenteDTO } from "@proodos/application/DTOs/ElementoComponente/ICreateElementoComponenteDTO";
import { IPatchElementoComponenteDTO } from "@proodos/application/DTOs/ElementoComponente/IPatchElementoComponenteDTO";
import { IUpdateElementoComponenteDTO } from "@proodos/application/DTOs/ElementoComponente/IUpdateElementoComponenteDTO";

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

const buildElementoBase = (
  overrides: Partial<{
    id_componente: number;
    id_tipo_elemento: number;
    nombre: string;
    icono_img: string | null;
    descripcion: string | null;
    link: string | null;
    orden: number;
    css_url: string | null;
  }> = {}
): ICreateElementoComponenteDTO => {
  const base = {
    id_componente: 1,
    id_tipo_elemento: 2,
    nombre: "Header",
    icono_img: "icon.png" as string | null,
    descripcion: "desc" as string | null,
    link: "https://example.com" as string | null,
    orden: 1,
    css_url: "styles.css" as string | null,
  };
  const values = { ...base, ...overrides };

  return {
    id_componente: values.id_componente,
    id_tipo_elemento: values.id_tipo_elemento,
    nombre: values.nombre,
    icono_img: values.icono_img,
    descripcion: values.descripcion,
    link: values.link,
    orden: values.orden,
    css_url: values.css_url,
  };
};

const buildElementoComponente = (
  overrides: Partial<{
    id_elemento: number;
    id_componente: number;
    id_tipo_elemento: number;
    nombre: string;
    icono_img: string | null;
    descripcion: string | null;
    link: string | null;
    orden: number;
    css_url: string | null;
  }> = {}
) => {
  const base = buildElementoBase();
  const values = {
    id_elemento: 1,
    id_componente: base.id_componente,
    id_tipo_elemento: base.id_tipo_elemento,
    nombre: base.nombre,
    icono_img: base.icono_img ?? null,
    descripcion: base.descripcion ?? null,
    link: base.link ?? null,
    orden: base.orden,
    css_url: base.css_url ?? null,
    ...overrides,
  };

  return {
    id_elemento: values.id_elemento,
    id_componente: values.id_componente,
    id_tipo_elemento: values.id_tipo_elemento,
    nombre: values.nombre,
    icono_img: values.icono_img ?? null,
    descripcion: values.descripcion ?? null,
    link: values.link ?? null,
    orden: values.orden,
    css_url: values.css_url ?? null,
  };
};

describe("ElementoComponente services", () => {
  it("should create elemento componente when componente and tipo exist", async () => {
    // Arrange
    const elementoRepository = buildElementoRepository();
    const componenteRepository = buildComponenteRepository();
    const tipoElementoRepository = buildTipoElementoRepository();
    const logger = buildLogger();
    const dto = buildElementoBase();
    const created = buildElementoComponente({ id_elemento: 9 });
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
    const dto = buildElementoBase({ id_componente: 99 });
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

  it("should throw NotFoundError when tipo elemento does not exist on create", async () => {
    // Arrange
    const elementoRepository = buildElementoRepository();
    const componenteRepository = buildComponenteRepository();
    const tipoElementoRepository = buildTipoElementoRepository();
    const logger = buildLogger();
    const dto = buildElementoBase({ id_tipo_elemento: 99 });
    componenteRepository.getById.mockResolvedValue({ id_componente: 1 } as never);
    tipoElementoRepository.exists.mockResolvedValue(false);
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
    const dto: IUpdateElementoComponenteDTO = {
      ...buildElementoBase({
        id_componente: 2,
        id_tipo_elemento: 3,
        nombre: "Hero",
      }),
      id_elemento: 1,
    };
    componenteRepository.getById.mockResolvedValue({ id_componente: 2 } as never);
    tipoElementoRepository.exists.mockResolvedValue(true);
    elementoRepository.update.mockResolvedValue(
      buildElementoComponente({
        id_elemento: 1,
        id_componente: 2,
        id_tipo_elemento: 3,
        nombre: "Hero",
      })
    );
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

  it("should throw NotFoundError when componente does not exist on update", async () => {
    // Arrange
    const elementoRepository = buildElementoRepository();
    const componenteRepository = buildComponenteRepository();
    const tipoElementoRepository = buildTipoElementoRepository();
    const dto: IUpdateElementoComponenteDTO = {
      ...buildElementoBase({ id_componente: 200 }),
      id_elemento: 10,
    };
    componenteRepository.getById.mockResolvedValue(null);
    const service = new UpdateElementoComponenteService(
      elementoRepository,
      componenteRepository,
      tipoElementoRepository
    );

    // Act
    const action = () => service.execute(dto);

    // Assert
    await expect(action()).rejects.toBeInstanceOf(NotFoundError);
  });

  it("should throw NotFoundError when tipo elemento does not exist on update", async () => {
    // Arrange
    const elementoRepository = buildElementoRepository();
    const componenteRepository = buildComponenteRepository();
    const tipoElementoRepository = buildTipoElementoRepository();
    const dto: IUpdateElementoComponenteDTO = {
      ...buildElementoBase({ id_tipo_elemento: 300 }),
      id_elemento: 11,
    };
    componenteRepository.getById.mockResolvedValue({ id_componente: 1 } as never);
    tipoElementoRepository.exists.mockResolvedValue(false);
    const service = new UpdateElementoComponenteService(
      elementoRepository,
      componenteRepository,
      tipoElementoRepository
    );

    // Act
    const action = () => service.execute(dto);

    // Assert
    await expect(action()).rejects.toBeInstanceOf(NotFoundError);
  });

  it("should patch elemento componente and validate references", async () => {
    // Arrange
    const elementoRepository = buildElementoRepository();
    const componenteRepository = buildComponenteRepository();
    const tipoElementoRepository = buildTipoElementoRepository();
    const dto: IPatchElementoComponenteDTO = { id_componente: 5, id_tipo_elemento: 6 };
    elementoRepository.patch.mockResolvedValue(buildElementoComponente({ id_elemento: 3 }));
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

  it("should throw NotFoundError when componente does not exist on patch", async () => {
    // Arrange
    const elementoRepository = buildElementoRepository();
    const componenteRepository = buildComponenteRepository();
    const tipoElementoRepository = buildTipoElementoRepository();
    const dto: IPatchElementoComponenteDTO = { id_componente: 99 };
    componenteRepository.getById.mockResolvedValue(null);
    const service = new PatchElementoComponenteService(
      elementoRepository,
      componenteRepository,
      tipoElementoRepository
    );

    // Act
    const action = () => service.execute(3, dto);

    // Assert
    await expect(action()).rejects.toBeInstanceOf(NotFoundError);
  });

  it("should throw NotFoundError when tipo elemento does not exist on patch", async () => {
    // Arrange
    const elementoRepository = buildElementoRepository();
    const componenteRepository = buildComponenteRepository();
    const tipoElementoRepository = buildTipoElementoRepository();
    const dto: IPatchElementoComponenteDTO = { id_tipo_elemento: 44 };
    tipoElementoRepository.exists.mockResolvedValue(false);
    const service = new PatchElementoComponenteService(
      elementoRepository,
      componenteRepository,
      tipoElementoRepository
    );

    // Act
    const action = () => service.execute(3, dto);

    // Assert
    await expect(action()).rejects.toBeInstanceOf(NotFoundError);
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
    const logger = buildLogger();
    elementoRepository.getById.mockResolvedValue({ id_elemento: 4 } as never);
    const service = new GetElementoComponenteByIdService(elementoRepository, logger);

    // Act
    const result = await service.execute(4);

    // Assert
    expect(elementoRepository.getById).toHaveBeenCalledWith(4);
    expect(result?.id_elemento).toBe(4);
  });

  it("should list elementos componente", async () => {
    // Arrange
    const elementoRepository = buildElementoRepository();
    const logger = buildLogger();
    elementoRepository.getAll.mockResolvedValue([{ id_elemento: 1 }] as never);
    const service = new GetAllElementosComponenteService(elementoRepository, logger);

    // Act
    const result = await service.execute();

    // Assert
    expect(elementoRepository.getAll).toHaveBeenCalled();
    expect(result).toHaveLength(1);
  });

  it("should list elementos by componente", async () => {
    // Arrange
    const elementoRepository = buildElementoRepository();
    const logger = buildLogger();
    elementoRepository.getByComponente.mockResolvedValue([
      { id_elemento: 1, id_componente: 2 },
    ] as never);
    const service = new GetElementosByComponenteService(elementoRepository, logger);

    // Act
    const result = await service.execute(2);

    // Assert
    expect(elementoRepository.getByComponente).toHaveBeenCalledWith(2);
    expect(result[0].id_componente).toBe(2);
  });
});
