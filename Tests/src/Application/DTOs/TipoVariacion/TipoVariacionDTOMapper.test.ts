import {
  mapCreateTipoVariacionDTOToEntity,
  mapUpdateTipoVariacionDTOToEntity,
} from "@proodos/application/DTOs/TipoVariacion/TipoVariacionDTOMapper";
import { ICreateTipoVariacionDTO } from "@proodos/application/DTOs/TipoVariacion/ICreateTipoVariacionDTO";
import { IUpdateTipoVariacionDTO } from "@proodos/application/DTOs/TipoVariacion/IUpdateTipoVariacionDTO";

describe("TipoVariacionDTOMapper", () => {
  it("should map ICreateTipoVariacionDTO applying null defaults", () => {
    // Arrange
    const dto: ICreateTipoVariacionDTO = {
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

  it("should map IUpdateTipoVariacionDTO keeping id_tipo_variacion", () => {
    // Arrange
    const dto: IUpdateTipoVariacionDTO = {
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
