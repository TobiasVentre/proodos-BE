import { NotFoundError } from "@proodos/application/Errors/NotFoundError";

describe("NotFoundError", () => {
  it("should set code, status, name, and details", () => {
    // Arrange
    const message = "No encontrado";
    const details = { id: 4 };

    // Act
    const error = new NotFoundError(message, details);

    // Assert
    expect(error).toBeInstanceOf(Error);
    expect(error.name).toBe("NotFoundError");
    expect(error.code).toBe("NOT_FOUND");
    expect(error.status).toBe(404);
    expect(error.message).toBe(message);
    expect(error.details).toEqual(details);
  });
});
