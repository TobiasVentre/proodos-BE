import { mapCreatePlanDTOToEntity, mapUpdatePlanDTOToEntity } from "@proodos/application/DTOs/Plan/PlanDTOMapper";
import { CreatePlanDTO } from "@proodos/application/DTOs/Plan/CreatePlanDTO";
import { UpdatePlanDTO } from "@proodos/application/DTOs/Plan/UpdatePlanDTO";

describe("PlanDTOMapper", () => {
  it("should map CreatePlanDTO to a Plan entity with id_plan set to 0", () => {
    // Arrange
    const dto: CreatePlanDTO = {
      nombre: "Plan Inicial",
      capacidad: 20,
      capacidad_anterior: 15,
      precio_full_price: 200,
      precio_oferta: 180,
      aumento: 8,
      precio_sin_iva: 170,
    };

    // Act
    const plan = mapCreatePlanDTOToEntity(dto);

    // Assert
    expect(plan).toEqual({
      id_plan: 0,
      segmento: null,
      producto: null,
      bonete: null,
      nombre: "Plan Inicial",
      nombre_plan: null,
      capacidad: 20,
      capacidad_plan: null,
      capacidad_anterior: 15,
      precio_full_price: 200,
      precio_oferta: 180,
      tag_1: null,
      tag_2: null,
      beneficio_1: null,
      beneficio_2: null,
      beneficio_3: null,
      beneficio_4: null,
      cta_1: null,
      link_1: null,
      cta_2: null,
      link_2: null,
      aumento: 8,
      precio_tv_digital: null,
      precio_tv_max: null,
      promo_activa: null,
      muestra_desde: null,
      canales_tv_digital: null,
      canales_tv_max: null,
      precio_no_cliente: null,
      descripcion_oferta: null,
      comercial_name: null,
      comercial_id: null,
      telefono_0800: null,
      icono_tag_1: null,
      pre_beneficio_2_titulo: null,
      pre_beneficio_2_descripcion: null,
      pre_beneficio_1_titulo: null,
      pre_beneficio_1_descripcion: null,
      nombre_plan_tv: null,
      grilla_canales: null,
      icono_bonete: null,
      precio_sin_iva: 170,
    });
  });

  it("should map UpdatePlanDTO to a Plan entity keeping id_plan", () => {
    // Arrange
    const dto: UpdatePlanDTO = {
      id_plan: 9,
      nombre: "Plan Actualizado",
      capacidad: 35,
      capacidad_anterior: 30,
      precio_full_price: 350,
      precio_oferta: 320,
      aumento: 9,
      precio_sin_iva: 310,
    };

    // Act
    const plan = mapUpdatePlanDTOToEntity(dto);

    // Assert
    expect(plan).toEqual({
      id_plan: 9,
      nombre: "Plan Actualizado",
      capacidad: 35,
      capacidad_anterior: 30,
      precio_full_price: 350,
      precio_oferta: 320,
      aumento: 9,
      precio_sin_iva: 310,
    });
  });
});
