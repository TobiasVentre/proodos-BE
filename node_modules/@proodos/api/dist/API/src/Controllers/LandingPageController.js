"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LandingPageController = void 0;
const express_1 = require("express");
exports.LandingPageController = (0, express_1.Router)();
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
exports.LandingPageController.get("/:id", async (req, res) => {
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
exports.LandingPageController.post("/", async (req, res) => {
    res.json({ message: "POST /landings OK" });
});
