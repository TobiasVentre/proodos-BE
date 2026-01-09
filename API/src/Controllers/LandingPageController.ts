import { Router } from "express";
import { CreateLandingPageService } from "@proodos/application/Services/LandingPage/CreateLandingPageService";
import { GetLandingPageByIdService } from "@proodos/application/Services/LandingPage/GetLandingPageByIdService";
import { GetAllLandingPagesService } from "@proodos/application/Services/LandingPage/GetAllLandingPagesService";
import { LandingPageRepository } from "@proodos/infrastructure/Persistence/Repositories/LandingPageRepository";

export const LandingPageController = Router();

const landingPageRepository = new LandingPageRepository();
const createLandingPageService = new CreateLandingPageService(landingPageRepository);
const getLandingPageByIdService = new GetLandingPageByIdService(landingPageRepository);
const getAllLandingPagesService = new GetAllLandingPagesService(landingPageRepository);

/**
 * @openapi
 * /api/landings:
 *   get:
 *     tags:
 *       - Landing Pages
 *     summary: Obtiene todas las landing pages
 *     responses:
 *       200:
 *         description: Lista de landing pages
 */
LandingPageController.get("/", async (req, res) => {
  try {
    const result = await getAllLandingPagesService.execute();

    return res.json({
      message: "OK",
      data: result
    });
  } catch (error) {
    console.log("[Controller] ERROR:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * @openapi
 * /api/landings/{id}:
 *   get:
 *     tags:
 *       - Landing Pages
 *     summary: Obtiene landing page por ID
 */
LandingPageController.get("/:id", async (req, res) => {
  try {
    const landingId = Number(req.params.id);
    const result = await getLandingPageByIdService.execute(landingId);

    return res.json({
      message: "OK",
      data: result
    });
  } catch (error) {
    console.log("[Controller] ERROR:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * @openapi
 * /api/landings:
 *   post:
 *     tags:
 *       - Landing Pages
 *     summary: Crea una nueva landing page
 */
LandingPageController.post("/", async (req, res) => {
  console.log("[Controller] POST /landings");

  try {
    const result = await createLandingPageService.execute(req.body);

    return res.json({
      message: "OK",
      data: result
    });
  } catch (error) {
    console.log("[Controller] ERROR:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});
