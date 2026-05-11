export interface IPlansPublicationRequest {
  server: "primary" | "secondary";
  sourcePath: string;
  destination: string;
  overwrite: boolean;
}

export interface IPlansPublicationResult {
  status: number;
  payload: unknown;
}

export interface IPlansPublicationClient {
  publish(params: IPlansPublicationRequest): Promise<IPlansPublicationResult>;
}
