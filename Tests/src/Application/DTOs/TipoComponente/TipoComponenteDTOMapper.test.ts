import {
  mapCreateTipoComponenteDTOToEntity,
  mapUpdateTipoComponenteDTOToEntity,
} from "@proodos/application/DTOs/TipoComponente/TipoComponenteDTOMapper";
import { ICreateTipoComponenteDTO } from "@proodos/application/DTOs/TipoComponente/ICreateTipoComponenteDTO";
import { IUpdateTipoComponenteDTO } from "@proodos/application/DTOs/TipoComponente/IUpdateTipoComponenteDTO";

describe("TipoComponenteDTOMapper", () => {
  it("should map ICreateTipoComponenteDTO to entity with id_tipo_componente set to 0", () => {
    // Arrange
    const dto: ICreateTipoComponenteDTO = {
      nombre: "Banner",
      estado: "ACTIVO",
    };

    // Act
    const entity = mapCreateTipoComponenteDTOToEntity(dto);

    // Assert
    expect(entity).toEqual({
      id_tipo_componente: 0,
      nombre: "Banner",
      estado: "ACTIVO",
    });
  });

  it("should map IUpdateTipoComponenteDTO keeping id_tipo_componente", () => {
    // Arrange
    const dto: IUpdateTipoComponenteDTO = {
      id_tipo_componente: 2,
      nombre: "Hero",
      estado: "INACTIVO",
    };

    // Act
    const entity = mapUpdateTipoComponenteDTOToEntity(dto);

    // Assert
    expect(entity).toEqual({
      id_tipo_componente: 2,
      nombre: "Hero",
      estado: "INACTIVO",
    });
  });
});
