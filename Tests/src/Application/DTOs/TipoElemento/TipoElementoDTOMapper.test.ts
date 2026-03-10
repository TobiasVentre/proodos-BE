import {
  mapCreateTipoElementoDTOToEntity,
  mapUpdateTipoElementoDTOToEntity,
} from "@proodos/application/DTOs/TipoElemento/TipoElementoDTOMapper";
import { ICreateTipoElementoDTO } from "@proodos/application/DTOs/TipoElemento/ICreateTipoElementoDTO";
import { IUpdateTipoElementoDTO } from "@proodos/application/DTOs/TipoElemento/IUpdateTipoElementoDTO";

describe("TipoElementoDTOMapper", () => {
  it("should map ICreateTipoElementoDTO to entity with id_tipo_elemento set to 0", () => {
    // Arrange
    const dto: ICreateTipoElementoDTO = { nombre: "Header" };

    // Act
    const entity = mapCreateTipoElementoDTOToEntity(dto);

    // Assert
    expect(entity).toEqual({
      id_tipo_elemento: 0,
      nombre: "Header",
    });
  });

  it("should map IUpdateTipoElementoDTO keeping id_tipo_elemento", () => {
    // Arrange
    const dto: IUpdateTipoElementoDTO = { id_tipo_elemento: 4, nombre: "Footer" };

    // Act
    const entity = mapUpdateTipoElementoDTOToEntity(dto);

    // Assert
    expect(entity).toEqual({
      id_tipo_elemento: 4,
      nombre: "Footer",
    });
  });
});
