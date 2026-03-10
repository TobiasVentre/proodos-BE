import {
  mapCreateLandingPageDTOToEntity,
  mapUpdateLandingPageDTOToEntity,
} from "@proodos/application/DTOs/LandingPage/LandingPageDTOMapper";
import { ValidationError } from "@proodos/application/Errors/ValidationError";
import { ICreateLandingPageDTO } from "@proodos/application/DTOs/LandingPage/ICreateLandingPageDTO";
import { IUpdateLandingPageDTO } from "@proodos/application/DTOs/LandingPage/IUpdateLandingPageDTO";

describe("LandingPageDTOMapper", () => {
  it("should map ICreateLandingPageDTO to entity with trimmed fields", () => {
    const dto: ICreateLandingPageDTO = {
      URL: "  https://example.com  ",
      estado: "  ACTIVO ",
      segmento: "  retail ",
    };

    const entity = mapCreateLandingPageDTOToEntity(dto);

    expect(entity).toMatchObject({
      id_landing: 0,
      URL: "https://example.com",
      estado: "ACTIVO",
      segmento: "retail",
    });
  });

  it("should throw ValidationError for invalid create data", () => {
    const dto: ICreateLandingPageDTO = {
      URL: "",
      estado: " ",
      segmento: "retail",
    };

    const action = () => mapCreateLandingPageDTOToEntity(dto);

    expect(action).toThrow(ValidationError);
  });

  it("should map IUpdateLandingPageDTO to entity with trimmed fields", () => {
    const dto: IUpdateLandingPageDTO = {
      id_landing: 1,
      URL: "  https://example.com  ",
      estado: "  ACTIVO ",
      segmento: "  retail ",
    };

    const entity = mapUpdateLandingPageDTOToEntity(dto);

    expect(entity).toMatchObject({
      id_landing: 1,
      URL: "https://example.com",
      estado: "ACTIVO",
      segmento: "retail",
    });
  });

  it("should throw ValidationError for invalid update data", () => {
    const dto: IUpdateLandingPageDTO = {
      id_landing: 0,
      URL: "",
      estado: " ",
      segmento: "segmento",
    };

    const action = () => mapUpdateLandingPageDTOToEntity(dto);

    expect(action).toThrow(ValidationError);
  });
});
