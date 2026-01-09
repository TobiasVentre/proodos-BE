import { Router } from "express";

export const LandingPageController = Router();

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
LandingPageController.get("/:id", async (req, res) => {
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
LandingPageController.post("/", async (req, res) => {
  res.json({ message: "POST /landings OK" });
});
