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
  },
  PatchPlanDTO: {
    type: "object",
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
  CreatePlanFullDTO: {
    type: "object",
    properties: {
      segmento: { type: "string", example: "POSPAGO" },
      producto: { type: "string", example: "Porta CLARO - Mailing Extra" },
      bonete: { type: "string", example: "Plan recomendado" },
      nombre: { type: "string", example: "Plan Movistar Móvil 4GB" },
      nombre_plan: { type: "string", example: "4 Gigas" },
      capacidad: { type: "integer", example: 4 },
      capacidad_plan: { type: "string", example: "4 Gigas" },
      capacidad_anterior: { type: "integer", example: 2 },
      precio_full_price: { type: "number", example: 37600 },
      precio_oferta: { type: "number", example: 11400 },
      tag_1: { type: "string", example: "Promo" },
      tag_2: { type: "string", example: "Exclusivo" },
      beneficio_1: { type: "string", example: "$26.200 de ahorro por mes durante 6 meses." },
      beneficio_2: { type: "string", example: "3 GB para roaming en América" },
      beneficio_3: { type: "string", example: "Beneficio adicional" },
      beneficio_4: { type: "string", example: "Beneficio adicional" },
      cta_1: { type: "string", example: "Quiero que me llamen" },
      link_1: { type: "string", example: "https://example.com" },
      cta_2: { type: "string", example: "Comprar" },
      link_2: { type: "string", example: "https://example.com" },
      aumento: { type: "number", example: 3000 },
      precio_tv_digital: { type: "number", example: 2000 },
      precio_tv_max: { type: "number", example: 3500 },
      promo_activa: { type: "boolean", example: true },
      muestra_desde: { type: "string", example: "2024-01-01" },
      canales_tv_digital: { type: "string", example: "80 canales" },
      canales_tv_max: { type: "string", example: "120 canales" },
      precio_no_cliente: { type: "number", example: 25000 },
      descripcion_oferta: { type: "string", example: "Descripción comercial" },
      comercial_name: { type: "string", example: "Plan Movistar Móvil 4GB" },
      comercial_id: { type: "string", example: "18474071" },
      telefono_0800: { type: "string", example: "0800-333-0000" },
      icono_tag_1: { type: "string", example: "https://cdn/icono-tag-1.svg" },
      pre_beneficio_2_titulo: { type: "string", example: "Más roaming" },
      pre_beneficio_2_descripcion: { type: "string", example: "Detalles beneficio 2" },
      pre_beneficio_1_titulo: { type: "string", example: "Más datos" },
      pre_beneficio_1_descripcion: { type: "string", example: "Detalles beneficio 1" },
      nombre_plan_tv: { type: "string", example: "Plan TV" },
      grilla_canales: { type: "string", example: "Lista de canales" },
      icono_bonete: { type: "string", example: "https://cdn/icono-bonete.svg" },
      precio_sin_iva: { type: "number", example: 9900 }
    }
  },
  PatchPlanFullDTO: {
    type: "object",
    properties: {
      segmento: { type: "string" },
      producto: { type: "string" },
      bonete: { type: "string" },
      nombre: { type: "string" },
      nombre_plan: { type: "string" },
      capacidad: { type: "integer" },
      capacidad_plan: { type: "string" },
      capacidad_anterior: { type: "integer" },
      precio_full_price: { type: "number" },
      precio_oferta: { type: "number" },
      tag_1: { type: "string" },
      tag_2: { type: "string" },
      beneficio_1: { type: "string" },
      beneficio_2: { type: "string" },
      beneficio_3: { type: "string" },
      beneficio_4: { type: "string" },
      cta_1: { type: "string" },
      link_1: { type: "string" },
      cta_2: { type: "string" },
      link_2: { type: "string" },
      aumento: { type: "number" },
      precio_tv_digital: { type: "number" },
      precio_tv_max: { type: "number" },
      promo_activa: { type: "boolean" },
      muestra_desde: { type: "string" },
      canales_tv_digital: { type: "string" },
      canales_tv_max: { type: "string" },
      precio_no_cliente: { type: "number" },
      descripcion_oferta: { type: "string" },
      comercial_name: { type: "string" },
      comercial_id: { type: "string" },
      telefono_0800: { type: "string" },
      icono_tag_1: { type: "string" },
      pre_beneficio_2_titulo: { type: "string" },
      pre_beneficio_2_descripcion: { type: "string" },
      pre_beneficio_1_titulo: { type: "string" },
      pre_beneficio_1_descripcion: { type: "string" },
      nombre_plan_tv: { type: "string" },
      grilla_canales: { type: "string" },
      icono_bonete: { type: "string" },
      precio_sin_iva: { type: "number" }
    }
  }
};

export const landingSchemas = {
  LandingPageDTO: {
    type: "object",
    required: ["id_landing", "URL", "estado", "segmento"],
    properties: {
      id_landing: { type: "integer", example: 10 },
      URL: { type: "string", example: "https://www.movistar.com.ar/landing/oferta" },
      estado: { type: "string", example: "ACTIVA" },
      segmento: { type: "string", example: "HOGAR" }
    }
  }
};

export const tipoComponenteSchemas = {
  CreateTipoComponenteDTO: {
    type: "object",
    required: ["nombre", "estado"],
    properties: {
      nombre: { type: "string", example: "banner" },
      estado: { type: "string", example: "ACTIVO" }
    }
  },
  PatchTipoComponenteDTO: {
    type: "object",
    properties: {
      nombre: { type: "string", example: "banner" },
      estado: { type: "string", example: "ACTIVO" }
    }
  }
};

export const tipoVariacionSchemas = {
  CreateTipoVariacionDTO: {
    type: "object",
    required: ["id_tipo_componente", "nombre"],
    properties: {
      id_tipo_componente: { type: "integer", example: 1 },
      nombre: { type: "string", example: "imagen izquierda" },
      descripcion: { type: "string", example: "Variación con imagen a la izquierda" },
      css_url: { type: "string", example: "/css/variaciones/banner.css" },
      js_url: { type: "string", example: "/js/variaciones/banner.js" },
      html: { type: "string", example: "<div class='banner'></div>" }
    }
  },
  PatchTipoVariacionDTO: {
    type: "object",
    properties: {
      id_tipo_componente: { type: "integer", example: 1 },
      nombre: { type: "string", example: "imagen izquierda" },
      descripcion: { type: "string", example: "Variación con imagen a la izquierda" },
      css_url: { type: "string", example: "/css/variaciones/banner.css" },
      js_url: { type: "string", example: "/js/variaciones/banner.js" },
      html: { type: "string", example: "<div class='banner'></div>" }
    }
  }
};

export const tipoElementoSchemas = {
  CreateTipoElementoDTO: {
    type: "object",
    required: ["nombre"],
    properties: {
      nombre: { type: "string", example: "titulo" }
    }
  },
  PatchTipoElementoDTO: {
    type: "object",
    properties: {
      nombre: { type: "string", example: "titulo" }
    }
  }
};

export const elementoComponenteSchemas = {
  CreateElementoComponenteDTO: {
    type: "object",
    required: [
      "id_componente",
      "id_tipo_elemento",
      "nombre",
      "icono_img",
      "descripcion",
      "link",
      "orden",
      "css_url"
    ],
    properties: {
      id_componente: { type: "integer", example: 10 },
      id_tipo_elemento: { type: "integer", example: 2 },
      nombre: { type: "string", example: "Titulo principal" },
      icono_img: { type: "string", example: "https://cdn.example.com/icono.png" },
      descripcion: { type: "string", example: "Texto descriptivo" },
      link: { type: "string", example: "https://example.com" },
      orden: { type: "integer", example: 1 },
      css_url: { type: "string", example: "/css/elementos/titulo.css" }
    }
  },
  PatchElementoComponenteDTO: {
    type: "object",
    properties: {
      id_componente: { type: "integer", example: 10 },
      id_tipo_elemento: { type: "integer", example: 2 },
      nombre: { type: "string", example: "Titulo principal" },
      icono_img: { type: "string", example: "https://cdn.example.com/icono.png" },
      descripcion: { type: "string", example: "Texto descriptivo" },
      link: { type: "string", example: "https://example.com" },
      orden: { type: "integer", example: 1 },
      css_url: { type: "string", example: "/css/elementos/titulo.css" }
    }
  }
};
