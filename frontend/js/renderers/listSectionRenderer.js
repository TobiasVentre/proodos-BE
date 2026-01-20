export class ListSectionRenderer {
  constructor({ id, title, description, emptyMessage, fieldMap }) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.emptyMessage = emptyMessage;
    this.fieldMap = fieldMap;
  }

  render(items, { loading = false, error = null } = {}) {
    const section = document.createElement("section");
    section.className = "section-card";
    section.id = this.id;

    const header = document.createElement("div");
    const title = document.createElement("h2");
    title.textContent = this.title;

    const meta = document.createElement("span");
    meta.className = "section-meta";

    if (loading) {
      meta.textContent = "Cargando datos...";
    } else if (error) {
      meta.textContent = "No se pudieron cargar los datos.";
    } else {
      meta.textContent = `${items.length} registrados`;
    }

    title.appendChild(meta);
    header.appendChild(title);

    if (this.description) {
      const description = document.createElement("p");
      description.className = "section-meta";
      description.textContent = this.description;
      header.appendChild(description);
    }
    section.appendChild(header);

    if (error) {
      const errorState = document.createElement("div");
      errorState.className = "error-state";
      errorState.textContent = error;
      section.appendChild(errorState);
      return section;
    }

    if (loading) {
      const loadingState = document.createElement("div");
      loadingState.className = "empty-state";
      loadingState.textContent = "Cargando información desde la API...";
      section.appendChild(loadingState);
      return section;
    }

    if (!items.length) {
      const emptyState = document.createElement("div");
      emptyState.className = "empty-state";
      emptyState.textContent = this.emptyMessage;
      section.appendChild(emptyState);
      return section;
    }

    const grid = document.createElement("div");
    grid.className = "list-grid";

    items.forEach((item) => {
      const card = document.createElement("article");
      card.className = "item-card";

      const title = document.createElement("h3");
      title.className = "item-title";
      title.textContent = this.getPrimaryText(item);
      card.appendChild(title);

      this.fieldMap.forEach(({ label, key }) => {
        if (item[key] === undefined || item[key] === null) {
          return;
        }
        const detail = document.createElement("p");
        detail.className = "item-detail";
        detail.textContent = `${label}: ${item[key]}`;
        card.appendChild(detail);
      });

      const status = this.getStatus(item);
      if (status) {
        const statusPill = document.createElement("span");
        statusPill.className = "status-pill";
        statusPill.textContent = status;
        card.appendChild(statusPill);
      }

      grid.appendChild(card);
    });

    section.appendChild(grid);
    return section;
  }

  getPrimaryText(item) {
    return item.nombre || item.titulo || `ID ${item.id ?? item.id_plan ?? ""}`;
  }

  getStatus(item) {
    if (item.estado) {
      return item.estado;
    }
    return null;
  }
}
