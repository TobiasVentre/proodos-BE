export interface ILandingExportSavedFiles {
  output_dir: string;
  index_file_path: string;
  global_css_file_path: string;
  plans_data_file_path: string;
  planes_generator_file_path: string;
}

export interface ILandingExportOutputWriter {
  writeExport(params: {
    indexHtml: string;
    globalCss: string;
    plansDataJson: string;
    planesGeneratorJs: string;
  }): Promise<ILandingExportSavedFiles>;
}
