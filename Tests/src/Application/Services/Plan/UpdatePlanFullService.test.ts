import { IUpdatePlanFullDTO } from "@proodos/application/DTOs/Plan/IUpdatePlanFullDTO";
import { mapUpdatePlanFullDTOToEntity } from "@proodos/application/DTOs/Plan/PlanDTOMapper";
import { ILogger } from "@proodos/application/Interfaces/ILogger";
import { IPlanRepository } from "@proodos/application/Interfaces/IPlanRepository";
import { UpdatePlanFullService } from "@proodos/application/Services/Plan/UpdatePlanFullService";
import { Plan } from "@proodos/domain/Entities/Plan";

describe("UpdatePlanFullService", () => {
  it("should map the DTO, log the action, and update the full plan", async () => {
    // Arrange
    const dto: IUpdatePlanFullDTO = {
      id_plan: 22,
      nombre: "Plan Full",
      precio_full_price: 2300,
      promo_activa: true,
    };

    const mappedPlan: Plan = mapUpdatePlanFullDTOToEntity(dto);

    const planRepository: jest.Mocked<IPlanRepository> = {
      create: jest.fn(),
      update: jest.fn(),
      updateFull: jest.fn().mockResolvedValue(mappedPlan),
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

    const service = new UpdatePlanFullService(planRepository, logger);

    // Act
    const result = await service.execute(dto);

    // Assert
    expect(logger.info).toHaveBeenCalledWith("[Service] UpdatePlanFullService.execute()");
    expect(planRepository.updateFull).toHaveBeenCalledWith(mappedPlan);
    expect(result).toBe(mappedPlan);
  });
});
