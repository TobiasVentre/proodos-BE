import { ILogger } from "@proodos/application/Interfaces/ILogger";
import {
  IPlansPublicationClient,
  IPlansPublicationRequest,
  IPlansPublicationResult,
} from "@proodos/application/Interfaces/IPlansPublicationClient";

const resolveBaseUrl = () =>
  String(process.env.PUBLICACION_API_BASE_URL ?? "http://127.0.0.1:3100").trim().replace(
    /\/+$/,
    ""
  );

const readPayload = async (response: Response): Promise<unknown> => {
  const contentType = response.headers.get("content-type") ?? "";
  if (contentType.includes("application/json")) {
    return response.json();
  }

  return response.text();
};

const getErrorMessage = (payload: unknown, status: number) => {
  if (typeof payload === "string" && payload.trim()) {
    return payload;
  }

  if (payload && typeof payload === "object" && "message" in payload) {
    return String((payload as { message: unknown }).message);
  }

  return `El servicio de publicacion respondio con estado ${status}.`;
};

export class PlansPublicationClient implements IPlansPublicationClient {
  private readonly baseUrl: string;

  constructor(private readonly logger: ILogger) {
    this.baseUrl = resolveBaseUrl();
  }

  async publish(params: IPlansPublicationRequest): Promise<IPlansPublicationResult> {
    const url = `${this.baseUrl}/publish`;

    this.logger.info("[Infrastructure] PlansPublicationClient.publish()", {
      url,
      server: params.server,
      destination: params.destination,
      sourcePath: params.sourcePath,
    });

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });

    const payload = await readPayload(response);

    if (!response.ok) {
      throw new Error(getErrorMessage(payload, response.status));
    }

    return {
      status: response.status,
      payload,
    };
  }
}
