import {
  mapCreateTipoComponenteDTOToEntity,
  mapUpdateTipoComponenteDTOToEntity,
} from "@proodos/application/DTOs/TipoComponente/TipoComponenteDTOMapper";
import { CreateTipoComponenteDTO } from "@proodos/application/DTOs/TipoComponente/CreateTipoComponenteDTO";
import { UpdateTipoComponenteDTO } from "@proodos/application/DTOs/TipoComponente/UpdateTipoComponenteDTO";

describe("TipoComponenteDTOMapper", () => {
  it("should map CreateTipoComponenteDTO to entity with id_tipo_componente set to 0", () => {
    // Arrange
    const dto: CreateTipoComponenteDTO = {
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

  it("should map UpdateTipoComponenteDTO keeping id_tipo_componente", () => {
    // Arrange
    const dto: UpdateTipoComponenteDTO = {
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
