import {
  mapCreateElementoComponenteDTOToEntity,
  mapUpdateElementoComponenteDTOToEntity,
} from "@proodos/application/DTOs/ElementoComponente/ElementoComponenteDTOMapper";
import { CreateElementoComponenteDTO } from "@proodos/application/DTOs/ElementoComponente/CreateElementoComponenteDTO";
import { UpdateElementoComponenteDTO } from "@proodos/application/DTOs/ElementoComponente/UpdateElementoComponenteDTO";

describe("ElementoComponenteDTOMapper", () => {
  it("should map CreateElementoComponenteDTO to entity with id_elemento set to 0", () => {
    // Arrange
    const dto: CreateElementoComponenteDTO = {
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
      icono_img: "icon.png",
      descripcion: "descripcion",
      link: "https://example.com",
      orden: 2,
      css_url: "styles.css",
    });
  });

  it("should map UpdateElementoComponenteDTO keeping id_elemento", () => {
    // Arrange
    const dto: UpdateElementoComponenteDTO = {
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
      icono_img: "footer.png",
      descripcion: "desc",
      link: "https://example.org",
      orden: 4,
      css_url: "footer.css",
    });
  });
});
