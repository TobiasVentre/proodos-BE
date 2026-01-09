import { Router } from "express";
import { CreateComponenteService } from "@proodos/application/Services/Componente/CreateComponenteService";
import { ILogger } from "@proodos/application/Interfaces/ILogger";
import { ComponenteRepository } from "@proodos/infrastructure/Persistence/Repositories/ComponenteRepository";

export const createComponenteController = (logger: ILogger) => {
  const componenteRepository = new ComponenteRepository(logger);
  const createComponenteService = new CreateComponenteService(componenteRepository);
  const componenteController = Router();

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
  componenteController.get("/", async (req, res) => {
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
  componenteController.get("/:id", async (req, res) => {
    res.json({ message: `GET /componentes/${req.params.id} OK` });
  });

  /**
   * @openapi
   * /api/componentes:
   *   post:
   *     tags:
   *       - Componentes
   *     summary: Crea un nuevo componente
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               id_tipo_componente:
   *                 type: integer
   *                 example: 1
   *               id_plan:
   *                 type: integer
   *                 example: 2
   *               id_tipo_variacion:
   *                 type: integer
   *                 example: 3
   *               nombre:
   *                 type: string
   *                 example: "Nombre del componente"
   *     responses:
   *       200:
   *         description: Componente creado
   */
  componenteController.post("/", async (req, res) => {
    console.log("[Controller] POST /componentes");

    try {
      const result = await createComponenteService.execute(req.body);

      return res.json({
        message: "OK",
        data: result
      });

    } catch (error) {
      console.log("[Controller] ERROR:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  return componenteController;
};
