import { GetAllPlansService } from "@proodos/application/Services/Plan/GetAllPlansService";
import { IPlanRepository } from "@proodos/application/Interfaces/IPlanRepository";
import { ILogger } from "@proodos/application/Interfaces/ILogger";
import { Plan } from "@proodos/domain/Entities/Plan";

describe("GetAllPlansService", () => {
  it("should log the action and return all plans", async () => {
    // Arrange
    const plans: Plan[] = [
      {
        id_plan: 1,
        nombre: "Plan Basic",
        capacidad: 5,
        capacidad_anterior: 3,
        precio_full_price: 50,
        precio_oferta: 45,
        aumento: 5,
        precio_sin_iva: 40,
      },
      {
        id_plan: 2,
        nombre: "Plan Plus",
        capacidad: 15,
        capacidad_anterior: 10,
        precio_full_price: 150,
        precio_oferta: 120,
        aumento: 25,
        precio_sin_iva: 130,
      },
    ];

    const planRepository: jest.Mocked<IPlanRepository> = {
      create: jest.fn(),
      update: jest.fn(),
      patch: jest.fn(),
      getById: jest.fn(),
      getAll: jest.fn().mockResolvedValue(plans),
      exists: jest.fn(),
    };

    const logger: jest.Mocked<ILogger> = {
      info: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
      debug: jest.fn(),
    };

    const service = new GetAllPlansService(planRepository, logger);

    // Act
    const result = await service.execute();

    // Assert
    expect(logger.info).toHaveBeenCalledWith("[Service] GetAllPlansService.execute()");
    expect(planRepository.getAll).toHaveBeenCalledTimes(1);
    expect(result).toEqual(plans);
  });
});
