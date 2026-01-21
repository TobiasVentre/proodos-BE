import { ConflictError } from "@proodos/application/Errors/ConflictError";

describe("ConflictError", () => {
  it("should set code, status, name, and details", () => {
    // Arrange
    const message = "Conflicto";
    const details = { reason: "duplicado" };

    // Act
    const error = new ConflictError(message, details);

    // Assert
    expect(error).toBeInstanceOf(Error);
    expect(error.name).toBe("ConflictError");
    expect(error.code).toBe("CONFLICT");
    expect(error.status).toBe(409);
    expect(error.message).toBe(message);
    expect(error.details).toEqual(details);
  });
});
