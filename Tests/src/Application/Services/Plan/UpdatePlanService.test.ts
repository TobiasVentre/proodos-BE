import { UpdatePlanService } from "@proodos/application/Services/Plan/UpdatePlanService";
import { UpdatePlanDTO } from "@proodos/application/DTOs/Plan/UpdatePlanDTO";
import { IPlanRepository } from "@proodos/application/Interfaces/IPlanRepository";
import { ILogger } from "@proodos/application/Interfaces/ILogger";
import { Plan } from "@proodos/domain/Entities/Plan";

describe("UpdatePlanService", () => {
  it("should map the DTO, log the action, and update the plan", async () => {
    // Arrange
    const dto: UpdatePlanDTO = {
      id_plan: 12,
      nombre: "Plan Pro",
      capacidad: 50,
      capacidad_anterior: 40,
      precio_full_price: 500,
      precio_oferta: 450,
      aumento: 10,
      precio_sin_iva: 420,
    };

    const mappedPlan: Plan = {
      id_plan: 12,
      nombre: "Plan Pro",
      capacidad: 50,
      capacidad_anterior: 40,
      precio_full_price: 500,
      precio_oferta: 450,
      aumento: 10,
      precio_sin_iva: 420,
    };

    const planRepository: jest.Mocked<IPlanRepository> = {
      create: jest.fn(),
      update: jest.fn().mockResolvedValue(mappedPlan),
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

    const service = new UpdatePlanService(planRepository, logger);

    // Act
    const result = await service.execute(dto);

    // Assert
    expect(logger.info).toHaveBeenCalledWith("[Service] UpdatePlanService.execute()");
    expect(planRepository.update).toHaveBeenCalledWith(mappedPlan);
    expect(result).toBe(mappedPlan);
  });
});
