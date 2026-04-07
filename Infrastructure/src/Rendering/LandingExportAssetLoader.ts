import fs from "fs/promises";
import path from "path";
import { ILandingExportAssetLoader } from "@proodos/application/Interfaces/ILandingExportAssetLoader";
import { ILogger } from "@proodos/application/Interfaces/ILogger";

const HTTP_PROTOCOL_PATTERN = /^https?:\/\//i;
const DEFAULT_PUBLIC_ASSET_BASE_PATH = "Proodos-FE/preview-assets";
const LEGACY_PUBLIC_ASSET_BASE_PATH = "preview-assets";

const normalizeAssetPath = (value: string): string =>
  String(value ?? "")
    .trim()
    .replace(/\\/g, "/")
    .replace(/^\/+/, "")
    .replace(/^(?:\.\/)+/, "");

const findWorkspaceRoot = (startDir: string): string => {
  let currentDir = startDir;

  while (true) {
    const pkgPath = path.join(currentDir, "package.json");
    try {
      const pkg = require(pkgPath);
      if (pkg?.workspaces) {
        return currentDir;
      }
    } catch {
      // noop
    }

    const parentDir = path.dirname(currentDir);
    if (parentDir === currentDir) {
      return startDir;
    }

    currentDir = parentDir;
  }
};

const buildLocalAssetCandidates = (workspaceRoot: string): string[] => {
  const configuredRoot = process.env.LANDING_EXPORT_ASSETS_ROOT?.trim();
  const candidates = configuredRoot
    ? [path.resolve(configuredRoot)]
    : [];

  return candidates.concat([
    path.resolve(workspaceRoot, "..", "Proodos-FE", "preview-assets"),
    path.resolve(workspaceRoot, "preview-assets"),
  ]);
};

const buildPublicAssetBasePath = (): string =>
  normalizeAssetPath(process.env.LANDING_EXPORT_ASSETS_BASE_PATH ?? "") ||
  DEFAULT_PUBLIC_ASSET_BASE_PATH;

export class LandingExportAssetLoader implements ILandingExportAssetLoader {
  private readonly workspaceRoot: string;
  private readonly assetRootCandidates: string[];
  private readonly publicAssetBasePath: string;

  constructor(private readonly logger: ILogger) {
    this.workspaceRoot = findWorkspaceRoot(process.cwd());
    this.assetRootCandidates = buildLocalAssetCandidates(this.workspaceRoot);
    this.publicAssetBasePath = buildPublicAssetBasePath();
  }

  async loadHtmlTemplate(assetPath: string): Promise<string> {
    const normalizedPath = normalizeAssetPath(assetPath);
    if (!normalizedPath) {
      throw new Error("La ruta HTML de la variación está vacía.");
    }

    if (HTTP_PROTOCOL_PATTERN.test(normalizedPath)) {
      return this.loadRemoteHtmlTemplate(normalizedPath);
    }

    return this.loadLocalHtmlTemplate(normalizedPath);
  }

  async loadStylesheet(assetPath: string): Promise<string> {
    const normalizedPath = normalizeAssetPath(assetPath);
    if (!normalizedPath) {
      throw new Error("La ruta CSS de la variación está vacía.");
    }

    if (HTTP_PROTOCOL_PATTERN.test(normalizedPath)) {
      return this.loadRemoteStylesheet(normalizedPath);
    }

    return this.loadLocalStylesheet(normalizedPath);
  }

  resolveStylesheetHref(assetPath: string | null | undefined): string | null {
    return this.resolveAssetHref(assetPath);
  }

  resolveScriptHref(assetPath: string | null | undefined): string | null {
    return this.resolveAssetHref(assetPath);
  }

  private resolveAssetHref(assetPath: string | null | undefined): string | null {
    const normalizedPath = normalizeAssetPath(assetPath ?? "");
    if (!normalizedPath) {
      return null;
    }

    if (HTTP_PROTOCOL_PATTERN.test(normalizedPath)) {
      return normalizedPath;
    }

    const publicPath = this.toPublicAssetPath(normalizedPath);

    return `./${publicPath}`;
  }

  private async loadRemoteHtmlTemplate(assetUrl: string): Promise<string> {
    this.logger.info("[Infrastructure] LandingExportAssetLoader.loadRemoteHtmlTemplate()", {
      assetUrl,
    });

    const response = await fetch(assetUrl, {
      headers: { Accept: "text/html, text/plain, */*" },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const contentType = response.headers.get("content-type") || "";
    if (
      contentType &&
      !contentType.includes("text/html") &&
      !contentType.includes("text/plain")
    ) {
      throw new Error("El asset HTML devolvió un content-type no permitido.");
    }

    return await response.text();
  }

  private async loadRemoteStylesheet(assetUrl: string): Promise<string> {
    this.logger.info("[Infrastructure] LandingExportAssetLoader.loadRemoteStylesheet()", {
      assetUrl,
    });

    const response = await fetch(assetUrl, {
      headers: { Accept: "text/css, text/plain, */*" },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const contentType = response.headers.get("content-type") || "";
    if (
      contentType &&
      !contentType.includes("text/css") &&
      !contentType.includes("text/plain")
    ) {
      throw new Error("El asset CSS devolvió un content-type no permitido.");
    }

    return await response.text();
  }

  private async loadLocalHtmlTemplate(normalizedPath: string): Promise<string> {
    const relativePath = this.toRelativeAssetPath(normalizedPath);
    const attemptedPaths: string[] = [];

    for (const assetRoot of this.assetRootCandidates) {
      const absolutePath = path.resolve(assetRoot, relativePath);
      attemptedPaths.push(absolutePath);

      try {
        this.logger.info("[Infrastructure] LandingExportAssetLoader.loadLocalHtmlTemplate()", {
          absolutePath,
        });
        return await fs.readFile(absolutePath, "utf8");
      } catch (error) {
        if ((error as NodeJS.ErrnoException)?.code !== "ENOENT") {
          throw error;
        }
      }
    }

    throw new Error(
      `No se encontró el HTML de la variación. Rutas probadas: ${attemptedPaths.join(", ")}`
    );
  }

  private async loadLocalStylesheet(normalizedPath: string): Promise<string> {
    const relativePath = this.toRelativeAssetPath(normalizedPath);
    const attemptedPaths: string[] = [];

    for (const assetRoot of this.assetRootCandidates) {
      const absolutePath = path.resolve(assetRoot, relativePath);
      attemptedPaths.push(absolutePath);

      try {
        this.logger.info("[Infrastructure] LandingExportAssetLoader.loadLocalStylesheet()", {
          absolutePath,
        });
        return await fs.readFile(absolutePath, "utf8");
      } catch (error) {
        if ((error as NodeJS.ErrnoException)?.code !== "ENOENT") {
          throw error;
        }
      }
    }

    throw new Error(
      `No se encontró el CSS de la variación. Rutas probadas: ${attemptedPaths.join(", ")}`
    );
  }

  private toPublicAssetPath(normalizedPath: string): string {
    if (
      normalizedPath === this.publicAssetBasePath ||
      normalizedPath.startsWith(`${this.publicAssetBasePath}/`)
    ) {
      return normalizedPath;
    }

    if (
      normalizedPath === LEGACY_PUBLIC_ASSET_BASE_PATH ||
      normalizedPath.startsWith(`${LEGACY_PUBLIC_ASSET_BASE_PATH}/`)
    ) {
      const relativePath =
        normalizedPath === LEGACY_PUBLIC_ASSET_BASE_PATH
          ? ""
          : normalizedPath.slice(`${LEGACY_PUBLIC_ASSET_BASE_PATH}/`.length);

      return relativePath
        ? `${this.publicAssetBasePath}/${relativePath}`
        : this.publicAssetBasePath;
    }

    return `${this.publicAssetBasePath}/${normalizedPath}`;
  }

  private toRelativeAssetPath(normalizedPath: string): string {
    if (
      normalizedPath === this.publicAssetBasePath ||
      normalizedPath.startsWith(`${this.publicAssetBasePath}/`)
    ) {
      return normalizedPath === this.publicAssetBasePath
        ? ""
        : normalizedPath.slice(`${this.publicAssetBasePath}/`.length);
    }

    if (
      normalizedPath === LEGACY_PUBLIC_ASSET_BASE_PATH ||
      normalizedPath.startsWith(`${LEGACY_PUBLIC_ASSET_BASE_PATH}/`)
    ) {
      return normalizedPath === LEGACY_PUBLIC_ASSET_BASE_PATH
        ? ""
        : normalizedPath.slice(`${LEGACY_PUBLIC_ASSET_BASE_PATH}/`.length);
    }

    return normalizedPath;
  }
}
