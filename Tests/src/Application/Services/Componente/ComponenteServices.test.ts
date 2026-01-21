import { AssignComponenteHijoService } from "@proodos/application/Services/Componente/AssignComponenteHijoService";
import { CreateComponenteService } from "@proodos/application/Services/Componente/CreateComponenteService";
import { DeleteComponenteService } from "@proodos/application/Services/Componente/DeleteComponenteService";
import { GetAllComponentesService } from "@proodos/application/Services/Componente/GetAllComponentesService";
import { GetComponenteByIdService } from "@proodos/application/Services/Componente/GetComponenteByIdService";
import { GetComponenteTreeService } from "@proodos/application/Services/Componente/GetComponenteTreeService";
import { GetComponentesByPlanService } from "@proodos/application/Services/Componente/GetComponentesByPlanService";
import { PatchComponenteService } from "@proodos/application/Services/Componente/PatchComponenteService";
import { SoftDeleteComponenteService } from "@proodos/application/Services/Componente/SoftDeleteComponenteService";
import { UnassignComponenteHijoService } from "@proodos/application/Services/Componente/UnassignComponenteHijoService";
import { UpdateComponenteService } from "@proodos/application/Services/Componente/UpdateComponenteService";
import { ConflictError } from "@proodos/application/Errors/ConflictError";
import { NotFoundError } from "@proodos/application/Errors/NotFoundError";
import { IComponenteCompuestoRepository } from "@proodos/application/Interfaces/IComponenteCompuestoRepository";
import { IComponenteRepository } from "@proodos/application/Interfaces/IComponenteRepository";
import { ILandingComponenteRepository } from "@proodos/application/Interfaces/ILandingComponenteRepository";
import { IPlanRepository } from "@proodos/application/Interfaces/IPlanRepository";
import { ILogger } from "@proodos/application/Interfaces/ILogger";
import { PatchComponenteDTO } from "@proodos/application/DTOs/Componente/PatchComponenteDTO";
import { UpdateComponenteDTO } from "@proodos/application/DTOs/Componente/UpdateComponenteDTO";
import { CreateComponenteDTO } from "@proodos/application/DTOs/Componente/CreateComponenteDTO";

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

const buildPlanRepository = (): jest.Mocked<IPlanRepository> => ({
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

const buildComponente = (
  overrides: Partial<{
    id_componente: number;
    id_tipo_componente: number;
    id_plan: number;
    id_tipo_variacion: number;
    nombre: string;
    fecha_creacion: Date;
    estado: string;
    fecha_baja?: Date | null;
  }> = {}
) => ({
  id_componente: 1,
  id_tipo_componente: 10,
  id_plan: 1,
  id_tipo_variacion: 2,
  nombre: "Hero",
  fecha_creacion: new Date("2024-01-01T00:00:00.000Z"),
  estado: "ACTIVO",
  ...overrides,
});

describe("Componente services", () => {
  it("should create componente after ensuring plan exists", async () => {
    // Arrange
    const componenteRepository = buildComponenteRepository();
    const planRepository = buildPlanRepository();
    const logger = buildLogger();
    const dto: CreateComponenteDTO = {
      id_tipo_componente: 10,
      id_plan: 1,
      id_tipo_variacion: 2,
      nombre: "Hero",
    };
    const created = buildComponente({ id_componente: 1, ...dto });
    planRepository.exists.mockResolvedValue(true);
    componenteRepository.create.mockResolvedValue(created);

    const service = new CreateComponenteService(
      componenteRepository,
      planRepository,
      logger
    );

    // Act
    const result = await service.execute(dto);

    // Assert
    expect(logger.info).toHaveBeenCalledWith(
      "[Service] CreateComponenteService.execute()"
    );
    expect(planRepository.exists).toHaveBeenCalledWith(dto.id_plan);
    expect(componenteRepository.create).toHaveBeenCalledWith(dto);
    expect(result).toEqual(created);
  });

  it("should update componente", async () => {
    // Arrange
    const componenteRepository = buildComponenteRepository();
    const dto: UpdateComponenteDTO = {
      id_componente: 10,
      id_tipo_componente: 3,
      id_plan: 2,
      id_tipo_variacion: 4,
      nombre: "Banner",
    };
    const updated = buildComponente({ ...dto });
    componenteRepository.update.mockResolvedValue(updated);
    const service = new UpdateComponenteService(componenteRepository);

    // Act
    const result = await service.execute(dto);

    // Assert
    expect(componenteRepository.update).toHaveBeenCalledWith(dto);
    expect(result).toEqual(updated);
  });

  it("should patch componente and validate plan when provided", async () => {
    // Arrange
    const componenteRepository = buildComponenteRepository();
    const planRepository = buildPlanRepository();
    const dto: PatchComponenteDTO = {
      id_plan: 5,
      nombre: "Nuevo",
    };
    const patched = buildComponente({ id_componente: 2, id_plan: 5, nombre: "Nuevo" });
    planRepository.exists.mockResolvedValue(true);
    componenteRepository.patch.mockResolvedValue(patched);
    const service = new PatchComponenteService(
      componenteRepository,
      planRepository
    );

    // Act
    const result = await service.execute(2, dto);

    // Assert
    expect(planRepository.exists).toHaveBeenCalledWith(5);
    expect(componenteRepository.patch).toHaveBeenCalledWith(2, dto);
    expect(result).toEqual(patched);
  });

  it("should patch componente without plan validation when id_plan is undefined", async () => {
    // Arrange
    const componenteRepository = buildComponenteRepository();
    const planRepository = buildPlanRepository();
    const dto: PatchComponenteDTO = { nombre: "Solo nombre" };
    const patched = buildComponente({ id_componente: 3, nombre: "Solo nombre" });
    componenteRepository.patch.mockResolvedValue(patched);
    const service = new PatchComponenteService(
      componenteRepository,
      planRepository
    );

    // Act
    const result = await service.execute(3, dto);

    // Assert
    expect(planRepository.exists).not.toHaveBeenCalled();
    expect(componenteRepository.patch).toHaveBeenCalledWith(3, dto);
    expect(result).toEqual(patched);
  });

  it("should delete componente when not assigned", async () => {
    // Arrange
    const componenteRepository = buildComponenteRepository();
    const landingComponenteRepository: jest.Mocked<ILandingComponenteRepository> = {
      assign: jest.fn(),
      unassign: jest.fn(),
      getByLanding: jest.fn(),
      getByComponente: jest.fn(),
      exists: jest.fn(),
      existsByComponente: jest.fn().mockResolvedValue(false),
    };
    componenteRepository.getById.mockResolvedValue({ id_componente: 2 } as never);
    const service = new DeleteComponenteService(
      componenteRepository,
      landingComponenteRepository
    );

    // Act
    await service.execute(2);

    // Assert
    expect(componenteRepository.delete).toHaveBeenCalledWith(2);
  });

  it("should throw NotFoundError when componente does not exist on delete", async () => {
    // Arrange
    const componenteRepository = buildComponenteRepository();
    const landingComponenteRepository: jest.Mocked<ILandingComponenteRepository> = {
      assign: jest.fn(),
      unassign: jest.fn(),
      getByLanding: jest.fn(),
      getByComponente: jest.fn(),
      exists: jest.fn(),
      existsByComponente: jest.fn(),
    };
    componenteRepository.getById.mockResolvedValue(null);
    const service = new DeleteComponenteService(
      componenteRepository,
      landingComponenteRepository
    );

    // Act
    const action = () => service.execute(10);

    // Assert
    await expect(action()).rejects.toBeInstanceOf(NotFoundError);
  });

  it("should throw ConflictError when componente is assigned", async () => {
    // Arrange
    const componenteRepository = buildComponenteRepository();
    const landingComponenteRepository: jest.Mocked<ILandingComponenteRepository> = {
      assign: jest.fn(),
      unassign: jest.fn(),
      getByLanding: jest.fn(),
      getByComponente: jest.fn(),
      exists: jest.fn(),
      existsByComponente: jest.fn().mockResolvedValue(true),
    };
    componenteRepository.getById.mockResolvedValue({ id_componente: 4 } as never);
    const service = new DeleteComponenteService(
      componenteRepository,
      landingComponenteRepository
    );

    // Act
    const action = () => service.execute(4);

    // Assert
    await expect(action()).rejects.toBeInstanceOf(ConflictError);
  });

  it("should soft delete componente when not assigned", async () => {
    // Arrange
    const componenteRepository = buildComponenteRepository();
    const landingComponenteRepository: jest.Mocked<ILandingComponenteRepository> = {
      assign: jest.fn(),
      unassign: jest.fn(),
      getByLanding: jest.fn(),
      getByComponente: jest.fn(),
      exists: jest.fn(),
      existsByComponente: jest.fn().mockResolvedValue(false),
    };
    componenteRepository.getById.mockResolvedValue({ id_componente: 5 } as never);
    const service = new SoftDeleteComponenteService(
      componenteRepository,
      landingComponenteRepository
    );

    // Act
    await service.execute(5);

    // Assert
    expect(componenteRepository.softDelete).toHaveBeenCalledWith(
      5,
      expect.any(Date),
      "INACTIVO"
    );
  });

  it("should fetch componentes list", async () => {
    // Arrange
    const componenteRepository = buildComponenteRepository();
    const data = [{ id_componente: 1 }];
    componenteRepository.getAll.mockResolvedValue(data as never);
    const service = new GetAllComponentesService(componenteRepository);

    // Act
    const result = await service.execute();

    // Assert
    expect(componenteRepository.getAll).toHaveBeenCalled();
    expect(result).toEqual(data);
  });

  it("should fetch componente by id", async () => {
    // Arrange
    const componenteRepository = buildComponenteRepository();
    const data = { id_componente: 8 };
    componenteRepository.getById.mockResolvedValue(data as never);
    const service = new GetComponenteByIdService(componenteRepository);

    // Act
    const result = await service.execute(8);

    // Assert
    expect(componenteRepository.getById).toHaveBeenCalledWith(8);
    expect(result).toEqual(data);
  });

  it("should fetch componentes by plan", async () => {
    // Arrange
    const componenteRepository = buildComponenteRepository();
    const data = [{ id_componente: 9 }];
    componenteRepository.getByPlan.mockResolvedValue(data as never);
    const service = new GetComponentesByPlanService(componenteRepository);

    // Act
    const result = await service.execute(2);

    // Assert
    expect(componenteRepository.getByPlan).toHaveBeenCalledWith(2);
    expect(result).toEqual(data);
  });

  it("should assign componente hijo when both exist", async () => {
    // Arrange
    const componenteRepository = buildComponenteRepository();
    const compuestoRepository: jest.Mocked<IComponenteCompuestoRepository> = {
      assign: jest.fn().mockResolvedValue({ created: true }),
      unassign: jest.fn(),
      getAll: jest.fn(),
    };
    componenteRepository.getById
      .mockResolvedValueOnce({ id_componente: 1 } as never)
      .mockResolvedValueOnce({ id_componente: 2 } as never);
    const service = new AssignComponenteHijoService(
      componenteRepository,
      compuestoRepository
    );

    // Act
    const result = await service.execute(1, 2);

    // Assert
    expect(compuestoRepository.assign).toHaveBeenCalledWith(1, 2);
    expect(result).toEqual({ created: true });
  });

  it("should unassign componente hijo", async () => {
    // Arrange
    const compuestoRepository: jest.Mocked<IComponenteCompuestoRepository> = {
      assign: jest.fn(),
      unassign: jest.fn().mockResolvedValue(undefined),
      getAll: jest.fn(),
    };
    const service = new UnassignComponenteHijoService(compuestoRepository);

    // Act
    await service.execute(1, 3);

    // Assert
    expect(compuestoRepository.unassign).toHaveBeenCalledWith(1, 3);
  });

  it("should throw NotFoundError when root componente does not exist", async () => {
    // Arrange
    const componenteRepository = buildComponenteRepository();
    const compuestoRepository: jest.Mocked<IComponenteCompuestoRepository> = {
      assign: jest.fn(),
      unassign: jest.fn(),
      getAll: jest.fn(),
    };
    componenteRepository.getById.mockResolvedValue(null);
    const service = new GetComponenteTreeService(
      componenteRepository,
      compuestoRepository
    );

    // Act
    const action = () => service.execute(99);

    // Assert
    await expect(action()).rejects.toBeInstanceOf(NotFoundError);
  });

  it("should build componente tree", async () => {
    // Arrange
    const componenteRepository = buildComponenteRepository();
    const compuestoRepository: jest.Mocked<IComponenteCompuestoRepository> = {
      assign: jest.fn(),
      unassign: jest.fn(),
      getAll: jest.fn(),
    };
    componenteRepository.getById.mockResolvedValue({
      id_componente: 1,
      nombre: "Root",
    } as never);
    componenteRepository.getAll.mockResolvedValue([
      { id_componente: 1, nombre: "Root" },
      { id_componente: 2, nombre: "Child" },
    ] as never);
    compuestoRepository.getAll.mockResolvedValue([
      { id_padre: 1, id_hijo: 2 },
    ] as never);
    const service = new GetComponenteTreeService(
      componenteRepository,
      compuestoRepository
    );

    // Act
    const result = await service.execute(1);

    // Assert
    expect(result.hijos).toHaveLength(1);
    expect(result.hijos[0]).toMatchObject({ id_componente: 2, nombre: "Child" });
  });
});
