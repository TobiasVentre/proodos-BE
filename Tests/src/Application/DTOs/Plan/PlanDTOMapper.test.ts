import {
  mapCreatePlanDTOToEntity,
  mapCreatePlanFullDTOToEntity,
  mapUpdatePlanDTOToEntity,
  mapUpdatePlanFullDTOToEntity,
} from "@proodos/application/DTOs/Plan/PlanDTOMapper";
import { ICreatePlanDTO } from "@proodos/application/DTOs/Plan/ICreatePlanDTO";
import { ICreatePlanFullDTO } from "@proodos/application/DTOs/Plan/ICreatePlanFullDTO";
import { IUpdatePlanDTO } from "@proodos/application/DTOs/Plan/IUpdatePlanDTO";
import { IUpdatePlanFullDTO } from "@proodos/application/DTOs/Plan/IUpdatePlanFullDTO";

describe("PlanDTOMapper", () => {
  it("should map ICreatePlanDTO to a Plan entity with id_plan set to 0", () => {
    // Arrange
    const dto: ICreatePlanDTO = {
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

  it("should map IUpdatePlanDTO to a Plan entity keeping id_plan", () => {
    // Arrange
    const dto: IUpdatePlanDTO = {
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

  it("should map ICreatePlanFullDTO and normalize omitted fields to null", () => {
    // Arrange
    const dto: ICreatePlanFullDTO = {
      nombre: "Plan Full",
      capacidad: 100,
      promo_activa: false,
      precio_oferta: 1200,
    };

    // Act
    const plan = mapCreatePlanFullDTOToEntity(dto);

    // Assert
    expect(plan).toEqual(
      expect.objectContaining({
        id_plan: 0,
        nombre: "Plan Full",
        capacidad: 100,
        promo_activa: false,
        precio_oferta: 1200,
        segmento: null,
        producto: null,
        precio_full_price: null,
        precio_sin_iva: null,
      })
    );
  });

  it("should map IUpdatePlanFullDTO and normalize omitted fields to null", () => {
    // Arrange
    const dto: IUpdatePlanFullDTO = {
      id_plan: 14,
      nombre: "Plan Full Actualizado",
      precio_full_price: 1800,
      promo_activa: true,
    };

    // Act
    const plan = mapUpdatePlanFullDTOToEntity(dto);

    // Assert
    expect(plan).toEqual(
      expect.objectContaining({
        id_plan: 14,
        nombre: "Plan Full Actualizado",
        precio_full_price: 1800,
        promo_activa: true,
        segmento: null,
        producto: null,
        precio_oferta: null,
        precio_sin_iva: null,
      })
    );
  });
});
