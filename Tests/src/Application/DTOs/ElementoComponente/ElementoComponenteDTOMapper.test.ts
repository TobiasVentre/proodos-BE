import {
  mapCreateElementoComponenteDTOToEntity,
  mapUpdateElementoComponenteDTOToEntity,
} from "@proodos/application/DTOs/ElementoComponente/ElementoComponenteDTOMapper";
import { ICreateElementoComponenteDTO } from "@proodos/application/DTOs/ElementoComponente/ICreateElementoComponenteDTO";
import { IUpdateElementoComponenteDTO } from "@proodos/application/DTOs/ElementoComponente/IUpdateElementoComponenteDTO";

describe("ElementoComponenteDTOMapper", () => {
  it("should map ICreateElementoComponenteDTO to entity with id_elemento set to 0", () => {
    const dto: ICreateElementoComponenteDTO = {
      id_tipo_elemento: 5,
      nombre: "Hero",
      icono_img: "icon.png",
      descripcion: "descripcion",
      link: "https://example.com",
      orden: 2,
      css_url: "styles.css",
      contrato_minimo: { required: ["selector"] },
    };

    const entity = mapCreateElementoComponenteDTOToEntity(dto);

    expect(entity).toEqual({
      id_elemento: 0,
      id_tipo_elemento: 5,
      nombre: "Hero",
      selector: null,
      icono_img: "icon.png",
      descripcion: "descripcion",
      link: "https://example.com",
      orden: 2,
      css_url: "styles.css",
      js_url: null,
      contrato_minimo: { required: ["selector"] },
    });
  });

  it("should map IUpdateElementoComponenteDTO keeping id_elemento", () => {
    const dto: IUpdateElementoComponenteDTO = {
      id_elemento: 10,
      id_tipo_elemento: 9,
      nombre: "Footer",
      icono_img: "footer.png",
      descripcion: "desc",
      link: "https://example.org",
      orden: 4,
      css_url: "footer.css",
    };

    const entity = mapUpdateElementoComponenteDTOToEntity(dto);

    expect(entity).toEqual({
      id_elemento: 10,
      id_tipo_elemento: 9,
      nombre: "Footer",
      selector: null,
      icono_img: "footer.png",
      descripcion: "desc",
      link: "https://example.org",
      orden: 4,
      css_url: "footer.css",
      js_url: null,
      contrato_minimo: null,
    });
  });

  it("should map omitted optional fields to null", () => {
    const dto: ICreateElementoComponenteDTO = {
      id_tipo_elemento: 5,
      nombre: "Hero",
      orden: 2,
    };

    const entity = mapCreateElementoComponenteDTOToEntity(dto);

    expect(entity).toEqual({
      id_elemento: 0,
      id_tipo_elemento: 5,
      nombre: "Hero",
      selector: null,
      icono_img: null,
      descripcion: null,
      link: null,
      orden: 2,
      css_url: null,
      js_url: null,
      contrato_minimo: null,
    });
  });
});
