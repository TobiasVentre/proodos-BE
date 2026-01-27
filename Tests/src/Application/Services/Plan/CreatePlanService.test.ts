import { CreatePlanService } from "@proodos/application/Services/Plan/CreatePlanService";
import { CreatePlanDTO } from "@proodos/application/DTOs/Plan/CreatePlanDTO";
import { IPlanRepository } from "@proodos/application/Interfaces/IPlanRepository";
import { ILogger } from "@proodos/application/Interfaces/ILogger";
import { Plan } from "@proodos/domain/Entities/Plan";

describe("CreatePlanService", () => {
  it("should map the DTO, log the action, and create the plan", async () => {
    // Arrange
    const dto: CreatePlanDTO = {
      nombre: "Plan Starter",
      capacidad: 10,
      capacidad_anterior: 8,
      precio_full_price: 100,
      precio_oferta: 80,
      aumento: 20,
      precio_sin_iva: 90,
    };

    const mappedPlan: Plan = {
      id_plan: 0,
      nombre: "Plan Starter",
      capacidad: 10,
      capacidad_anterior: 8,
      precio_full_price: 100,
      precio_oferta: 80,
      aumento: 20,
      precio_sin_iva: 90,
    };

    const planRepository: jest.Mocked<IPlanRepository> = {
      create: jest.fn().mockResolvedValue(mappedPlan),
      update: jest.fn(),
      patch: jest.fn(),
      patchFull: jest.fn(),
      getById: jest.fn(),
      getAll: jest.fn(),
      exists: jest.fn(),
      delete: jest.fn(),
    };

    const logger: jest.Mocked<ILogger> = {
      info: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
      debug: jest.fn(),
    };

    const service = new CreatePlanService(planRepository, logger);

    // Act
    const result = await service.execute(dto);

    // Assert
    expect(logger.info).toHaveBeenCalledWith("[Service] CreatePlanService.execute()");
    expect(planRepository.create).toHaveBeenCalledWith(mappedPlan);
    expect(result).toBe(mappedPlan);
  });
});
