import {
  mapCreateTipoVariacionDTOToEntity,
  mapUpdateTipoVariacionDTOToEntity,
} from "@proodos/application/DTOs/TipoVariacion/TipoVariacionDTOMapper";
import { CreateTipoVariacionDTO } from "@proodos/application/DTOs/TipoVariacion/CreateTipoVariacionDTO";
import { UpdateTipoVariacionDTO } from "@proodos/application/DTOs/TipoVariacion/UpdateTipoVariacionDTO";

describe("TipoVariacionDTOMapper", () => {
  it("should map CreateTipoVariacionDTO applying null defaults", () => {
    // Arrange
    const dto: CreateTipoVariacionDTO = {
      id_tipo_componente: 1,
      nombre: "Variante",
    };

    // Act
    const entity = mapCreateTipoVariacionDTOToEntity(dto);

    // Assert
    expect(entity).toEqual({
      id_tipo_variacion: 0,
      id_tipo_componente: 1,
      nombre: "Variante",
      descripcion: null,
      css_url: null,
      js_url: null,
      html: null,
    });
  });

  it("should map UpdateTipoVariacionDTO keeping id_tipo_variacion", () => {
    // Arrange
    const dto: UpdateTipoVariacionDTO = {
      id_tipo_variacion: 7,
      id_tipo_componente: 2,
      nombre: "Variante 2",
      descripcion: "desc",
      css_url: "styles.css",
      js_url: "script.js",
      html: "<div></div>",
    };

    // Act
    const entity = mapUpdateTipoVariacionDTOToEntity(dto);

    // Assert
    expect(entity).toEqual({
      id_tipo_variacion: 7,
      id_tipo_componente: 2,
      nombre: "Variante 2",
      descripcion: "desc",
      css_url: "styles.css",
      js_url: "script.js",
      html: "<div></div>",
    });
  });
});
