import {
  mapCreateComponenteDTOToEntity,
  mapUpdateComponenteDTOToEntity,
} from "@proodos/application/DTOs/Componente/ComponenteDTOMapper";
import { ValidationError } from "@proodos/application/Errors/ValidationError";
import { ICreateComponenteDTO } from "@proodos/application/DTOs/Componente/ICreateComponenteDTO";
import { IUpdateComponenteDTO } from "@proodos/application/DTOs/Componente/IUpdateComponenteDTO";

describe("ComponenteDTOMapper", () => {
  it("should map create DTO to entity", () => {
    const dto: ICreateComponenteDTO = {
      id_tipo_componente: 10,
      id_plan: 1,
      id_tipo_variacion: 2,
      nombre: " Hero ",
    };

    const entity = mapCreateComponenteDTOToEntity(dto);

    expect(entity).toEqual({
      id_componente: 0,
      id_tipo_componente: 10,
      id_plan: 1,
      id_tipo_variacion: 2,
      nombre: "Hero",
      fecha_creacion: new Date(0),
      estado: "ACTIVO",
      fecha_baja: null,
    });
  });

  it("should map update DTO to entity", () => {
    const dto: IUpdateComponenteDTO = {
      id_componente: 5,
      id_tipo_componente: 10,
      id_plan: 1,
      id_tipo_variacion: 2,
      nombre: " Banner ",
    };

    const entity = mapUpdateComponenteDTOToEntity(dto);

    expect(entity).toEqual({
      id_componente: 5,
      id_tipo_componente: 10,
      id_plan: 1,
      id_tipo_variacion: 2,
      nombre: "Banner",
      fecha_creacion: new Date(0),
      estado: "ACTIVO",
      fecha_baja: null,
    });
  });

  it("should throw ValidationError when DTO is invalid", () => {
    const dto: ICreateComponenteDTO = {
      id_tipo_componente: 0,
      id_plan: -1,
      id_tipo_variacion: 2,
      nombre: "   ",
    };

    const action = () => mapCreateComponenteDTOToEntity(dto);

    expect(action).toThrow(ValidationError);
  });
});
