import { ILandingIndexExportDTO } from "../../DTOs/LandingPage/ILandingIndexExportDTO";
import { NotFoundError } from "../../Errors/NotFoundError";
import { IElementoComponenteRepository } from "../../Interfaces/IElementoComponenteRepository";
import { ILandingExportAssetLoader } from "../../Interfaces/ILandingExportAssetLoader";
import { ILandingExportOutputWriter } from "../../Interfaces/ILandingExportOutputWriter";
import { IComponenteCompuestoRepository } from "../../Interfaces/IComponenteCompuestoRepository";
import { IComponenteRepository } from "../../Interfaces/IComponenteRepository";
import { ILandingComponenteRepository } from "../../Interfaces/ILandingComponenteRepository";
import { ILogger } from "../../Interfaces/ILogger";
import { ILandingPageRepository } from "../../Interfaces/ILandingPageRepository";
import { IPlanRepository } from "../../Interfaces/IPlanRepository";
import { ITipoElementoRepository } from "../../Interfaces/ITipoElementoRepository";
import { ITipoVariacionRepository } from "../../Interfaces/ITipoVariacionRepository";
import { IGenerateLandingIndexUseCase } from "../../Ports/ILandingPageUseCases";

const escapeHtml = (value: unknown): string =>
  String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const buildLandingTitle = (landingUrl: string, landingId: number): string =>
  String(landingUrl ?? "").trim() || `Landing ${landingId}`;

const normalizeSelector = (selector: unknown): string | null => {
  if (selector === null || selector === undefined) {
    return null;
  }

  const normalized = String(selector).trim();
  return normalized || null;
};

const escapeRegex = (value: string): string =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const VOID_HTML_TAGS = new Set([
  "area",
  "base",
  "br",
  "col",
  "embed",
  "hr",
  "img",
  "input",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr",
]);

const CONTAINER_HTML_TAGS = new Set([
  "div",
  "section",
  "article",
  "li",
  "ul",
  "ol",
  "aside",
  "header",
  "footer",
  "nav",
  "main",
  "a",
  "button",
]);

const findInsertPositionBySelector = (
  html: string,
  selector: string
): number | null => {
  if (!selector) {
    return null;
  }

  if (selector.startsWith("#")) {
    const id = selector.slice(1);
    if (!id) {
      return null;
    }
    const idPattern = new RegExp(
      `\\bid\\s*=\\s*(['"])${escapeRegex(id)}\\1`,
      "i"
    );
    const match = idPattern.exec(html);
    if (!match) {
      return null;
    }

    const openTagEnd = html.indexOf(">", match.index);
    return openTagEnd >= 0 ? openTagEnd + 1 : null;
  }

  if (selector.startsWith(".")) {
    const className = selector.slice(1);
    if (!className) {
      return null;
    }

    const classAttrPattern = /\bclass\s*=\s*(['"])([^'"]*)\1/gi;
    let match: RegExpExecArray | null;
    while ((match = classAttrPattern.exec(html)) !== null) {
      const classes = match[2]
        .split(/\s+/)
        .map((item) => item.trim())
        .filter(Boolean);
      if (!classes.includes(className)) {
        continue;
      }

      const openTagEnd = html.indexOf(">", match.index);
      return openTagEnd >= 0 ? openTagEnd + 1 : null;
    }
  }

  return null;
};

const injectChildMarkup = ({
  baseHtml,
  selector,
  childMarkup,
}: {
  baseHtml: string;
  selector: string | null;
  childMarkup: string;
}): { html: string; insertedBySelector: boolean } => {
  if (!childMarkup.trim()) {
    return { html: baseHtml, insertedBySelector: false };
  }

  if (!selector) {
    return { html: `${baseHtml}\n${childMarkup}`, insertedBySelector: false };
  }

  const position = findInsertPositionBySelector(baseHtml, selector);
  if (position === null) {
    return { html: `${baseHtml}\n${childMarkup}`, insertedBySelector: false };
  }

  return {
    html: `${baseHtml.slice(0, position)}${childMarkup}${baseHtml.slice(position)}`,
    insertedBySelector: true,
  };
};

const normalizeContainerToken = (rawSelector: unknown): string | null => {
  if (rawSelector === null || rawSelector === undefined) {
    return null;
  }

  const normalized = String(rawSelector).trim();
  if (!normalized) {
    return null;
  }

  if (normalized.startsWith("{") && normalized.endsWith("}")) {
    return normalized;
  }

  return `{${normalized}}`;
};

const injectByPlaceholderToken = ({
  baseHtml,
  placeholderToken,
  childMarkup,
}: {
  baseHtml: string;
  placeholderToken: string | null;
  childMarkup: string;
}): { html: string; insertedByToken: boolean } => {
  if (!childMarkup.trim() || !placeholderToken) {
    return { html: baseHtml, insertedByToken: false };
  }

  if (!baseHtml.includes(placeholderToken)) {
    return { html: baseHtml, insertedByToken: false };
  }

  return {
    html: baseHtml.replace(placeholderToken, childMarkup),
    insertedByToken: true,
  };
};

const buildIndexDocument = ({
  title,
  inlineCss,
  warnings,
  renderedComponentsMarkup,
}: {
  title: string;
  inlineCss: string;
  warnings: string[];
  renderedComponentsMarkup: string;
}): string => {
  const warningsMarkup = warnings.length
    ? `
      <aside class="landing-export-alert">
        <strong>Advertencias</strong>
        <ul>
          ${warnings.map((warning) => `<li>${escapeHtml(warning)}</li>`).join("")}
        </ul>
      </aside>
    `
    : "";

  const contentMarkup =
    renderedComponentsMarkup ||
    `
      <section class="landing-export-empty">
        <p>No hubo componentes renderizables para esta landing.</p>
      </section>
    `;

  return `<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${escapeHtml(title)}</title>
    <style>
      :root {
        color-scheme: light;
      }

      * {
        box-sizing: border-box;
      }

      body {
        margin: 0;
        font-family: "Segoe UI", Tahoma, sans-serif;
        background: #f5f7f6;
        color: #1f2937;
      }

      .landing-export-shell {
        max-width: 1440px;
        margin: 0 auto;
        padding: 24px;
        display: grid;
        gap: 20px;
      }

      .landing-export-alert,
      .landing-export-empty {
        background: #ffffff;
        border: 1px solid rgba(15, 23, 42, 0.08);
        border-radius: 16px;
        padding: 20px;
      }

      .landing-export-alert ul {
        margin: 12px 0 0;
        padding-left: 20px;
      }

      .landing-export-components {
        display: grid;
        gap: 20px;
      }

      .landing-export-component {
        width: 100%;
      }

      ${inlineCss}
    </style>
  </head>
  <body>
    <main class="landing-export-shell">
      ${warningsMarkup}
      <div class="landing-export-components">
        ${contentMarkup}
      </div>
    </main>
  </body>
</html>`;
};

const buildLinkedIndexDocument = ({
  title,
  stylesheetHref,
  scriptHrefs,
  warnings,
  renderedComponentsMarkup,
}: {
  title: string;
  stylesheetHref: string;
  scriptHrefs: string[];
  warnings: string[];
  renderedComponentsMarkup: string;
}): string => {
  const warningsMarkup = warnings.length
    ? `
      <aside class="landing-export-alert">
        <strong>Advertencias</strong>
        <ul>
          ${warnings.map((warning) => `<li>${escapeHtml(warning)}</li>`).join("")}
        </ul>
      </aside>
    `
    : "";

  const contentMarkup =
    renderedComponentsMarkup ||
    `
      <section class="landing-export-empty">
        <p>No hubo componentes renderizables para esta landing.</p>
      </section>
    `;

  const customScriptsMarkup = scriptHrefs.length
    ? `
    ${scriptHrefs
      .map((scriptHref) => `<script src="${escapeHtml(scriptHref)}"></script>`)
      .join("\n    ")}`
    : "";

  return `<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${escapeHtml(title)}</title>
    <link rel="stylesheet" href="${escapeHtml(stylesheetHref)}">
    <!-- Estilos Kenos Base -->
    <link rel="stylesheet" href="../../Proodos-FE/preview-assets/css/base-kenos.min.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css">
    <script src="./planesGenerator.js" defer></script>
  </head>
  <body>
    <main class="landing-export-shell">
      ${warningsMarkup}
      <div class="landing-export-components">
        ${contentMarkup}
      </div>
    </main>
    <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>${customScriptsMarkup}
  </body>
</html>`;
};

const buildPlanesGeneratorScript = (): string => `(function () {
  const PLACEHOLDER_PATTERN = /\\{\\s*([A-Za-z0-9_]+)\\s*\\}/g;
  const CONTAINER_SELECTOR = "div,section,article,li,ul,ol,aside,header,footer,nav,main,a,button";
  const SKIP_TEXT_PARENTS = new Set(["SCRIPT", "STYLE", "NOSCRIPT"]);

  const hasOwn = (object, key) => Object.prototype.hasOwnProperty.call(object, key);

  const findHideTarget = (node) => {
    let element = node instanceof Element ? node : node?.parentElement ?? null;

    while (element && !element.matches(CONTAINER_SELECTOR)) {
      element = element.parentElement;
    }

    return element ?? (node instanceof Element ? node : node?.parentElement ?? null);
  };

  const hideElement = (node) => {
    const target = findHideTarget(node);
    if (!target) {
      return;
    }

    target.style.setProperty("display", "none", "important");
  };

  const replaceTemplateString = (template, plan) => {
    let changed = false;
    let shouldHide = false;

    const nextValue = String(template ?? "").replace(PLACEHOLDER_PATTERN, (match, key) => {
      if (!hasOwn(plan, key)) {
        return match;
      }

      changed = true;
      const value = plan[key];
      if (value === null || value === undefined) {
        shouldHide = true;
        return "";
      }

      return String(value);
    });

    return {
      nextValue,
      changed,
      shouldHide,
    };
  };

  const belongsToCurrentComponent = (rootElement, nodeOrElement) => {
    const ownerElement =
      nodeOrElement instanceof Element ? nodeOrElement : nodeOrElement?.parentElement ?? null;

    if (!ownerElement) {
      return false;
    }

    const nearestComponent = ownerElement.closest("[data-plan-id]");
    return nearestComponent === rootElement;
  };

  const processTextNodes = (rootElement, plan) => {
    const walker = document.createTreeWalker(rootElement, NodeFilter.SHOW_TEXT);
    let currentNode = walker.nextNode();

    while (currentNode) {
      if (!belongsToCurrentComponent(rootElement, currentNode)) {
        currentNode = walker.nextNode();
        continue;
      }

      const parentTagName = currentNode.parentElement?.tagName ?? "";
      if (!SKIP_TEXT_PARENTS.has(parentTagName)) {
        const result = replaceTemplateString(currentNode.nodeValue ?? "", plan);
        if (result.changed) {
          currentNode.nodeValue = result.nextValue;
        }
        if (result.shouldHide) {
          hideElement(currentNode);
        }
      }

      currentNode = walker.nextNode();
    }
  };

  const processAttributes = (rootElement, plan) => {
    const elements = [rootElement].concat(Array.from(rootElement.querySelectorAll("*")));

    elements.forEach((element) => {
      if (!belongsToCurrentComponent(rootElement, element)) {
        return;
      }

      Array.from(element.attributes).forEach((attribute) => {
        if (attribute.name === "data-plan-id") {
          return;
        }

        const result = replaceTemplateString(attribute.value, plan);
        if (!result.changed) {
          return;
        }

        if (result.shouldHide) {
          hideElement(element);
        }

        if (
          result.nextValue === "" &&
          (attribute.name === "href" ||
            attribute.name === "src" ||
            attribute.name === "srcset" ||
            attribute.name === "poster")
        ) {
          element.removeAttribute(attribute.name);
          return;
        }

        element.setAttribute(attribute.name, result.nextValue);
      });
    });
  };

  const hydratePlans = async () => {
    let response;
    try {
      response = await fetch("./plans-data.json", {
        cache: "no-store",
      });
    } catch {
      return;
    }

    if (!response || !response.ok) {
      return;
    }

    let plansData;
    try {
      plansData = await response.json();
    } catch {
      return;
    }

    if (!plansData || typeof plansData !== "object") {
      return;
    }

    document.querySelectorAll("[data-plan-id]").forEach((componentElement) => {
      const planId = String(componentElement.getAttribute("data-plan-id") ?? "").trim();
      if (!planId || !hasOwn(plansData, planId)) {
        return;
      }

      const plan = plansData[planId];
      if (!plan || typeof plan !== "object") {
        return;
      }

      processTextNodes(componentElement, plan);
      processAttributes(componentElement, plan);
    });
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", hydratePlans, { once: true });
    return;
  }

  void hydratePlans();
})();`;

const buildGlobalStylesheet = (inlineCss: string): string => `:root {
  color-scheme: light;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: "Segoe UI", Tahoma, sans-serif;
  background: #f5f7f6;
  color: #1f2937;
}

.landing-export-shell {
  max-width: 1440px;
  margin: 0 auto;
  padding: 24px;
  display: grid;
  gap: 20px;
}

.landing-export-alert,
.landing-export-empty {
  background: #ffffff;
  border: 1px solid rgba(15, 23, 42, 0.08);
  border-radius: 16px;
  padding: 20px;
}

.landing-export-alert ul {
  margin: 12px 0 0;
  padding-left: 20px;
}

.landing-export-components {
  display: grid;
  gap: 20px;
}

.landing-export-component {
  width: 100%;
}

${inlineCss}`.trim();

export class GenerateLandingIndexService implements IGenerateLandingIndexUseCase {
  constructor(
    private readonly landingPageRepository: ILandingPageRepository,
    private readonly landingComponenteRepository: ILandingComponenteRepository,
    private readonly componenteRepository: IComponenteRepository,
    private readonly componenteCompuestoRepository: IComponenteCompuestoRepository,
    private readonly planRepository: IPlanRepository,
    private readonly elementoComponenteRepository: IElementoComponenteRepository,
    private readonly tipoElementoRepository: ITipoElementoRepository,
    private readonly tipoVariacionRepository: ITipoVariacionRepository,
    private readonly assetLoader: ILandingExportAssetLoader,
    private readonly outputWriter: ILandingExportOutputWriter,
    private readonly logger: ILogger
  ) {}

  async execute(id_landing: number): Promise<ILandingIndexExportDTO> {
    this.logger.info("[Service] GenerateLandingIndexService.execute()", {
      id_landing,
    });

    const landing = await this.landingPageRepository.getById(id_landing);
    if (!landing) {
      throw new NotFoundError("Landing not found", { id_landing });
    }

    const [relations, allComponentes, componenteCompuestoRelations] = await Promise.all([
      this.landingComponenteRepository.getByLanding(id_landing),
      this.componenteRepository.getAll(),
      this.componenteCompuestoRepository.getAll(),
    ]);

    const landingComponentes = relations
      .filter((relation) => Boolean(relation.componente))
      .map((relation) => relation.componente!);

    const warnings: string[] = [];
    const cssHrefs = new Set<string>();
    const scriptHrefs = new Set<string>();
    const inlineCssParts: string[] = [];
    const loadedCssByHref = new Map<string, string>();
    const variationCache = new Map<number, Awaited<ReturnType<ITipoVariacionRepository["getById"]>>>();
    const templateCache = new Map<string, string>();
    const planCache = new Map<number, Awaited<ReturnType<IPlanRepository["getById"]>>>();
    const usedPlansById = new Map<number, Record<string, unknown>>();
    const elementosByComponenteCache = new Map<
      number,
      Awaited<ReturnType<IElementoComponenteRepository["getByComponente"]>>
    >();
    const tiposElemento = await this.tipoElementoRepository.getAll();
    const tipoElementoNameById = new Map<number, string>();
    tiposElemento.forEach((tipoElemento) => {
      tipoElementoNameById.set(
        tipoElemento.id_tipo_elemento,
        String(tipoElemento.nombre ?? "").trim().toLowerCase()
      );
    });
    const componentesById = new Map<number, typeof landingComponentes[number]>();
    allComponentes.forEach((componente) => {
      componentesById.set(componente.id_componente, componente);
    });
    landingComponentes.forEach((componente) => {
      componentesById.set(componente.id_componente, componente);
    });

    const childrenByParent = new Map<number, number[]>();
    for (const relation of componenteCompuestoRelations) {
      if (!childrenByParent.has(relation.id_padre)) {
        childrenByParent.set(relation.id_padre, []);
      }
      childrenByParent.get(relation.id_padre)!.push(relation.id_hijo);
    }

    childrenByParent.forEach((children) => children.sort((a, b) => a - b));

    const landingComponentIds = landingComponentes.map((componente) => componente.id_componente);
    const landingComponentIdSet = new Set<number>(landingComponentIds);
    const descendantLandingIds = new Set<number>();
    const collectDescendants = (id: number): void => {
      const childIds = childrenByParent.get(id) || [];
      childIds.forEach((childId) => {
        if (!landingComponentIdSet.has(childId) || descendantLandingIds.has(childId)) {
          return;
        }
        descendantLandingIds.add(childId);
        collectDescendants(childId);
      });
    };
    landingComponentIds.forEach((id) => collectDescendants(id));
    const rootComponentIds = landingComponentIds
      .filter((id) => !descendantLandingIds.has(id))

    const renderedComponentsMarkup: string[] = [];
    const exportedComponentes: ILandingIndexExportDTO["componentes"] = [];
    const exportedIds = new Set<number>();
    let renderInstanceSeq = 0;
    const appendStylesheetToInline = async ({
      assetPath,
      sourceLabel,
    }: {
      assetPath: string | null | undefined;
      sourceLabel: string;
    }): Promise<void> => {
      const cssHref = this.assetLoader.resolveStylesheetHref(assetPath);
      if (!cssHref) {
        return;
      }

      cssHrefs.add(cssHref);
      if (loadedCssByHref.has(cssHref)) {
        return;
      }

      try {
        const stylesheet = await this.assetLoader.loadStylesheet(assetPath ?? "");
        const scopedCss = [`/* ${sourceLabel} */`, stylesheet].join("\n");
        loadedCssByHref.set(cssHref, scopedCss);
        inlineCssParts.push(scopedCss);
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "No se pudo cargar el CSS.";
        warnings.push(`${sourceLabel}: ${message}`);
      }
    };
    const appendScriptHref = ({
      assetPath,
    }: {
      assetPath: string | null | undefined;
    }): void => {
      const scriptHref = this.assetLoader.resolveScriptHref(assetPath);
      if (!scriptHref) {
        return;
      }

      scriptHrefs.add(scriptHref);
    };
    const pushExportedComponente = (
      entry: ILandingIndexExportDTO["componentes"][number]
    ): void => {
      if (exportedIds.has(entry.id_componente)) {
        return;
      }
      exportedComponentes.push(entry);
      exportedIds.add(entry.id_componente);
    };

    const renderComponente = async (
      componentId: number,
      ancestors: Set<number>
    ): Promise<string> => {
      if (ancestors.has(componentId)) {
        warnings.push(
          `Se detectó una relación cíclica de componentes en #${componentId}. Se omitió el render recursivo.`
        );
        return "";
      }

      const componente = componentesById.get(componentId);
      if (!componente) {
        warnings.push(
          `No se encontró el componente #${componentId} para renderizar la jerarquía de hijos.`
        );
        return "";
      }

      let tipoVariacion = variationCache.get(componente.id_tipo_variacion);
      if (tipoVariacion === undefined) {
        tipoVariacion = await this.tipoVariacionRepository.getById(componente.id_tipo_variacion);
        variationCache.set(componente.id_tipo_variacion, tipoVariacion);
      }

      if (!tipoVariacion) {
        warnings.push(
          `No se encontró la variación ${componente.id_tipo_variacion} del componente #${componente.id_componente}.`
        );
        pushExportedComponente({
          id_componente: componente.id_componente,
          nombre: componente.nombre,
          id_tipo_variacion: componente.id_tipo_variacion,
          nombre_tipo_variacion: null,
          html_path: null,
          css_href: null,
          selector_hijos: normalizeSelector(componente.selector_hijos),
          rendered: false,
        });
        return "";
      }

      const cssHref = this.assetLoader.resolveStylesheetHref(tipoVariacion.css_url);
      await appendStylesheetToInline({
        assetPath: tipoVariacion.css_url,
        sourceLabel: `variation ${tipoVariacion.id_tipo_variacion} (${tipoVariacion.nombre ?? "sin nombre"}) / componente #${componente.id_componente}`,
      });

      let templateContent: string | null = null;
      if (tipoVariacion.html) {
        const cacheKey = tipoVariacion.html;
        if (templateCache.has(cacheKey)) {
          templateContent = templateCache.get(cacheKey) ?? null;
        } else {
          try {
            templateContent = await this.assetLoader.loadHtmlTemplate(tipoVariacion.html);
            templateCache.set(cacheKey, templateContent);
          } catch (error) {
            const message =
              error instanceof Error ? error.message : "No se pudo cargar el HTML de la variación.";
            warnings.push(
              `No se pudo cargar el HTML de la variación ${tipoVariacion.nombre} para el componente #${componente.id_componente}: ${message}`
            );
          }
        }
      } else {
        warnings.push(
          `La variación ${tipoVariacion.nombre} del componente #${componente.id_componente} no tiene ruta HTML configurada.`
        );
      }

      const rendered = Boolean(templateContent);
      pushExportedComponente({
        id_componente: componente.id_componente,
        nombre: componente.nombre,
        id_tipo_variacion: componente.id_tipo_variacion,
        nombre_tipo_variacion: tipoVariacion.nombre ?? null,
        html_path: tipoVariacion.html ?? null,
        css_href: cssHref,
        selector_hijos: normalizeSelector(componente.selector_hijos),
        rendered,
      });

      const childIds = childrenByParent.get(componente.id_componente) || [];
      const nextAncestors = new Set(ancestors);
      nextAncestors.add(componente.id_componente);
      const childMarkupParts: string[] = [];
      for (const childId of childIds) {
        const childMarkup = await renderComponente(childId, nextAncestors);
        if (childMarkup.trim()) {
          childMarkupParts.push(childMarkup);
        }
      }
      const childMarkup = childMarkupParts.join("\n");

      if (!templateContent) {
        return childMarkup;
      }

      let renderedTemplate = templateContent;
      if (typeof componente.id_plan === "number" && componente.id_plan > 0) {
        let plan = planCache.get(componente.id_plan);
        if (plan === undefined) {
          plan = await this.planRepository.getById(componente.id_plan);
          planCache.set(componente.id_plan, plan);
        }

        if (plan) {
          usedPlansById.set(
            componente.id_plan,
            plan as unknown as Record<string, unknown>
          );
        } else {
          warnings.push(
            `No se encontró el plan #${componente.id_plan} del componente #${componente.id_componente}.`
          );
        }
      }

      let elementos = elementosByComponenteCache.get(componente.id_componente);
      if (!elementos) {
        elementos = await this.elementoComponenteRepository.getByComponente(
          componente.id_componente
        );
        elementosByComponenteCache.set(componente.id_componente, elementos);
      }

      for (const elemento of Array.isArray(elementos) ? elementos : []) {
        await appendStylesheetToInline({
          assetPath: elemento.css_url,
          sourceLabel: `elemento ${elemento.id_elemento} (${elemento.nombre ?? "sin nombre"}) / componente #${componente.id_componente}`,
        });
        appendScriptHref({
          assetPath: elemento.js_url,
        });
      }

      const contenedorElementos = (Array.isArray(elementos) ? elementos : []).filter(
        (elemento) =>
          tipoElementoNameById.get(elemento.id_tipo_elemento) === "contenedor" &&
          normalizeContainerToken(elemento.selector)
      );

      let renderedHtml = renderedTemplate;
      let inserted = false;
      if (childMarkup.trim() && contenedorElementos.length) {
        for (const contenedor of contenedorElementos) {
          const token = normalizeContainerToken(contenedor.selector);
          const injectedByToken = injectByPlaceholderToken({
            baseHtml: renderedHtml,
            placeholderToken: token,
            childMarkup,
          });
          if (injectedByToken.insertedByToken) {
            renderedHtml = injectedByToken.html;
            inserted = true;
            break;
          }
        }
      }

      if (childMarkup.trim() && contenedorElementos.length && !inserted) {
        const tokens = contenedorElementos
          .map((elemento) => normalizeContainerToken(elemento.selector))
          .filter(Boolean)
          .join(", ");
        warnings.push(
          `No se encontró el placeholder ${tokens} en el componente #${componente.id_componente}. Se aplica fallback de inserción.`
        );
      }

      const selectorHijos = normalizeSelector(componente.selector_hijos);
      let injected = { html: renderedHtml, insertedBySelector: inserted };
      if (!inserted) {
        injected = injectChildMarkup({
          baseHtml: renderedHtml,
          selector: selectorHijos,
          childMarkup,
        });
      }

      if (childMarkup.trim() && selectorHijos && !injected.insertedBySelector) {
        warnings.push(
          `No se encontró el selector ${selectorHijos} en el componente #${componente.id_componente}. Los hijos se agregaron al final.`
        );
      }

      renderInstanceSeq += 1;
      return `
        <section
          id="landing-export-component-${escapeHtml(componente.id_componente)}-${escapeHtml(renderInstanceSeq)}"
          class="landing-export-component landing-export-component--${escapeHtml(componente.id_componente)} landing-export-variation--${escapeHtml(componente.id_tipo_variacion)}"
          data-component-id="${escapeHtml(componente.id_componente)}"
          data-variation-id="${escapeHtml(componente.id_tipo_variacion)}"
          ${typeof componente.id_plan === "number" && componente.id_plan > 0
            ? `data-plan-id="${escapeHtml(componente.id_plan)}"`
            : ""}
        >
          <!-- componente: #${escapeHtml(componente.id_componente)} - ${escapeHtml(componente.nombre)} -->
          ${injected.html}
        </section>
      `;
    };

    for (const rootId of rootComponentIds) {
      const rootMarkup = await renderComponente(rootId, new Set<number>());
      if (rootMarkup.trim()) {
        renderedComponentsMarkup.push(rootMarkup);
      }
    }

    const title = buildLandingTitle(landing.URL, landing.id_landing);
    const inlineCss = inlineCssParts.join("\n\n");
    const renderedComponents = renderedComponentsMarkup.join("\n");
    const plansDataJson = JSON.stringify(
      Object.fromEntries(
        Array.from(usedPlansById.entries()).map(([planId, plan]) => [
          String(planId),
          plan,
        ])
      ),
      null,
      2
    );
    const planesGeneratorJs = buildPlanesGeneratorScript();
    const savedFiles = await this.outputWriter.writeExport({
      indexHtml: buildLinkedIndexDocument({
        title,
        stylesheetHref: "./global.css",
        scriptHrefs: Array.from(scriptHrefs),
        warnings,
        renderedComponentsMarkup: renderedComponents,
      }),
      globalCss: buildGlobalStylesheet(inlineCss),
      plansDataJson,
      planesGeneratorJs,
    });

    return {
      landing,
      componentes: exportedComponentes,
      css_hrefs: Array.from(cssHrefs),
      warnings,
      saved_files: savedFiles,
      index_html: buildIndexDocument({
        title,
        inlineCss,
        warnings,
        renderedComponentsMarkup: renderedComponents,
      }),
    };
  }
}
