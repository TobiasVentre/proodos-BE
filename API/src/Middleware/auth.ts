import { NextFunction, Request, Response } from "express";
import { AppError } from "@proodos/application/Errors/AppError";
import {
  buildAccessTokenVerifyOptions,
  getAccessTokenSecret,
  isAuthTokenPayload,
  normalizeAuthTokenPayload,
} from "@proodos/api/Security/jwt";

interface IJwtModule {
  verify(
    token: string,
    secret: string,
    options?: {
      algorithms?: string[];
      issuer?: string;
      audience?: string;
    }
  ): string | object;
}

export interface IAuthPayload {
  sub: string;
  roles: string[];
  segments?: string[];
  token_use: "access";
  iat?: number;
  exp?: number;
}

declare global {
  namespace Express {
    interface Request {
      user?: IAuthPayload;
    }
  }
}

const jwt = require("jsonwebtoken") as IJwtModule;

const extractBearerToken = (authorizationHeader?: string): string => {
  if (!authorizationHeader) {
    throw new AppError("AUTH_REQUIRED", "Authorization requerido.", 401);
  }

  const [scheme, token, ...rest] = authorizationHeader.trim().split(/\s+/);
  if (scheme !== "Bearer" || !token || rest.length > 0) {
    throw new AppError("INVALID_AUTHORIZATION", "Authorization invalido.", 401);
  }

  return token;
};

const normalizeRoles = (roles: string[]): string[] =>
  roles.map((role) => role.trim().toLowerCase()).filter((role) => role.length > 0);

export const normalizeSegment = (segment: string): string =>
  segment
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

export const isAdminUser = (user?: IAuthPayload): boolean => {
  const adminRoles = getAdminRoles();
  const roles = normalizeRoles(user?.roles ?? []);
  return adminRoles.some((role) => roles.includes(role));
};

export const hasAnyRole = (user: IAuthPayload | undefined, allowedRoles: string[]): boolean => {
  const normalizedAllowedRoles = normalizeRoles(allowedRoles);
  if (normalizedAllowedRoles.length === 0) {
    return true;
  }

  const roles = normalizeRoles(user?.roles ?? []);
  return normalizedAllowedRoles.some((role) => roles.includes(role));
};

export const canAccessSegment = (user: IAuthPayload | undefined, segment?: string | null): boolean => {
  if (isAdminUser(user)) {
    return true;
  }

  const segments = (user?.segments ?? []).map(normalizeSegment).filter(Boolean);
  if (segments.length === 0) {
    return true;
  }

  const normalizedSegment = normalizeSegment(String(segment ?? ""));
  return Boolean(normalizedSegment) && segments.includes(normalizedSegment);
};

export const authenticateJWT = (req: Request, _res: Response, next: NextFunction) => {
  try {
    const token = extractBearerToken(req.header("Authorization") ?? undefined);
    const verifiedPayload = jwt.verify(
      token,
      getAccessTokenSecret(),
      buildAccessTokenVerifyOptions()
    );

    if (!isAuthTokenPayload(verifiedPayload)) {
      throw new AppError("INVALID_TOKEN", "Token invalido o expirado.", 401);
    }

    req.user = normalizeAuthTokenPayload(verifiedPayload);
    return next();
  } catch (error) {
    if (error instanceof Error && error.message.includes("no configurado")) {
      return next(new AppError("JWT_SECRET_NOT_CONFIGURED", error.message, 500));
    }

    if (error instanceof AppError) {
      return next(error);
    }

    return next(new AppError("INVALID_TOKEN", "Token invalido o expirado.", 401));
  }
};

export const getAdminRoles = (): string[] => {
  const raw = process.env.ADMIN_ROLES || process.env.ADMIN_ROLE;
  if (!raw) {
    return ["admin"];
  }

  return normalizeRoles(raw.split(","));
};

export const requireAnyRole =
  (allowedRoles: string[]) => (req: Request, _res: Response, next: NextFunction) => {
    const normalizedAllowedRoles = normalizeRoles(allowedRoles);
    if (normalizedAllowedRoles.length === 0) {
      return next();
    }

    if (hasAnyRole(req.user, normalizedAllowedRoles)) {
      return next();
    }

    return next(
      new AppError("FORBIDDEN", "No autorizado.", 403, {
        allowedRoles: normalizedAllowedRoles,
      })
    );
  };
