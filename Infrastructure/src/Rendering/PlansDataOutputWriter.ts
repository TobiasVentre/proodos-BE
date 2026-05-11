import fs from "fs/promises";
import path from "path";
import { ILogger } from "@proodos/application/Interfaces/ILogger";
import {
  IPlansDataOutputWriter,
  IPlansDataSavedFile,
} from "@proodos/application/Interfaces/IPlansDataOutputWriter";

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
  const configuredDir = String(process.env.PLANS_EXPORT_OUTPUT_DIR ?? "").trim();
  return configuredDir
    ? path.resolve(configuredDir)
    : path.resolve(workspaceRoot, "plans-export-output");
};

export class PlansDataOutputWriter implements IPlansDataOutputWriter {
  private readonly workspaceRoot: string;
  private readonly outputDir: string;

  constructor(private readonly logger: ILogger) {
    this.workspaceRoot = findWorkspaceRoot(process.cwd());
    this.outputDir = resolveOutputDir(this.workspaceRoot);
  }

  async writePlansDataJson(plansDataJson: string): Promise<IPlansDataSavedFile> {
    const plansDataFilePath = this.getPlansDataFilePath();

    this.logger.info("[Infrastructure] PlansDataOutputWriter.writePlansDataJson()", {
      outputDir: this.outputDir,
      plansDataFilePath,
    });

    await fs.mkdir(this.outputDir, { recursive: true });
    await fs.writeFile(plansDataFilePath, plansDataJson, "utf8");

    return {
      output_dir: this.outputDir,
      plans_data_file_path: plansDataFilePath,
    };
  }

  getPlansDataFilePath(): string {
    return path.resolve(this.outputDir, "plans-data.json");
  }
}
