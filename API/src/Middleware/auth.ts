import { NextFunction, Request, Response } from "express";
import { AppError } from "@proodos/application/Errors/AppError";

interface IJwtModule {
  verify(token: string, secret: string): string | object;
}

export interface IAuthPayload {
  sub?: string;
  roles?: string[];
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

const getJwtSecret = (): string => {
  const secret = process.env.JWT_SECRET?.trim();
  if (!secret) {
    throw new AppError(
      "JWT_SECRET_NOT_CONFIGURED",
      "JWT_SECRET no configurado.",
      500
    );
  }

  return secret;
};

const extractBearerToken = (authorizationHeader?: string): string => {
  if (!authorizationHeader) {
    throw new AppError("AUTH_REQUIRED", "Authorization requerido.", 401);
  }

  const [scheme, token] = authorizationHeader.split(" ");
  if (scheme !== "Bearer" || !token) {
    throw new AppError("INVALID_AUTHORIZATION", "Authorization invalido.", 401);
  }

  return token;
};

const normalizeRoles = (roles: string[]): string[] =>
  roles.map((role) => role.trim().toLowerCase()).filter((role) => role.length > 0);

export const authenticateJWT = (req: Request, _res: Response, next: NextFunction) => {
  try {
    const token = extractBearerToken(req.header("Authorization") ?? undefined);
    const payload = jwt.verify(token, getJwtSecret());

    if (!payload || typeof payload !== "object") {
      throw new AppError("INVALID_TOKEN", "Token invalido o expirado.", 401);
    }

    req.user = payload as IAuthPayload;
    return next();
  } catch (error) {
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

    const userRoles = normalizeRoles(req.user?.roles ?? []);
    if (normalizedAllowedRoles.some((role) => userRoles.includes(role))) {
      return next();
    }

    return next(
      new AppError("FORBIDDEN", "No autorizado.", 403, {
        allowedRoles: normalizedAllowedRoles,
      })
    );
  };
