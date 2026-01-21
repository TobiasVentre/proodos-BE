import { AppError } from "@proodos/application/Errors/AppError";

describe("AppError", () => {
  it("should set code, status, details, and message", () => {
    // Arrange
    const code = "CUSTOM_ERROR";
    const message = "Algo falló";
    const status = 418;
    const details = { field: "valor" };

    // Act
    const error = new AppError(code, message, status, details);

    // Assert
    expect(error).toBeInstanceOf(Error);
    expect(error.name).toBe("AppError");
    expect(error.code).toBe(code);
    expect(error.message).toBe(message);
    expect(error.status).toBe(status);
    expect(error.details).toEqual(details);
  });
});
