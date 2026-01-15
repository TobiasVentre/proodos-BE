import { Router } from "express";
import {
  CreateLandingPageUseCase,
  GetAllLandingPagesUseCase,
  GetLandingPageByIdUseCase,
} from "@proodos/application/Ports/LandingPageUseCases";
import { AssignLandingComponenteUseCase } from "@proodos/application/Ports/LandingComponenteUseCases";

type LandingPageControllerDeps = {
  createLandingPageService: CreateLandingPageUseCase;
  getLandingPageByIdService: GetLandingPageByIdUseCase;
  getAllLandingPagesService: GetAllLandingPagesUseCase;
  assignLandingComponenteService: AssignLandingComponenteUseCase;
};

export const createLandingPageController = ({
  createLandingPageService,
  getLandingPageByIdService,
  getAllLandingPagesService,
  assignLandingComponenteService,
}: LandingPageControllerDeps) => {
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
  console.log("[Controller] GET /landings");

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
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la landing page
 */
  landingPageController.get("/:id", async (req, res) => {
  console.log(`[Controller] GET /landings/${req.params.id}`);

  const landingId = Number(req.params.id);
  if (Number.isNaN(landingId) || landingId <= 0) {
    return res.status(400).json({ error: "Invalid id" });
  }

  try {
    const result = await getLandingPageByIdService.execute(landingId);

    if (!result) {
      return res.status(404).json({ error: "LandingPage not found" });
    }

    return res.json({
      message: "OK",
      data: result,
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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - URL
 *               - estado
 *               - segmento
 *             properties:
 *               URL:
 *                 type: string
 *                 example: "https://www.movistar.com.ar/landing/oferta"
 *               estado:
 *                 type: string
 *                 example: "ACTIVA"
 *               segmento:
 *                 type: string
 *                 example: "HOGAR"
 *     responses:
 *       200:
 *         description: Landing creada
 *       400:
 *         description: Request inválida
 */
  landingPageController.post("/", async (req, res) => {
  console.log("[Controller] POST /landings");
  console.log("[Controller] Body:", req.body);

  const { URL, estado, segmento } = req.body || {};

  // Validación mínima
  if (!URL || !estado || !segmento) {
    return res.status(400).json({
      error: "Missing required fields",
      required: ["URL", "estado", "segmento"],
    });
  }

  try {
    const result = await createLandingPageService.execute(req.body);

    return res.json({
      message: "OK",
      data: result,
    });
  } catch (error) {
    console.log("[Controller] ERROR:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
  });

/**
 * @openapi
 * /api/landings/{id}/componentes:
 *   post:
 *     tags:
 *       - Landing Pages
 *     summary: Asocia un componente a una landing
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id_componente
 *             properties:
 *               id_componente:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Asociación ya existente o creada (idempotente)
 *       201:
 *         description: Asociación creada
 *       400:
 *         description: Request inválida
 *       404:
 *         description: Landing o componente inexistente
 */
  landingPageController.post("/:id/componentes", async (req, res) => {
  console.log(`[Controller] POST /landings/${req.params.id}/componentes`);

  const id_landing = Number(req.params.id);
  const id_componente = Number(req.body?.id_componente);

  if (Number.isNaN(id_landing) || id_landing <= 0) {
    return res.status(400).json({ error: "Invalid landing id" });
  }
  if (Number.isNaN(id_componente) || id_componente <= 0) {
    return res.status(400).json({ error: "Invalid id_componente" });
  }

  try {
    const result = await assignLandingComponenteService.execute(id_landing, id_componente);

    return res.status(result.existed ? 200 : 201).json({ message: "OK", data: result.data });
  } catch (error: any) {
    if (error?.message === "LANDING_NOT_FOUND") return res.status(404).json({ error: "Landing not found" });
    if (error?.message === "COMPONENTE_NOT_FOUND") return res.status(404).json({ error: "Componente not found" });

    console.log("[Controller] ERROR:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
  });

  return landingPageController;
};
