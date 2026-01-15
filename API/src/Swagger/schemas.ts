export const componenteSchemas = {
  CreateComponenteDTO: {
    type: "object",
    required: [
      "id_tipo_componente",
      "id_plan",
      "id_tipo_variacion",
      "nombre"
    ],
    properties: {
      id_tipo_componente: { type: "integer", example: 1 },
      id_plan: { type: "integer", example: 2 },
      id_tipo_variacion: { type: "integer", example: 3 },
      nombre: { type: "string", example: "Banner principal" }
    }
  }
};

export const planSchemas = {
  CreatePlanDTO: {
    type: "object",
    required: [
      "nombre",
      "capacidad",
      "capacidad_anterior",
      "precio_full_price",
      "precio_oferta",
      "aumento",
      "precio_sin_iva"
    ],
    properties: {
      nombre: { type: "string", example: "Plan Hogar" },
      capacidad: { type: "integer", example: 100 },
      capacidad_anterior: { type: "integer", example: 50 },
      precio_full_price: { type: "number", example: 15000 },
      precio_oferta: { type: "number", example: 12000 },
      aumento: { type: "number", example: 3000 },
      precio_sin_iva: { type: "number", example: 9900 }
    }
  },
  UpdatePlanDTO: {
    type: "object",
    required: [
      "nombre",
      "capacidad",
      "capacidad_anterior",
      "precio_full_price",
      "precio_oferta",
      "aumento",
      "precio_sin_iva"
    ],
    properties: {
      nombre: { type: "string", example: "Plan Hogar" },
      capacidad: { type: "integer", example: 100 },
      capacidad_anterior: { type: "integer", example: 50 },
      precio_full_price: { type: "number", example: 15000 },
      precio_oferta: { type: "number", example: 12000 },
      aumento: { type: "number", example: 3000 },
      precio_sin_iva: { type: "number", example: 9900 }
    }
  }
};
