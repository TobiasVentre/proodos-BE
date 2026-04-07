import { LandingPage } from "@proodos/domain/Entities/LandingPage";
import { ILandingExportSavedFiles } from "../../Interfaces/ILandingExportOutputWriter";

export interface ILandingIndexExportComponenteDTO {
  id_componente: number;
  nombre: string;
  id_tipo_variacion: number;
  nombre_tipo_variacion: string | null;
  html_path: string | null;
  css_href: string | null;
  selector_hijos: string | null;
  rendered: boolean;
}

export interface ILandingIndexExportDTO {
  landing: LandingPage;
  componentes: ILandingIndexExportComponenteDTO[];
  css_hrefs: string[];
  warnings: string[];
  index_html: string;
  saved_files?: ILandingExportSavedFiles;
}
