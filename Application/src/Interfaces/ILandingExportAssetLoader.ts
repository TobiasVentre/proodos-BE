export interface ILandingExportAssetLoader {
  loadHtmlTemplate(assetPath: string): Promise<string>;
  loadStylesheet(assetPath: string): Promise<string>;
  resolveStylesheetHref(assetPath: string | null | undefined): string | null;
  resolveScriptHref(assetPath: string | null | undefined): string | null;
}
