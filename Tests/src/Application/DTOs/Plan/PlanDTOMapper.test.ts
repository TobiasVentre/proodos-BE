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
      nombre: "Plan Inicial",
      capacidad: 20,
      capacidad_anterior: 15,
      precio_full_price: 200,
      precio_oferta: 180,
      aumento: 8,
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
