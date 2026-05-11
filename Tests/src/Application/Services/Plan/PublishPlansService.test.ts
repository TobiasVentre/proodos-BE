import { ILogger } from "@proodos/application/Interfaces/ILogger";
import { IPlansDataOutputWriter } from "@proodos/application/Interfaces/IPlansDataOutputWriter";
import { IPlansPublicationClient } from "@proodos/application/Interfaces/IPlansPublicationClient";
import {
  IGetPlansDataUseCase,
  IPatchPlanFullUseCase,
} from "@proodos/application/Ports/IPlanUseCases";
import { PublishPlansService } from "@proodos/application/Services/Plan/PublishPlansService";
import { ExternalServiceError } from "@proodos/application/Errors/ExternalServiceError";

describe("PublishPlansService", () => {
  const buildLogger = (): jest.Mocked<ILogger> => ({
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
    debug: jest.fn(),
  });

  it("should persist changes, export file and publish to all destinations", async () => {
    const patchPlanFullService: jest.Mocked<IPatchPlanFullUseCase> = {
      execute: jest.fn().mockResolvedValue({} as never),
    };
    const getPlansDataService: jest.Mocked<IGetPlansDataUseCase> = {
      execute: jest.fn().mockResolvedValue({}),
    };
    const plansDataOutputWriter: jest.Mocked<IPlansDataOutputWriter> = {
      writePlansDataJson: jest.fn(),
      getPlansDataFilePath: jest
        .fn()
        .mockReturnValue("/home/acc_avatar/Proodos/proodos-BE/plans-export-output/plans-data.json"),
    };
    const plansPublicationClient: jest.Mocked<IPlansPublicationClient> = {
      publish: jest.fn().mockResolvedValue({ status: 200, payload: { ok: true } }),
    };

    const service = new PublishPlansService(
      patchPlanFullService,
      getPlansDataService,
      plansDataOutputWriter,
      plansPublicationClient,
      buildLogger()
    );

    const result = await service.execute([
      {
        id_plan: 1,
        precio_oferta: 1000,
      },
      {
        id_plan: 2,
        precio_full_price: 2000,
      },
    ]);

    expect(patchPlanFullService.execute).toHaveBeenCalledTimes(2);
    expect(getPlansDataService.execute).toHaveBeenCalledTimes(1);
    expect(plansPublicationClient.publish).toHaveBeenCalledTimes(6);
    expect(result.savedPlans).toBe(2);
    expect(result.exportedFilePath).toContain("plans-data.json");
    expect(result.publicationResults).toHaveLength(6);
    expect(result.publicationResults.every((entry) => entry.success)).toBe(true);
  });

  it("should throw when at least one publication fails", async () => {
    const patchPlanFullService: jest.Mocked<IPatchPlanFullUseCase> = {
      execute: jest.fn().mockResolvedValue({} as never),
    };
    const getPlansDataService: jest.Mocked<IGetPlansDataUseCase> = {
      execute: jest.fn().mockResolvedValue({}),
    };
    const plansDataOutputWriter: jest.Mocked<IPlansDataOutputWriter> = {
      writePlansDataJson: jest.fn(),
      getPlansDataFilePath: jest.fn().mockReturnValue("/tmp/plans-data.json"),
    };
    const plansPublicationClient: jest.Mocked<IPlansPublicationClient> = {
      publish: jest
        .fn()
        .mockResolvedValueOnce({ status: 200, payload: { ok: true } })
        .mockRejectedValueOnce(new Error("secondary unavailable"))
        .mockResolvedValue({ status: 200, payload: { ok: true } }),
    };

    const service = new PublishPlansService(
      patchPlanFullService,
      getPlansDataService,
      plansDataOutputWriter,
      plansPublicationClient,
      buildLogger()
    );

    await expect(
      service.execute([
        {
          id_plan: 3,
          precio_no_cliente: 3000,
        },
      ])
    ).rejects.toBeInstanceOf(ExternalServiceError);
  });
});
