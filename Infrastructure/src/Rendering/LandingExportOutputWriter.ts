import fs from "fs/promises";
import path from "path";
import {
  ILandingExportOutputWriter,
  ILandingExportSavedFiles,
} from "@proodos/application/Interfaces/ILandingExportOutputWriter";
import { ILogger } from "@proodos/application/Interfaces/ILogger";

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

const resolveOutputDir = (workspaceRoot: string): string => {
  const configuredDir = String(process.env.LANDING_EXPORT_OUTPUT_DIR ?? "").trim();
  return configuredDir
    ? path.resolve(configuredDir)
    : path.resolve(workspaceRoot, "landing-export-output");
};

export class LandingExportOutputWriter implements ILandingExportOutputWriter {
  private readonly workspaceRoot: string;
  private readonly outputDir: string;

  constructor(private readonly logger: ILogger) {
    this.workspaceRoot = findWorkspaceRoot(process.cwd());
    this.outputDir = resolveOutputDir(this.workspaceRoot);
  }

  async writeExport(params: {
    indexHtml: string;
    globalCss: string;
    plansDataJson: string;
    planesGeneratorJs: string;
  }): Promise<ILandingExportSavedFiles> {
    const indexFilePath = path.resolve(this.outputDir, "index.html");
    const globalCssFilePath = path.resolve(this.outputDir, "global.css");
    const plansDataFilePath = path.resolve(this.outputDir, "plans-data.json");
    const planesGeneratorFilePath = path.resolve(this.outputDir, "planesGenerator.js");

    this.logger.info("[Infrastructure] LandingExportOutputWriter.writeExport()", {
      outputDir: this.outputDir,
      indexFilePath,
      globalCssFilePath,
      plansDataFilePath,
      planesGeneratorFilePath,
    });

    await fs.mkdir(this.outputDir, { recursive: true });
    await fs.writeFile(indexFilePath, params.indexHtml, "utf8");
    await fs.writeFile(globalCssFilePath, params.globalCss, "utf8");
    await fs.writeFile(plansDataFilePath, params.plansDataJson, "utf8");
    await fs.writeFile(planesGeneratorFilePath, params.planesGeneratorJs, "utf8");

    return {
      output_dir: this.outputDir,
      index_file_path: indexFilePath,
      global_css_file_path: globalCssFilePath,
      plans_data_file_path: plansDataFilePath,
      planes_generator_file_path: planesGeneratorFilePath,
    };
  }
}
