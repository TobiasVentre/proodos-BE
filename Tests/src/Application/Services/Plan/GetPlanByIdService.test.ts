import { GetPlanByIdService } from "@proodos/application/Services/Plan/GetPlanByIdService";
import { IPlanRepository } from "@proodos/application/Interfaces/IPlanRepository";
import { ILogger } from "@proodos/application/Interfaces/ILogger";
import { Plan } from "@proodos/domain/Entities/Plan";

describe("GetPlanByIdService", () => {
  it("should log the action and return the plan", async () => {
    // Arrange
    const plan: Plan = {
      id_plan: 3,
      nombre: "Plan Growth",
      capacidad: 30,
      capacidad_anterior: 25,
      precio_full_price: 300,
      precio_oferta: 270,
      aumento: 12,
      precio_sin_iva: 250,
    };

    const planRepository: jest.Mocked<IPlanRepository> = {
      create: jest.fn(),
      update: jest.fn(),
      patch: jest.fn(),
      getById: jest.fn().mockResolvedValue(plan),
      getAll: jest.fn(),
      exists: jest.fn(),
    };

    const logger: jest.Mocked<ILogger> = {
      info: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
      debug: jest.fn(),
    };

    const service = new GetPlanByIdService(planRepository, logger);

    // Act
    const result = await service.execute(3);

    // Assert
    expect(logger.info).toHaveBeenCalledWith("[Service] GetPlanByIdService.execute()");
    expect(planRepository.getById).toHaveBeenCalledWith(3);
    expect(result).toBe(plan);
  });
});
