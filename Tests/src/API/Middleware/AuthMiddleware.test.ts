import type { NextFunction, Request, Response } from "express";
import { AppError } from "@proodos/application/Errors/AppError";

const mockVerify = jest.fn();

jest.mock("jsonwebtoken", () => ({
  verify: (...args: unknown[]) => mockVerify(...args),
}));

import {
  authenticateJWT,
  getAdminRoles,
  requireAnyRole,
} from "@proodos/api/Middleware/auth";

type IRequestWithUser = Partial<Request> & {
  header: Request["header"];
  user?: { roles?: string[]; sub?: string };
};

const createRequest = (authorization?: string, user?: { roles?: string[]; sub?: string }): IRequestWithUser => ({
  header: ((name: string) => (name.toLowerCase() === "authorization" ? authorization : undefined)) as Request["header"],
  user,
});

describe("authenticateJWT", () => {
  const originalJwtSecret = process.env.JWT_SECRET;

  beforeEach(() => {
    process.env.JWT_SECRET = "shared-secret";
    mockVerify.mockReset();
  });

  afterAll(() => {
    if (originalJwtSecret === undefined) {
      delete process.env.JWT_SECRET;
      return;
    }

    process.env.JWT_SECRET = originalJwtSecret;
  });

  it("should attach the decoded payload to req.user", () => {
    const req = createRequest("Bearer signed-token");
    const next = jest.fn();
    mockVerify.mockReturnValue({ sub: "jdoe", roles: ["admin"] });

    authenticateJWT(req as Request, {} as Response, next as NextFunction);

    expect(mockVerify).toHaveBeenCalledWith("signed-token", "shared-secret");
    expect(req.user).toEqual({ sub: "jdoe", roles: ["admin"] });
    expect(next).toHaveBeenCalledWith();
  });

  it("should reject missing Authorization header", () => {
    const next = jest.fn();

    authenticateJWT(createRequest() as Request, {} as Response, next as NextFunction);

    const error = next.mock.calls[0][0] as AppError;
    expect(error).toBeInstanceOf(AppError);
    expect(error.code).toBe("AUTH_REQUIRED");
    expect(error.status).toBe(401);
  });

  it("should reject invalid bearer format", () => {
    const next = jest.fn();

    authenticateJWT(createRequest("Basic token") as Request, {} as Response, next as NextFunction);

    const error = next.mock.calls[0][0] as AppError;
    expect(error).toBeInstanceOf(AppError);
    expect(error.code).toBe("INVALID_AUTHORIZATION");
    expect(error.status).toBe(401);
  });

  it("should reject invalid or expired tokens", () => {
    const next = jest.fn();
    mockVerify.mockImplementation(() => {
      throw new Error("invalid token");
    });

    authenticateJWT(createRequest("Bearer invalid-token") as Request, {} as Response, next as NextFunction);

    const error = next.mock.calls[0][0] as AppError;
    expect(error).toBeInstanceOf(AppError);
    expect(error.code).toBe("INVALID_TOKEN");
    expect(error.status).toBe(401);
  });
});

describe("requireAnyRole", () => {
  it("should allow requests with at least one allowed role", () => {
    const next = jest.fn();
    const middleware = requireAnyRole(["Admin"]);

    middleware(
      createRequest("Bearer signed-token", { roles: ["editor", "admin"] }) as Request,
      {} as Response,
      next as NextFunction
    );

    expect(next).toHaveBeenCalledWith();
  });

  it("should reject requests without an allowed role", () => {
    const next = jest.fn();
    const middleware = requireAnyRole(["admin"]);

    middleware(
      createRequest("Bearer signed-token", { roles: ["viewer"] }) as Request,
      {} as Response,
      next as NextFunction
    );

    const error = next.mock.calls[0][0] as AppError;
    expect(error).toBeInstanceOf(AppError);
    expect(error.code).toBe("FORBIDDEN");
    expect(error.status).toBe(403);
  });
});

describe("getAdminRoles", () => {
  const originalAdminRoles = process.env.ADMIN_ROLES;

  afterEach(() => {
    if (originalAdminRoles === undefined) {
      delete process.env.ADMIN_ROLES;
      return;
    }

    process.env.ADMIN_ROLES = originalAdminRoles;
  });

  it("should default to admin", () => {
    delete process.env.ADMIN_ROLES;

    expect(getAdminRoles()).toEqual(["admin"]);
  });

  it("should normalize ADMIN_ROLES from env", () => {
    process.env.ADMIN_ROLES = " Admin, manager ,";

    expect(getAdminRoles()).toEqual(["admin", "manager"]);
  });
});
