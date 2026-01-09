import { Router } from "express";
import { CreateLandingPageService } from "@proodos/application/Services/LandingPage/CreateLandingPageService";
import { GetLandingPageByIdService } from "@proodos/application/Services/LandingPage/GetLandingPageByIdService";
import { GetAllLandingPagesService } from "@proodos/application/Services/LandingPage/GetAllLandingPagesService";
import { LandingPageRepository } from "@proodos/infrastructure/Persistence/Repositories/LandingPageRepository";

export const createLandingPageController = () => {
  const landingPageController = Router();

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
  landingPageController.get("/", async (req, res) => {
    res.json({ message: "GET /landings OK" });
  });

  /**
   * @openapi
   * /api/landings/{id}:
   *   get:
   *     tags:
   *       - Landing Pages
   *     summary: Obtiene landing page por ID
   */
  landingPageController.get("/:id", async (req, res) => {
    res.json({ message: `GET /landings/${req.params.id} OK` });
  });

  /**
   * @openapi
   * /api/landings:
   *   post:
   *     tags:
   *       - Landing Pages
   *     summary: Crea una nueva landing page
   */
  landingPageController.post("/", async (req, res) => {
    res.json({ message: "POST /landings OK" });
  });

  return landingPageController;
};
