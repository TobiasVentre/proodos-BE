import { Componente } from "@proodos/domain/Entities/Componente";
import { ComponenteCompuesto } from "@proodos/domain/Entities/ComponenteCompuesto";
import { ElementoComponente } from "@proodos/domain/Entities/ElementoComponente";
import { LandingComponente } from "@proodos/domain/Entities/LandingComponente";
import { LandingPage } from "@proodos/domain/Entities/LandingPage";
import { Plan } from "@proodos/domain/Entities/Plan";
import { TipoComponente } from "@proodos/domain/Entities/TipoComponente";
import { TipoElemento } from "@proodos/domain/Entities/TipoElemento";
import { TipoVariacion } from "@proodos/domain/Entities/TipoVariacion";

describe("Domain entities", () => {
  it("should allow assigning properties", () => {
    // Arrange
    const plan = new Plan();
    const componente = new Componente();
    const compuesto = new ComponenteCompuesto();
    const elemento = new ElementoComponente();
    const landingComponente = new LandingComponente();
    const landingPage = new LandingPage();
    const tipoComponente = new TipoComponente();
    const tipoElemento = new TipoElemento();
    const tipoVariacion = new TipoVariacion();

    // Act
    plan.id_plan = 1;
    plan.nombre = "Plan";
    plan.capacidad = 10;
    plan.capacidad_anterior = 5;
    plan.precio_full_price = 100;
    plan.precio_oferta = 90;
    plan.aumento = 10;
    plan.precio_sin_iva = 80;

    componente.id_componente = 2;
    componente.id_tipo_componente = 3;
    componente.id_plan = 1;
    componente.id_tipo_variacion = 4;
    componente.nombre = "Hero";
    componente.fecha_creacion = new Date("2024-01-01");
    componente.estado = "ACTIVO";
    componente.plan = plan;

    compuesto.id_padre = 2;
    compuesto.id_hijo = 5;

    elemento.id_elemento = 6;
    elemento.id_componente = 2;
    elemento.id_tipo_elemento = 7;
    elemento.nombre = "Elemento";
    elemento.icono_img = "icon.png";
    elemento.descripcion = "desc";
    elemento.link = "https://example.com";
    elemento.orden = 1;
    elemento.css_url = "styles.css";

    landingPage.id_landing = 8;
    landingPage.URL = "https://example.com";
    landingPage.estado = "ACTIVO";
    landingPage.segmento = "retail";

    landingComponente.id_landing = 8;
    landingComponente.id_componente = 2;

    tipoComponente.id_tipo_componente = 9;
    tipoComponente.nombre = "Banner";
    tipoComponente.estado = "ACTIVO";

    tipoElemento.id_tipo_elemento = 10;
    tipoElemento.nombre = "Imagen";

    tipoVariacion.id_tipo_variacion = 11;
    tipoVariacion.id_tipo_componente = 9;
    tipoVariacion.nombre = "Variante";
    tipoVariacion.descripcion = "desc";
    tipoVariacion.css_url = "styles.css";
    tipoVariacion.js_url = "script.js";
    tipoVariacion.html = "<div></div>";

    // Assert
    expect(plan.id_plan).toBe(1);
    expect(componente.plan?.id_plan).toBe(1);
    expect(compuesto.id_hijo).toBe(5);
    expect(elemento.nombre).toBe("Elemento");
    expect(landingComponente.id_landing).toBe(8);
    expect(landingPage.URL).toBe("https://example.com");
    expect(tipoComponente.nombre).toBe("Banner");
    expect(tipoElemento.nombre).toBe("Imagen");
    expect(tipoVariacion.nombre).toBe("Variante");
  });
});
