import { ApiClient } from "./services/apiClient.js";
import { ComponenteService } from "./services/componenteService.js";
import { LandingService } from "./services/landingService.js";
import { PlanService } from "./services/planService.js";
import { ListSectionRenderer } from "./renderers/listSectionRenderer.js";

const appRoot = document.getElementById("app");
const apiBaseInput = document.getElementById("apiBase");
const reloadButton = document.getElementById("reloadData");

const apiClient = new ApiClient(getSavedApiBase());
const componenteService = new ComponenteService(apiClient);
const landingService = new LandingService(apiClient);
const planService = new PlanService(apiClient);

const landingRenderer = new ListSectionRenderer({
  id: "landings",
  title: "Landing pages",
  description: "Listado de LP registradas en el sistema.",
  emptyMessage: "No hay landing pages registradas.",
  fieldMap: [
    { label: "URL", key: "url" },
    { label: "Segmento", key: "segmento" },
  ],
});

const componenteRenderer = new ListSectionRenderer({
  id: "componentes",
  title: "Componentes",
  description: "Componentes reutilizables para LP.",
  emptyMessage: "No hay componentes disponibles.",
  fieldMap: [
    { label: "Tipo", key: "id_tipo_componente" },
    { label: "Plan", key: "id_plan" },
    { label: "Variación", key: "id_tipo_variacion" },
  ],
});

const planRenderer = new ListSectionRenderer({
  id: "planes",
  title: "Planes",
  description: "Información comercial de planes.",
  emptyMessage: "No hay planes registrados.",
  fieldMap: [
    { label: "Capacidad", key: "capacidad" },
    { label: "Precio oferta", key: "precio_oferta" },
    { label: "Precio full", key: "precio_full_price" },
  ],
});

const sections = [
  {
    fetch: () => landingService.getAll(),
    renderer: landingRenderer,
    transform: (items) => items,
  },
  {
    fetch: () => componenteService.getAll(),
    renderer: componenteRenderer,
    transform: (items) => items,
  },
  {
    fetch: () => planService.getAll(),
    renderer: planRenderer,
    transform: (items) => items.map(formatPlan),
  },
];

function getSavedApiBase() {
  return localStorage.getItem("proodos:apiBase") || "/api";
}

function formatPlan(plan) {
  return {
    ...plan,
    precio_oferta: formatCurrency(plan.precio_oferta),
    precio_full_price: formatCurrency(plan.precio_full_price),
  };
}

function formatCurrency(value) {
  if (value === undefined || value === null || value === "") {
    return "-";
  }
  const numberValue = Number(value);
  if (Number.isNaN(numberValue)) {
    return value;
  }
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(numberValue);
}

async function renderSections() {
  appRoot.innerHTML = "";

  const placeholders = sections.map((section) => {
    const node = section.renderer.render([], { loading: true });
    appRoot.appendChild(node);
    return node;
  });

  const results = await Promise.allSettled(
    sections.map((section) => section.fetch())
  );

  results.forEach((result, index) => {
    const section = sections[index];
    if (result.status === "fulfilled") {
      const items = Array.isArray(result.value) ? result.value : [];
      const node = section.renderer.render(section.transform(items));
      appRoot.replaceChild(node, placeholders[index]);
      placeholders[index] = node;
      return;
    }

    const node = section.renderer.render([], {
      error: "No fue posible obtener la información desde la API.",
    });
    appRoot.replaceChild(node, placeholders[index]);
    placeholders[index] = node;
  });
}

function handleApiBaseChange() {
  const newValue = apiBaseInput.value.trim() || "/api";
  apiClient.setBaseUrl(newValue);
  localStorage.setItem("proodos:apiBase", newValue);
  renderSections();
}

apiBaseInput.value = apiClient.baseUrl || "/api";

reloadButton.addEventListener("click", handleApiBaseChange);
apiBaseInput.addEventListener("change", handleApiBaseChange);

renderSections();
