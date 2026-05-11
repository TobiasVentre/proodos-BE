export interface IPlansDataSavedFile {
  output_dir: string;
  plans_data_file_path: string;
}

export interface IPlansDataOutputWriter {
  writePlansDataJson(plansDataJson: string): Promise<IPlansDataSavedFile>;
  getPlansDataFilePath(): string;
}
