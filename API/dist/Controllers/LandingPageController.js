"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LandingPageController = void 0;
const express_1 = require("express");
const CreateLandingPageService_1 = require("@proodos/application/Services/LandingPage/CreateLandingPageService");
const GetLandingPageByIdService_1 = require("@proodos/application/Services/LandingPage/GetLandingPageByIdService");
const GetAllLandingPagesService_1 = require("@proodos/application/Services/LandingPage/GetAllLandingPagesService");
const LandingPageRepository_1 = require("@proodos/infrastructure/Persistence/Repositories/LandingPageRepository");
exports.LandingPageController = (0, express_1.Router)();
const landingPageRepository = new LandingPageRepository_1.LandingPageRepository();
const createLandingPageService = new CreateLandingPageService_1.CreateLandingPageService(landingPageRepository);
const getLandingPageByIdService = new GetLandingPageByIdService_1.GetLandingPageByIdService(landingPageRepository);
const getAllLandingPagesService = new GetAllLandingPagesService_1.GetAllLandingPagesService(landingPageRepository);
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
exports.LandingPageController.get("/", async (req, res) => {
    try {
        const result = await getAllLandingPagesService.execute();
        return res.json({
            message: "OK",
            data: result
        });
    }
    catch (error) {
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
exports.LandingPageController.get("/:id", async (req, res) => {
    try {
        const landingId = Number(req.params.id);
        const result = await getLandingPageByIdService.execute(landingId);
        return res.json({
            message: "OK",
            data: result
        });
    }
    catch (error) {
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
exports.LandingPageController.post("/", async (req, res) => {
    console.log("[Controller] POST /landings");
    try {
        const result = await createLandingPageService.execute(req.body);
        return res.json({
            message: "OK",
            data: result
        });
    }
    catch (error) {
        console.log("[Controller] ERROR:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});
