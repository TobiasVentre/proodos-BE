import {
  mapCreateTipoElementoDTOToEntity,
  mapUpdateTipoElementoDTOToEntity,
} from "@proodos/application/DTOs/TipoElemento/TipoElementoDTOMapper";
import { CreateTipoElementoDTO } from "@proodos/application/DTOs/TipoElemento/CreateTipoElementoDTO";
import { UpdateTipoElementoDTO } from "@proodos/application/DTOs/TipoElemento/UpdateTipoElementoDTO";

describe("TipoElementoDTOMapper", () => {
  it("should map CreateTipoElementoDTO to entity with id_tipo_elemento set to 0", () => {
    // Arrange
    const dto: CreateTipoElementoDTO = { nombre: "Header" };

    // Act
    const entity = mapCreateTipoElementoDTOToEntity(dto);

    // Assert
    expect(entity).toEqual({
      id_tipo_elemento: 0,
      nombre: "Header",
    });
  });

  it("should map UpdateTipoElementoDTO keeping id_tipo_elemento", () => {
    // Arrange
    const dto: UpdateTipoElementoDTO = { id_tipo_elemento: 4, nombre: "Footer" };

    // Act
    const entity = mapUpdateTipoElementoDTOToEntity(dto);

    // Assert
    expect(entity).toEqual({
      id_tipo_elemento: 4,
      nombre: "Footer",
    });
  });
});
