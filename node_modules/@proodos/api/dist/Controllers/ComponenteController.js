"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComponenteController = void 0;
const express_1 = require("express");
exports.ComponenteController = (0, express_1.Router)();
/**
 * @openapi
 * /api/componentes:
 *   get:
 *     tags:
 *       - Componentes
 *     summary: Obtiene todos los componentes
 *     responses:
 *       200:
 *         description: Lista de componentes
 */
exports.ComponenteController.get("/", async (req, res) => {
    res.json({ message: "GET /componentes OK" });
});
/**
 * @openapi
 * /api/componentes/{id}:
 *   get:
 *     tags:
 *       - Componentes
 *     summary: Obtiene un componente por ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Componente encontrado
 */
exports.ComponenteController.get("/:id", async (req, res) => {
    res.json({ message: `GET /componentes/${req.params.id} OK` });
});
/**
 * @openapi
 * /api/componentes:
 *   post:
 *     tags:
 *       - Componentes
 *     summary: Crea un nuevo componente
 *     responses:
 *       200:
 *         description: Componente creado
 */
exports.ComponenteController.post("/", async (req, res) => {
    res.json({ message: "POST /componentes OK" });
});
