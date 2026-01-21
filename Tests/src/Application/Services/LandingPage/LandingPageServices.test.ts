import { CreateLandingPageCommandHandler } from "@proodos/application/Services/LandingPage/CreateLandingPageCommandHandler";
import { CreateLandingPageService } from "@proodos/application/Services/LandingPage/CreateLandingPageService";
import { DeleteLandingPageCommandHandler } from "@proodos/application/Services/LandingPage/DeleteLandingPageCommandHandler";
import { DeleteLandingPageService } from "@proodos/application/Services/LandingPage/DeleteLandingPageService";
import { GetAllLandingPagesQueryHandler } from "@proodos/application/Services/LandingPage/GetAllLandingPagesQueryHandler";
import { GetAllLandingPagesService } from "@proodos/application/Services/LandingPage/GetAllLandingPagesService";
import { GetLandingPageByIdQueryHandler } from "@proodos/application/Services/LandingPage/GetLandingPageByIdQueryHandler";
import { GetLandingPageByIdService } from "@proodos/application/Services/LandingPage/GetLandingPageByIdService";
import { PatchLandingPageService } from "@proodos/application/Services/LandingPage/PatchLandingPageService";
import { UpdateLandingPageCommandHandler } from "@proodos/application/Services/LandingPage/UpdateLandingPageCommandHandler";
import { UpdateLandingPageService } from "@proodos/application/Services/LandingPage/UpdateLandingPageService";
import { NotFoundError } from "@proodos/application/Errors/NotFoundError";
import { ValidationError } from "@proodos/application/Errors/ValidationError";
import { ILandingPageRepository } from "@proodos/application/Interfaces/ILandingPageRepository";
import { ILogger } from "@proodos/application/Interfaces/ILogger";
import { CreateLandingPageCommand } from "@proodos/application/DTOs/LandingPage/CreateLandingPageCommand";
import { CreateLandingPageDTO } from "@proodos/application/DTOs/LandingPage/CreateLandingPageDTO";
import { DeleteLandingPageCommand } from "@proodos/application/DTOs/LandingPage/DeleteLandingPageCommand";
import { GetAllLandingPagesQuery } from "@proodos/application/DTOs/LandingPage/GetAllLandingPagesQuery";
import { GetLandingPageByIdQuery } from "@proodos/application/DTOs/LandingPage/GetLandingPageByIdQuery";
import { PatchLandingPageDTO } from "@proodos/application/DTOs/LandingPage/PatchLandingPageDTO";
import { UpdateLandingPageCommand } from "@proodos/application/DTOs/LandingPage/UpdateLandingPageCommand";

const buildLandingPageRepository = (): jest.Mocked<ILandingPageRepository> => ({
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  getById: jest.fn(),
  getAll: jest.fn(),
});

const buildLogger = (): jest.Mocked<ILogger> => ({
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
  debug: jest.fn(),
});

describe("LandingPage services", () => {
  it("should create landing page service", async () => {
    // Arrange
    const landingPageRepository = buildLandingPageRepository();
    const logger = buildLogger();
    const dto: CreateLandingPageDTO = {
      URL: "https://example.com",
      estado: "ACTIVO",
      segmento: "retail",
    };
    landingPageRepository.create.mockResolvedValue({ id_landing: 1, ...dto } as never);
    const service = new CreateLandingPageService(landingPageRepository, logger);

    // Act
    const result = await service.execute(dto);

    // Assert
    expect(logger.info).toHaveBeenCalledWith(
      "[Service] CreateLandingPageService.execute()"
    );
    expect(landingPageRepository.create).toHaveBeenCalled();
    expect(result.id_landing).toBe(1);
  });

  it("should create landing page using command handler", async () => {
    // Arrange
    const landingPageRepository = buildLandingPageRepository();
    const command: CreateLandingPageCommand = {
      URL: "https://example.com",
      estado: "ACTIVO",
      segmento: "retail",
    };
    landingPageRepository.create.mockResolvedValue({ id_landing: 2 } as never);
    const service = new CreateLandingPageCommandHandler(landingPageRepository);

    // Act
    const result = await service.execute(command);

    // Assert
    expect(landingPageRepository.create).toHaveBeenCalled();
    expect(result.id_landing).toBe(2);
  });

  it("should update landing page using command handler", async () => {
    // Arrange
    const landingPageRepository = buildLandingPageRepository();
    const command: UpdateLandingPageCommand = {
      id_landing: 3,
      URL: "https://example.com",
      estado: "ACTIVO",
      segmento: "retail",
    };
    landingPageRepository.update.mockResolvedValue({ id_landing: 3 } as never);
    const service = new UpdateLandingPageCommandHandler(landingPageRepository);

    // Act
    const result = await service.execute(command);

    // Assert
    expect(landingPageRepository.update).toHaveBeenCalled();
    expect(result.id_landing).toBe(3);
  });

  it("should update landing page via service", async () => {
    // Arrange
    const landingPageRepository = buildLandingPageRepository();
    const command: UpdateLandingPageCommand = {
      id_landing: 4,
      URL: "https://example.com",
      estado: "ACTIVO",
      segmento: "retail",
    };
    landingPageRepository.update.mockResolvedValue({ id_landing: 4 } as never);
    const service = new UpdateLandingPageService(landingPageRepository);

    // Act
    const result = await service.execute(command);

    // Assert
    expect(landingPageRepository.update).toHaveBeenCalled();
    expect(result.id_landing).toBe(4);
  });

  it("should patch landing page", async () => {
    // Arrange
    const landingPageRepository = buildLandingPageRepository();
    landingPageRepository.getById.mockResolvedValue({
      id_landing: 5,
      URL: "https://old.com",
      estado: "ACTIVO",
      segmento: "retail",
    } as never);
    landingPageRepository.update.mockResolvedValue({
      id_landing: 5,
      URL: "https://new.com",
      estado: "ACTIVO",
      segmento: "retail",
    } as never);
    const dto: PatchLandingPageDTO = { URL: "https://new.com" };
    const service = new PatchLandingPageService(landingPageRepository);

    // Act
    const result = await service.execute(5, dto);

    // Assert
    expect(landingPageRepository.update).toHaveBeenCalled();
    expect(result.URL).toBe("https://new.com");
  });

  it("should throw NotFoundError when patching missing landing", async () => {
    // Arrange
    const landingPageRepository = buildLandingPageRepository();
    landingPageRepository.getById.mockResolvedValue(null);
    const service = new PatchLandingPageService(landingPageRepository);

    // Act
    const action = () => service.execute(9, { URL: "https://new.com" });

    // Assert
    await expect(action()).rejects.toBeInstanceOf(NotFoundError);
  });

  it("should throw ValidationError when patching with empty payload", async () => {
    // Arrange
    const landingPageRepository = buildLandingPageRepository();
    landingPageRepository.getById.mockResolvedValue({
      id_landing: 6,
      URL: "https://old.com",
      estado: "ACTIVO",
      segmento: "retail",
    } as never);
    const service = new PatchLandingPageService(landingPageRepository);

    // Act
    const action = () => service.execute(6, {});

    // Assert
    await expect(action()).rejects.toBeInstanceOf(ValidationError);
  });

  it("should delete landing page", async () => {
    // Arrange
    const landingPageRepository = buildLandingPageRepository();
    const service = new DeleteLandingPageService(landingPageRepository);

    // Act
    await service.execute(10);

    // Assert
    expect(landingPageRepository.delete).toHaveBeenCalledWith(10);
  });

  it("should delete landing page via command handler", async () => {
    // Arrange
    const landingPageRepository = buildLandingPageRepository();
    const service = new DeleteLandingPageCommandHandler(landingPageRepository);
    const command: DeleteLandingPageCommand = { id_landing: 11 };

    // Act
    await service.execute(command);

    // Assert
    expect(landingPageRepository.delete).toHaveBeenCalledWith(11);
  });

  it("should get landing pages list", async () => {
    // Arrange
    const landingPageRepository = buildLandingPageRepository();
    const logger = buildLogger();
    landingPageRepository.getAll.mockResolvedValue([{ id_landing: 1 }] as never);
    const service = new GetAllLandingPagesService(landingPageRepository, logger);

    // Act
    const result = await service.execute();

    // Assert
    expect(result).toHaveLength(1);
  });

  it("should get landing pages list via query handler", async () => {
    // Arrange
    const landingPageRepository = buildLandingPageRepository();
    landingPageRepository.getAll.mockResolvedValue([{ id_landing: 1 }] as never);
    const service = new GetAllLandingPagesQueryHandler(landingPageRepository);
    const query: GetAllLandingPagesQuery = {};

    // Act
    const result = await service.execute(query);

    // Assert
    expect(result).toHaveLength(1);
  });

  it("should get landing page by id", async () => {
    // Arrange
    const landingPageRepository = buildLandingPageRepository();
    const logger = buildLogger();
    landingPageRepository.getById.mockResolvedValue({ id_landing: 1 } as never);
    const service = new GetLandingPageByIdService(landingPageRepository, logger);

    // Act
    const result = await service.execute(1);

    // Assert
    expect(result?.id_landing).toBe(1);
  });

  it("should get landing page by id via query handler", async () => {
    // Arrange
    const landingPageRepository = buildLandingPageRepository();
    landingPageRepository.getById.mockResolvedValue({ id_landing: 1 } as never);
    const service = new GetLandingPageByIdQueryHandler(landingPageRepository);
    const query: GetLandingPageByIdQuery = { id_landing: 1 };

    // Act
    const result = await service.execute(query);

    // Assert
    expect(result?.id_landing).toBe(1);
  });
});
