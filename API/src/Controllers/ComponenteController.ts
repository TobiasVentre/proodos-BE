import { Router } from "express";
import {
  CreateComponenteUseCase,
  GetAllComponentesUseCase,
  GetComponenteByIdUseCase,
  PatchComponenteUseCase,
} from "@proodos/application/Ports/ComponenteUseCases";

type ComponenteControllerDeps = {
  createComponenteService: CreateComponenteUseCase;
  getAllComponentesService: GetAllComponentesUseCase;
  getComponenteByIdService: GetComponenteByIdUseCase;
  patchComponenteService: PatchComponenteUseCase;
};

export const createComponenteController = ({
  createComponenteService,
  getAllComponentesService,
  getComponenteByIdService,
  patchComponenteService,
}: ComponenteControllerDeps) => {
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
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: OK
   *                 data:
   *                   type: array
   *                   items:
   *                     type: object
   *                     properties:
   *                       id_componente:
   *                         type: integer
   *                       id_tipo_componente:
   *                         type: integer
   *                       id_plan:
   *                         type: integer
   *                       id_tipo_variacion:
   *                         type: integer
   *                       nombre:
   *                         type: string
   *                       fecha_creacion:
   *                         type: string
   *                         format: date-time
   *                       plan:
   *                         type: object
   *                         nullable: true
   *                         additionalProperties: true
   */
  componenteController.get("/", async (req, res) => {
    console.log("[Controller] GET /componentes");

    try {
      const result = await getAllComponentesService.execute();

      return res.status(200).json({
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
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: OK
   *                 data:
   *                   type: object
   *                   properties:
   *                     id_componente:
   *                       type: integer
   *                     id_tipo_componente:
   *                       type: integer
   *                     id_plan:
   *                       type: integer
   *                     id_tipo_variacion:
   *                       type: integer
   *                     nombre:
   *                       type: string
   *                     fecha_creacion:
   *                       type: string
   *                       format: date-time
   *                     plan:
   *                       type: object
   *                       nullable: true
   *                       additionalProperties: true
   *       400:
   *         description: ID inválido
   *       404:
   *         description: No encontrado
   */
  componenteController.get("/:id", async (req, res) => {
    console.log(`[Controller] GET /componentes/${req.params.id}`);

    try {
      const id = Number(req.params.id);
      if (Number.isNaN(id) || id <= 0) {
        return res.status(400).json({ error: "Invalid id" });
      }

      const result = await getComponenteByIdService.execute(id);

      if (!result) {
        return res.status(404).json({ error: "Not found" });
      }

      return res.status(200).json({
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

      return res.status(200).json({
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
   * /api/componentes/{id}:
   *   patch:
   *     tags:
   *       - Componentes
   *     summary: Actualiza parcialmente un componente (PATCH)
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
   *             properties:
   *               id_tipo_componente:
   *                 type: integer
   *               id_plan:
   *                 type: integer
   *               id_tipo_variacion:
   *                 type: integer
   *               nombre:
   *                 type: string
   *     responses:
   *       200:
   *         description: Componente actualizado parcialmente
   *       400:
   *         description: Request inválida
   *       404:
   *         description: No encontrado
   */
  componenteController.patch("/:id", async (req, res) => {
    console.log(`[Controller] PATCH /componentes/${req.params.id}`);

    try {
      const id = Number(req.params.id);
      if (Number.isNaN(id) || id <= 0) {
        return res.status(400).json({ error: "Invalid id" });
      }

      const result = await patchComponenteService.execute(id, req.body);

      return res.status(200).json({
        message: "OK",
        data: result,
      });
    } catch (error: any) {
      console.log("[Controller] ERROR:", error);

      if (String(error?.message || "").includes("not found")) {
        return res.status(404).json({ error: "Not found" });
      }
      if (String(error?.message || "").includes("No fields provided")) {
        return res.status(400).json({ error: "No fields provided" });
      }

      return res.status(500).json({ error: "Internal server error" });
    }
  });

  return componenteController;
};
