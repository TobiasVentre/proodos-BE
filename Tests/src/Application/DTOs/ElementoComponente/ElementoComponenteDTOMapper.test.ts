import {
  mapCreateElementoComponenteDTOToEntity,
  mapUpdateElementoComponenteDTOToEntity,
} from "@proodos/application/DTOs/ElementoComponente/ElementoComponenteDTOMapper";
import { ICreateElementoComponenteDTO } from "@proodos/application/DTOs/ElementoComponente/ICreateElementoComponenteDTO";
import { IUpdateElementoComponenteDTO } from "@proodos/application/DTOs/ElementoComponente/IUpdateElementoComponenteDTO";

describe("ElementoComponenteDTOMapper", () => {
  it("should map ICreateElementoComponenteDTO to entity with id_elemento set to 0", () => {
    // Arrange
    const dto: ICreateElementoComponenteDTO = {
      id_componente: 3,
      id_tipo_elemento: 5,
      nombre: "Hero",
      icono_img: "icon.png",
      descripcion: "descripcion",
      link: "https://example.com",
      orden: 2,
      css_url: "styles.css",
    };

    // Act
    const entity = mapCreateElementoComponenteDTOToEntity(dto);

    // Assert
    expect(entity).toEqual({
      id_elemento: 0,
      id_componente: 3,
      id_tipo_elemento: 5,
      nombre: "Hero",
      selector: null,
      icono_img: "icon.png",
      descripcion: "descripcion",
      link: "https://example.com",
      orden: 2,
      css_url: "styles.css",
      js_url: null,
    });
  });

  it("should map IUpdateElementoComponenteDTO keeping id_elemento", () => {
    // Arrange
    const dto: IUpdateElementoComponenteDTO = {
      id_elemento: 10,
      id_componente: 7,
      id_tipo_elemento: 9,
      nombre: "Footer",
      icono_img: "footer.png",
      descripcion: "desc",
      link: "https://example.org",
      orden: 4,
      css_url: "footer.css",
    };

    // Act
    const entity = mapUpdateElementoComponenteDTOToEntity(dto);

    // Assert
    expect(entity).toEqual({
      id_elemento: 10,
      id_componente: 7,
      id_tipo_elemento: 9,
      nombre: "Footer",
      selector: null,
      icono_img: "footer.png",
      descripcion: "desc",
      link: "https://example.org",
      orden: 4,
      css_url: "footer.css",
      js_url: null,
    });
  });

  it("should map omitted optional fields to null", () => {
    // Arrange
    const dto: ICreateElementoComponenteDTO = {
      id_componente: 3,
      id_tipo_elemento: 5,
      nombre: "Hero",
      orden: 2,
    };

    // Act
    const entity = mapCreateElementoComponenteDTOToEntity(dto);

    // Assert
    expect(entity).toEqual({
      id_elemento: 0,
      id_componente: 3,
      id_tipo_elemento: 5,
      nombre: "Hero",
      selector: null,
      icono_img: null,
      descripcion: null,
      link: null,
      orden: 2,
      css_url: null,
      js_url: null,
    });
  });
});
