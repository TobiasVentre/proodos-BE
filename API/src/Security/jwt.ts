const HMAC_ALGORITHMS = ["HS256", "HS384", "HS512"] as const;

type SupportedJwtAlgorithm = (typeof HMAC_ALGORITHMS)[number];

export interface AuthTokenPayload {
  sub: string;
  roles: string[];
  token_use: "access";
  iat?: number;
  exp?: number;
}

const isSupportedJwtAlgorithm = (value: string): value is SupportedJwtAlgorithm =>
  HMAC_ALGORITHMS.includes(value as SupportedJwtAlgorithm);

const isNonEmptyString = (value: unknown): value is string =>
  typeof value === "string" && value.trim().length > 0;

const normalizeRoles = (roles: string[]): string[] =>
  Array.from(
    new Set(
      roles
        .map((role) => role.trim().toLowerCase())
        .filter((role) => role.length > 0)
    )
  );

const getRequiredEnv = (name: string): string => {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`${name} no configurado.`);
  }

  return value;
};

export const getAccessTokenSecret = (): string => getRequiredEnv("JWT_SECRET");

export const getJwtIssuer = (): string => getRequiredEnv("JWT_ISSUER");

export const getJwtAudience = (): string => getRequiredEnv("JWT_AUDIENCE");

export const getAccessTokenAlgorithm = (): SupportedJwtAlgorithm => {
  const raw = process.env.JWT_ACCESS_ALGORITHM?.trim().toUpperCase() ?? "HS256";
  if (!isSupportedJwtAlgorithm(raw)) {
    throw new Error(
      `JWT_ACCESS_ALGORITHM invalido. Valores permitidos: ${HMAC_ALGORITHMS.join(", ")}.`
    );
  }

  return raw;
};

export const buildAccessTokenVerifyOptions = (): {
  algorithms: SupportedJwtAlgorithm[];
  issuer: string;
  audience: string;
} => ({
  algorithms: [getAccessTokenAlgorithm()],
  issuer: getJwtIssuer(),
  audience: getJwtAudience(),
});

export const isAuthTokenPayload = (payload: unknown): payload is AuthTokenPayload => {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return false;
  }

  const candidate = payload as Partial<AuthTokenPayload>;
  return (
    isNonEmptyString(candidate.sub) &&
    Array.isArray(candidate.roles) &&
    candidate.roles.length > 0 &&
    candidate.roles.every(isNonEmptyString) &&
    candidate.token_use === "access"
  );
};

export const normalizeAuthTokenPayload = (payload: AuthTokenPayload): AuthTokenPayload => ({
  sub: payload.sub.trim(),
  roles: normalizeRoles(payload.roles),
  token_use: "access",
  iat: payload.iat,
  exp: payload.exp,
});

export const validateJwtConfiguration = (): void => {
  getAccessTokenSecret();
  getJwtIssuer();
  getJwtAudience();
  getAccessTokenAlgorithm();
};
