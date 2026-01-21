import { PatchPlanService } from "@proodos/application/Services/Plan/PatchPlanService";
import { PatchPlanDTO } from "@proodos/application/DTOs/Plan/PatchPlanDTO";
import { IPlanRepository } from "@proodos/application/Interfaces/IPlanRepository";
import { ILogger } from "@proodos/application/Interfaces/ILogger";
import { Plan } from "@proodos/domain/Entities/Plan";

describe("PatchPlanService", () => {
  it("should log the action and patch the plan", async () => {
    // Arrange
    const dto: PatchPlanDTO = {
      nombre: "Plan Ajustado",
      precio_oferta: 75,
    };

    const patchedPlan: Plan = {
      id_plan: 7,
      nombre: "Plan Ajustado",
      capacidad: 12,
      capacidad_anterior: 10,
      precio_full_price: 90,
      precio_oferta: 75,
      aumento: 5,
      precio_sin_iva: 80,
    };

    const planRepository: jest.Mocked<IPlanRepository> = {
      create: jest.fn(),
      update: jest.fn(),
      patch: jest.fn().mockResolvedValue(patchedPlan),
      getById: jest.fn(),
      getAll: jest.fn(),
      exists: jest.fn(),
    };

    const logger: jest.Mocked<ILogger> = {
      info: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
      debug: jest.fn(),
    };

    const service = new PatchPlanService(planRepository, logger);

    // Act
    const result = await service.execute(7, dto);

    // Assert
    expect(logger.info).toHaveBeenCalledWith("[Service] PatchPlanService.execute()", { id_plan: 7 });
    expect(planRepository.patch).toHaveBeenCalledWith(7, dto);
    expect(result).toBe(patchedPlan);
  });
});
