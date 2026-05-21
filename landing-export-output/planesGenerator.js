(function () {
  const PLACEHOLDER_PATTERN = /\{\s*([A-Za-z0-9_]+)\s*\}/g;
  const CONTAINER_SELECTOR = "div,section,article,li,ul,ol,aside,header,footer,nav,main,a,button";
  const SKIP_TEXT_PARENTS = new Set(["SCRIPT", "STYLE", "NOSCRIPT"]);
  const DEFAULT_PLANS_DATA_PATH = "./plans-data.json";

  const scriptElement =
    document.currentScript ||
    document.querySelector('script[data-plans-src][src$="planesGenerator.js"]') ||
    document.querySelector("script[data-plans-src]");

  const configuredPlansDataPath =
    scriptElement?.getAttribute("data-plans-src")?.trim() || DEFAULT_PLANS_DATA_PATH;

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

  const loadPlansData = async () => {
    const candidatePaths = [configuredPlansDataPath];
    if (configuredPlansDataPath !== DEFAULT_PLANS_DATA_PATH) {
      candidatePaths.push(DEFAULT_PLANS_DATA_PATH);
    }

    for (const plansDataPath of candidatePaths) {
      let response;
      try {
        response = await fetch(plansDataPath, {
          cache: "no-store",
        });
      } catch {
        continue;
      }

      if (!response || !response.ok) {
        continue;
      }

      try {
        const plansData = await response.json();
        if (plansData && typeof plansData === "object") {
          return plansData;
        }
      } catch {
        continue;
      }
    }

    return null;
  };

  const hydratePlans = async () => {
    const plansData = await loadPlansData();

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
})();
