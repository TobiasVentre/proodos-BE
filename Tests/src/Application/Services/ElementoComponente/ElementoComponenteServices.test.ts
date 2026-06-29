import { ICreateElementoComponenteDTO } from "@proodos/application/DTOs/ElementoComponente/ICreateElementoComponenteDTO";
import { IPatchElementoComponenteDTO } from "@proodos/application/DTOs/ElementoComponente/IPatchElementoComponenteDTO";
import { IUpdateElementoComponenteDTO } from "@proodos/application/DTOs/ElementoComponente/IUpdateElementoComponenteDTO";
import { NotFoundError } from "@proodos/application/Errors/NotFoundError";
import { ValidationError } from "@proodos/application/Errors/ValidationError";
import { IComponenteRepository } from "@proodos/application/Interfaces/IComponenteRepository";
import { IElementoComponenteRepository } from "@proodos/application/Interfaces/IElementoComponenteRepository";
import { ILogger } from "@proodos/application/Interfaces/ILogger";
import { ITipoElementoRepository } from "@proodos/application/Interfaces/ITipoElementoRepository";
import { ITipoVariacionRepository } from "@proodos/application/Interfaces/ITipoVariacionRepository";
import { CreateElementoComponenteService } from "@proodos/application/Services/ElementoComponente/CreateElementoComponenteService";
import { DeleteElementoComponenteAsignacionService } from "@proodos/application/Services/ElementoComponente/DeleteElementoComponenteAsignacionService";
import { DeleteElementoComponenteService } from "@proodos/application/Services/ElementoComponente/DeleteElementoComponenteService";
import { GetAllElementosComponenteService } from "@proodos/application/Services/ElementoComponente/GetAllElementosComponenteService";
import { GetElementoComponenteAsignacionesService } from "@proodos/application/Services/ElementoComponente/GetElementoComponenteAsignacionesService";
import { GetElementoComponenteByIdService } from "@proodos/application/Services/ElementoComponente/GetElementoComponenteByIdService";
import { GetElementosByComponenteService } from "@proodos/application/Services/ElementoComponente/GetElementosByComponenteService";
import { PatchElementoComponenteService } from "@proodos/application/Services/ElementoComponente/PatchElementoComponenteService";
import { ReplaceElementoComponenteAsignacionesService } from "@proodos/application/Services/ElementoComponente/ReplaceElementoComponenteAsignacionesService";
import { UpdateElementoComponenteService } from "@proodos/application/Services/ElementoComponente/UpdateElementoComponenteService";
import { UpsertElementoComponenteAsignacionService } from "@proodos/application/Services/ElementoComponente/UpsertElementoComponenteAsignacionService";

const buildElementoRepository = (): jest.Mocked<IElementoComponenteRepository> => ({
  create: jest.fn(),
  update: jest.fn(),
  patch: jest.fn(),
  delete: jest.fn(),
  getById: jest.fn(),
  getAll: jest.fn(),
  getByComponente: jest.fn(),
  getAsignacionesByElemento: jest.fn(),
  replaceAsignaciones: jest.fn(),
  upsertAsignacion: jest.fn(),
  deleteAsignacion: jest.fn(),
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

const buildTipoVariacionRepository = (): jest.Mocked<ITipoVariacionRepository> => ({
  create: jest.fn(),
  update: jest.fn(),
  patch: jest.fn(),
  getById: jest.fn(),
  getAll: jest.fn(),
  getByTipoComponente: jest.fn(),
  delete: jest.fn(),
});

const buildLogger = (): jest.Mocked<ILogger> => ({
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
  debug: jest.fn(),
});

const buildCreateDto = (
  overrides: Partial<ICreateElementoComponenteDTO> = {}
): ICreateElementoComponenteDTO => ({
  id_tipo_elemento: 2,
  nombre: "Header",
  icono_img: "icon.png",
  descripcion: "desc",
  link: "https://example.com",
  orden: 1,
  css_url: "styles.css",
  js_url: null,
  contrato_minimo: null,
  ...overrides,
});

const buildElementoComponente = (overrides: Record<string, unknown> = {}) => ({
  id_elemento: 1,
  id_tipo_elemento: 2,
  nombre: "Header",
  selector: null,
  icono_img: "icon.png",
  descripcion: "desc",
  link: "https://example.com",
  orden: 1,
  css_url: "styles.css",
  js_url: null,
  contrato_minimo: null,
  ...overrides,
});

describe("ElementoComponente services", () => {
  it("should create elemento componente when tipo exists", async () => {
    const elementoRepository = buildElementoRepository();
    const componenteRepository = buildComponenteRepository();
    const tipoElementoRepository = buildTipoElementoRepository();
    const logger = buildLogger();
    const dto = buildCreateDto({ contrato_minimo: { required: ["selector"] } });
    const created = buildElementoComponente({ id_elemento: 9 });
    tipoElementoRepository.exists.mockResolvedValue(true);
    elementoRepository.create.mockResolvedValue(created as never);
    const service = new CreateElementoComponenteService(
      elementoRepository,
      componenteRepository,
      tipoElementoRepository,
      logger
    );

    const result = await service.execute(dto);

    expect(elementoRepository.create).toHaveBeenCalled();
    expect(result).toEqual(created);
  });

  it("should create specific asignacion when create receives id_componente", async () => {
    const elementoRepository = buildElementoRepository();
    const componenteRepository = buildComponenteRepository();
    const tipoElementoRepository = buildTipoElementoRepository();
    const logger = buildLogger();
    const created = buildElementoComponente({ id_elemento: 9 });
    tipoElementoRepository.exists.mockResolvedValue(true);
    componenteRepository.getById.mockResolvedValue({
      id_componente: 5,
      id_tipo_variacion: 3,
    } as never);
    elementoRepository.create.mockResolvedValue(created as never);
    elementoRepository.replaceAsignaciones.mockResolvedValue([]);
    const service = new CreateElementoComponenteService(
      elementoRepository,
      componenteRepository,
      tipoElementoRepository,
      logger
    );

    await service.execute(buildCreateDto({ id_componente: 5 }));

    expect(elementoRepository.replaceAsignaciones).toHaveBeenCalledWith(9, [
      {
        id_elemento_componente_variacion: 0,
        id_elemento: 9,
        id_tipo_variacion: 3,
        id_componente: 5,
        metadata: {},
      },
    ]);
  });

  it("should throw NotFoundError when tipo elemento does not exist on create", async () => {
    const elementoRepository = buildElementoRepository();
    const componenteRepository = buildComponenteRepository();
    const tipoElementoRepository = buildTipoElementoRepository();
    const logger = buildLogger();
    tipoElementoRepository.exists.mockResolvedValue(false);
    const service = new CreateElementoComponenteService(
      elementoRepository,
      componenteRepository,
      tipoElementoRepository,
      logger
    );

    await expect(service.execute(buildCreateDto())).rejects.toBeInstanceOf(NotFoundError);
  });

  it("should update elemento componente when tipo exists", async () => {
    const elementoRepository = buildElementoRepository();
    const tipoElementoRepository = buildTipoElementoRepository();
    const dto: IUpdateElementoComponenteDTO = {
      ...buildCreateDto({ id_tipo_elemento: 3, nombre: "Hero" }),
      id_elemento: 1,
    };
    tipoElementoRepository.exists.mockResolvedValue(true);
    elementoRepository.update.mockResolvedValue(
      buildElementoComponente({ id_elemento: 1, id_tipo_elemento: 3, nombre: "Hero" }) as never
    );
    const service = new UpdateElementoComponenteService(
      elementoRepository,
      tipoElementoRepository
    );

    const result = await service.execute(dto);

    expect(elementoRepository.update).toHaveBeenCalled();
    expect(result.id_elemento).toBe(1);
  });

  it("should patch elemento componente and validate references", async () => {
    const elementoRepository = buildElementoRepository();
    const tipoElementoRepository = buildTipoElementoRepository();
    const dto: IPatchElementoComponenteDTO = { id_tipo_elemento: 6 };
    elementoRepository.patch.mockResolvedValue(buildElementoComponente({ id_elemento: 3 }) as never);
    tipoElementoRepository.exists.mockResolvedValue(true);
    const service = new PatchElementoComponenteService(
      elementoRepository,
      tipoElementoRepository
    );

    const result = await service.execute(3, dto);

    expect(elementoRepository.patch).toHaveBeenCalledWith(3, dto);
    expect(result.id_elemento).toBe(3);
  });

  it("should reject invalid contrato_minimo", async () => {
    const elementoRepository = buildElementoRepository();
    const componenteRepository = buildComponenteRepository();
    const tipoElementoRepository = buildTipoElementoRepository();
    const logger = buildLogger();
    tipoElementoRepository.exists.mockResolvedValue(true);
    const service = new CreateElementoComponenteService(
      elementoRepository,
      componenteRepository,
      tipoElementoRepository,
      logger
    );

    await expect(
      service.execute(buildCreateDto({ contrato_minimo: { fields: { a: { type: "bad" as never } } } }))
    ).rejects.toBeInstanceOf(ValidationError);
  });

  it("should delete elemento componente", async () => {
    const elementoRepository = buildElementoRepository();
    const service = new DeleteElementoComponenteService(elementoRepository);

    await service.execute(9);

    expect(elementoRepository.delete).toHaveBeenCalledWith(9);
  });

  it("should get elemento componente by id", async () => {
    const elementoRepository = buildElementoRepository();
    const logger = buildLogger();
    elementoRepository.getById.mockResolvedValue({ id_elemento: 4 } as never);
    const service = new GetElementoComponenteByIdService(elementoRepository, logger);

    const result = await service.execute(4);

    expect(elementoRepository.getById).toHaveBeenCalledWith(4);
    expect(result?.id_elemento).toBe(4);
  });

  it("should list elementos componente", async () => {
    const elementoRepository = buildElementoRepository();
    const logger = buildLogger();
    elementoRepository.getAll.mockResolvedValue([{ id_elemento: 1 }] as never);
    const service = new GetAllElementosComponenteService(elementoRepository, logger);

    const result = await service.execute();

    expect(elementoRepository.getAll).toHaveBeenCalled();
    expect(result).toHaveLength(1);
  });

  it("should list elementos by componente", async () => {
    const elementoRepository = buildElementoRepository();
    const logger = buildLogger();
    elementoRepository.getByComponente.mockResolvedValue([
      { id_elemento: 1, id_componente: 2 },
    ] as never);
    const service = new GetElementosByComponenteService(elementoRepository, logger);

    const result = await service.execute(2);

    expect(elementoRepository.getByComponente).toHaveBeenCalledWith(2);
    expect(result[0].id_componente).toBe(2);
  });

  it("should list asignaciones by elemento", async () => {
    const elementoRepository = buildElementoRepository();
    const logger = buildLogger();
    elementoRepository.getAsignacionesByElemento.mockResolvedValue([
      { id_elemento_componente_variacion: 1, id_elemento: 2 },
    ] as never);
    const service = new GetElementoComponenteAsignacionesService(
      elementoRepository,
      logger
    );

    const result = await service.execute(2);

    expect(elementoRepository.getAsignacionesByElemento).toHaveBeenCalledWith(2);
    expect(result).toHaveLength(1);
  });

  it("should replace asignaciones after validating metadata", async () => {
    const elementoRepository = buildElementoRepository();
    const tipoVariacionRepository = buildTipoVariacionRepository();
    const componenteRepository = buildComponenteRepository();
    const logger = buildLogger();
    elementoRepository.getById.mockResolvedValue(
      buildElementoComponente({ contrato_minimo: { required: ["selector"] } }) as never
    );
    tipoVariacionRepository.getById.mockResolvedValue({ id_tipo_variacion: 3 } as never);
    componenteRepository.getById.mockResolvedValue({
      id_componente: 5,
      id_tipo_variacion: 3,
    } as never);
    elementoRepository.replaceAsignaciones.mockResolvedValue([
      { id_elemento_componente_variacion: 1, id_elemento: 1 },
    ] as never);
    const service = new ReplaceElementoComponenteAsignacionesService(
      elementoRepository,
      tipoVariacionRepository,
      componenteRepository,
      logger
    );

    const result = await service.execute(1, {
      asignaciones: [
        {
          id_tipo_variacion: 3,
          id_componente: 5,
          metadata: { selector: ".hero-title" },
        },
      ],
    });

    expect(elementoRepository.replaceAsignaciones).toHaveBeenCalled();
    expect(result).toHaveLength(1);
  });

  it("should upsert individual asignacion after validating required metadata", async () => {
    const elementoRepository = buildElementoRepository();
    const tipoVariacionRepository = buildTipoVariacionRepository();
    const componenteRepository = buildComponenteRepository();
    const logger = buildLogger();
    elementoRepository.getById.mockResolvedValue(
      buildElementoComponente({ contrato_minimo: { required: ["selector"] } }) as never
    );
    tipoVariacionRepository.getById.mockResolvedValue({ id_tipo_variacion: 3 } as never);
    componenteRepository.getById.mockResolvedValue({
      id_componente: 5,
      id_tipo_variacion: 3,
    } as never);
    elementoRepository.upsertAsignacion.mockResolvedValue({
      id_elemento_componente_variacion: 1,
      id_elemento: 1,
      id_tipo_variacion: 3,
      id_componente: 5,
      metadata: { selector: ".hero-title" },
    } as never);
    const service = new UpsertElementoComponenteAsignacionService(
      elementoRepository,
      tipoVariacionRepository,
      componenteRepository,
      logger
    );

    const result = await service.execute(1, {
      id_tipo_variacion: 3,
      id_componente: 5,
      metadata: { selector: ".hero-title" },
    });

    expect(elementoRepository.upsertAsignacion).toHaveBeenCalledWith({
      id_elemento_componente_variacion: 0,
      id_elemento: 1,
      id_tipo_variacion: 3,
      id_componente: 5,
      metadata: { selector: ".hero-title" },
    });
    expect(result.id_elemento_componente_variacion).toBe(1);
  });

  it("should reject individual asignacion without metadata", async () => {
    const elementoRepository = buildElementoRepository();
    const tipoVariacionRepository = buildTipoVariacionRepository();
    const componenteRepository = buildComponenteRepository();
    const logger = buildLogger();
    elementoRepository.getById.mockResolvedValue(buildElementoComponente() as never);
    tipoVariacionRepository.getById.mockResolvedValue({ id_tipo_variacion: 3 } as never);
    const service = new UpsertElementoComponenteAsignacionService(
      elementoRepository,
      tipoVariacionRepository,
      componenteRepository,
      logger
    );

    await expect(
      service.execute(1, { id_tipo_variacion: 3 })
    ).rejects.toBeInstanceOf(ValidationError);
  });

  it("should delete individual asignacion", async () => {
    const elementoRepository = buildElementoRepository();
    const logger = buildLogger();
    elementoRepository.getById.mockResolvedValue(buildElementoComponente() as never);
    const service = new DeleteElementoComponenteAsignacionService(
      elementoRepository,
      logger
    );

    await service.execute(1, { id_tipo_variacion: 3, id_componente: null });

    expect(elementoRepository.deleteAsignacion).toHaveBeenCalledWith(1, 3, null);
  });

  it("should reject duplicated global asignaciones", async () => {
    const elementoRepository = buildElementoRepository();
    const tipoVariacionRepository = buildTipoVariacionRepository();
    const componenteRepository = buildComponenteRepository();
    const logger = buildLogger();
    elementoRepository.getById.mockResolvedValue(buildElementoComponente() as never);
    tipoVariacionRepository.getById.mockResolvedValue({ id_tipo_variacion: 3 } as never);
    const service = new ReplaceElementoComponenteAsignacionesService(
      elementoRepository,
      tipoVariacionRepository,
      componenteRepository,
      logger
    );

    await expect(
      service.execute(1, {
        asignaciones: [
          { id_tipo_variacion: 3, id_componente: null },
          { id_tipo_variacion: 3, id_componente: null },
        ],
      })
    ).rejects.toBeInstanceOf(ValidationError);
  });
});
