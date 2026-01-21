import { LandingPageMapper } from "@proodos/application/Services/LandingPage/LandingPageMapper";
import { ValidationError } from "@proodos/application/Errors/ValidationError";
import { CreateLandingPageCommand } from "@proodos/application/DTOs/LandingPage/CreateLandingPageCommand";
import { UpdateLandingPageCommand } from "@proodos/application/DTOs/LandingPage/UpdateLandingPageCommand";

describe("LandingPageMapper", () => {
  it("should map CreateLandingPageCommand to entity with trimmed fields", () => {
    // Arrange
    const dto: CreateLandingPageCommand = {
      URL: "  https://example.com  ",
      estado: "  ACTIVO ",
      segmento: "  retail ",
    };

    // Act
    const entity = LandingPageMapper.fromCreateCommand(dto);

    // Assert
    expect(entity).toMatchObject({
      URL: "https://example.com",
      estado: "ACTIVO",
      segmento: "retail",
    });
  });

  it("should throw ValidationError for invalid update data", () => {
    // Arrange
    const dto: UpdateLandingPageCommand = {
      id_landing: 0,
      URL: "",
      estado: " ",
      segmento: "segmento",
    };

    // Act
    const action = () => LandingPageMapper.fromUpdateCommand(dto);

    // Assert
    expect(action).toThrow(ValidationError);
  });
});
