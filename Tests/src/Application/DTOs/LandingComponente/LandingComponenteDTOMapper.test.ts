import {
  buildAssignLandingComponenteResult,
  mapLandingComponenteDTOToEntity,
} from "@proodos/application/DTOs/LandingComponente/LandingComponenteDTOMapper";
import { ValidationError } from "@proodos/application/Errors/ValidationError";
import { ILandingComponenteDTO } from "@proodos/application/DTOs/LandingComponente/ILandingComponenteDTO";

describe("LandingComponenteDTOMapper", () => {
  it("should map LandingComponenteDTO to entity", () => {
    const dto: ILandingComponenteDTO = {
      id_landing: 1,
      id_componente: 2,
    };

    const entity = mapLandingComponenteDTOToEntity(dto);

    expect(entity).toEqual({
      id_landing: 1,
      id_componente: 2,
    });
  });

  it("should throw ValidationError when dto ids are invalid", () => {
    const dto: ILandingComponenteDTO = {
      id_landing: 0,
      id_componente: -1,
    };

    const action = () => mapLandingComponenteDTOToEntity(dto);

    expect(action).toThrow(ValidationError);
  });

  it("should build assignment result", () => {
    const result = buildAssignLandingComponenteResult(
      { id_landing: 3, id_componente: 4 },
      true
    );

    expect(result).toEqual({
      data: { id_landing: 3, id_componente: 4 },
      existed: true,
    });
  });
});
