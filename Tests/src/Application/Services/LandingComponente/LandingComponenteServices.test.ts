import { AssignLandingComponenteService } from "@proodos/application/Services/LandingComponente/AssignLandingComponenteService";
import { AssignLandingComponenteService as AssignComponenteToLandingService } from "@proodos/application/Services/LandingComponente/AssignComponenteToLandingService";
import { ExistsLandingComponenteService } from "@proodos/application/Services/LandingComponente/ExistsLandingComponenteService";
import { GetLandingComponentesService } from "@proodos/application/Services/LandingComponente/GetLandingComponentesService";
import { GetLandingsByComponenteService } from "@proodos/application/Services/LandingComponente/GetLandingsByComponenteService";
import { UnassignComponenteFromLandingService } from "@proodos/application/Services/LandingComponente/UnassignComponenteFromLandingService";
import { NotFoundError } from "@proodos/application/Errors/NotFoundError";
import { IComponenteRepository } from "@proodos/application/Interfaces/IComponenteRepository";
import { ILandingComponenteRepository } from "@proodos/application/Interfaces/ILandingComponenteRepository";
import { ILandingPageRepository } from "@proodos/application/Interfaces/ILandingPageRepository";
import { ILogger } from "@proodos/application/Interfaces/ILogger";

const buildLandingPageRepository = (): jest.Mocked<ILandingPageRepository> => ({
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  getById: jest.fn(),
  getAll: jest.fn(),
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

const buildLandingComponenteRepository = (): jest.Mocked<ILandingComponenteRepository> => ({
  assign: jest.fn(),
  unassign: jest.fn(),
  getByLanding: jest.fn(),
  getByComponente: jest.fn(),
  exists: jest.fn(),
  existsByComponente: jest.fn(),
});

const buildLogger = (): jest.Mocked<ILogger> => ({
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
  debug: jest.fn(),
});

describe("LandingComponente services", () => {
  it("should assign landing componente when not existing", async () => {
    // Arrange
    const landingPageRepository = buildLandingPageRepository();
    const componenteRepository = buildComponenteRepository();
    const landingComponenteRepository = buildLandingComponenteRepository();
    const logger = buildLogger();
    landingPageRepository.getById.mockResolvedValue({ id_landing: 1 } as never);
    componenteRepository.getById.mockResolvedValue({ id_componente: 2 } as never);
    landingComponenteRepository.exists.mockResolvedValue(false);
    landingComponenteRepository.assign.mockResolvedValue({ id_landing: 1, id_componente: 2 } as never);

    const service = new AssignLandingComponenteService(
      landingPageRepository,
      componenteRepository,
      landingComponenteRepository,
      logger
    );

    // Act
    const result = await service.execute(1, 2);

    // Assert
    expect(result.existed).toBe(false);
    expect(result.data).toEqual({ id_landing: 1, id_componente: 2 });
  });

  it("should return existed true when already assigned", async () => {
    // Arrange
    const landingPageRepository = buildLandingPageRepository();
    const componenteRepository = buildComponenteRepository();
    const landingComponenteRepository = buildLandingComponenteRepository();
    const logger = buildLogger();
    landingPageRepository.getById.mockResolvedValue({ id_landing: 1 } as never);
    componenteRepository.getById.mockResolvedValue({ id_componente: 2 } as never);
    landingComponenteRepository.exists.mockResolvedValue(true);

    const service = new AssignLandingComponenteService(
      landingPageRepository,
      componenteRepository,
      landingComponenteRepository,
      logger
    );

    // Act
    const result = await service.execute(1, 2);

    // Assert
    expect(result.existed).toBe(true);
    expect(result.data).toEqual({ id_landing: 1, id_componente: 2 });
  });

  it("should assign componente to landing service variant with created true", async () => {
    // Arrange
    const landingPageRepository = buildLandingPageRepository();
    const componenteRepository = buildComponenteRepository();
    const landingComponenteRepository = buildLandingComponenteRepository();
    const logger = buildLogger();
    landingPageRepository.getById.mockResolvedValue({ id_landing: 5 } as never);
    componenteRepository.getById.mockResolvedValue({ id_componente: 7 } as never);
    landingComponenteRepository.exists.mockResolvedValue(false);
    landingComponenteRepository.assign.mockResolvedValue({ id_landing: 5, id_componente: 7 } as never);

    const service = new AssignComponenteToLandingService(
      landingPageRepository,
      componenteRepository,
      landingComponenteRepository,
      logger
    );

    // Act
    const result = await service.execute(5, 7);

    // Assert
    expect(result.created).toBe(true);
    expect(result.data).toEqual({ id_landing: 5, id_componente: 7 });
  });

  it("should throw NotFoundError when landing does not exist", async () => {
    // Arrange
    const landingPageRepository = buildLandingPageRepository();
    const componenteRepository = buildComponenteRepository();
    const landingComponenteRepository = buildLandingComponenteRepository();
    const logger = buildLogger();
    landingPageRepository.getById.mockResolvedValue(null);

    const service = new AssignLandingComponenteService(
      landingPageRepository,
      componenteRepository,
      landingComponenteRepository,
      logger
    );

    // Act
    const action = () => service.execute(1, 2);

    // Assert
    await expect(action()).rejects.toBeInstanceOf(NotFoundError);
  });

  it("should check existence of landing componente", async () => {
    // Arrange
    const landingComponenteRepository = buildLandingComponenteRepository();
    landingComponenteRepository.exists.mockResolvedValue(true);
    const service = new ExistsLandingComponenteService(landingComponenteRepository);

    // Act
    const result = await service.execute(1, 2);

    // Assert
    expect(result).toBe(true);
    expect(landingComponenteRepository.exists).toHaveBeenCalledWith(1, 2);
  });

  it("should get landing componentes by landing", async () => {
    // Arrange
    const landingComponenteRepository = buildLandingComponenteRepository();
    landingComponenteRepository.getByLanding.mockResolvedValue([
      { id_landing: 1, id_componente: 2 },
    ] as never);
    const service = new GetLandingComponentesService(landingComponenteRepository);

    // Act
    const result = await service.execute(1);

    // Assert
    expect(result).toHaveLength(1);
  });

  it("should get landings by componente", async () => {
    // Arrange
    const landingComponenteRepository = buildLandingComponenteRepository();
    landingComponenteRepository.getByComponente.mockResolvedValue([
      { id_landing: 3, id_componente: 4 },
    ] as never);
    const service = new GetLandingsByComponenteService(landingComponenteRepository);

    // Act
    const result = await service.execute(4);

    // Assert
    expect(result[0].id_componente).toBe(4);
  });

  it("should unassign componente from landing", async () => {
    // Arrange
    const landingComponenteRepository = buildLandingComponenteRepository();
    const service = new UnassignComponenteFromLandingService(landingComponenteRepository);

    // Act
    await service.execute(1, 2);

    // Assert
    expect(landingComponenteRepository.unassign).toHaveBeenCalledWith(1, 2);
  });
});
