import {
  buildAssignComponenteHijoResult,
  mapComponenteHijoDTOToEntity,
} from "@proodos/application/DTOs/Componente/ComponenteHijoDTOMapper";
import { ValidationError } from "@proodos/application/Errors/ValidationError";
import { IComponenteHijoDTO } from "@proodos/application/DTOs/Componente/IComponenteHijoDTO";

describe("ComponenteHijoDTOMapper", () => {
  it("should map componente hijo DTO to entity", () => {
    const dto: IComponenteHijoDTO = {
      id_padre: 1,
      id_hijo: 2,
    };

    const entity = mapComponenteHijoDTOToEntity(dto);

    expect(entity).toEqual({
      id_padre: 1,
      id_hijo: 2,
    });
  });

  it("should throw ValidationError when relation DTO is invalid", () => {
    const dto: IComponenteHijoDTO = {
      id_padre: 0,
      id_hijo: -1,
    };

    const action = () => mapComponenteHijoDTOToEntity(dto);

    expect(action).toThrow(ValidationError);
  });

  it("should build child assignment result", () => {
    const result = buildAssignComponenteHijoResult(
      { id_padre: 3, id_hijo: 4 },
      true
    );

    expect(result).toEqual({
      data: { id_padre: 3, id_hijo: 4 },
      created: true,
    });
  });
});
