import { Router } from "express";
import {
  CreateComponenteUseCase,
  DeleteComponenteUseCase,
  GetAllComponentesUseCase,
  GetComponenteByIdUseCase,
  PatchComponenteUseCase,
} from "@proodos/application/Ports/ComponenteUseCases";
import { GetLandingsByComponenteUseCase } from "@proodos/application/Ports/LandingComponenteUseCases";
import { handleControllerError, respondValidationError } from "./ControllerErrors";

type ComponenteControllerDeps = {
  createComponenteService: CreateComponenteUseCase;
  getAllComponentesService: GetAllComponentesUseCase;
  getComponenteByIdService: GetComponenteByIdUseCase;
  patchComponenteService: PatchComponenteUseCase;
  deleteComponenteService: DeleteComponenteUseCase;
  getLandingsByComponenteService: GetLandingsByComponenteUseCase;
};

export const createComponenteController = ({
  createComponenteService,
  getAllComponentesService,
  getComponenteByIdService,
  patchComponenteService,
  deleteComponenteService,
  getLandingsByComponenteService,
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
    } catch (error: any) {
      console.log("[Controller] ERROR:", error);
      return handleControllerError(res, error);
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
        return respondValidationError(res, "Invalid id");
      }

      const result = await getComponenteByIdService.execute(id);

      if (!result) {
        return res.status(404).json({ error: "Not found" });
      }

      return res.status(200).json({
        message: "OK",
        data: result
      });
    } catch (error: any) {
      console.log("[Controller] ERROR:", error);
      return handleControllerError(res, error);
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
    } catch (error: any) {
      console.log("[Controller] ERROR:", error);
      return handleControllerError(res, error);
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
        return respondValidationError(res, "Invalid id");
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
        return respondValidationError(res, "No fields provided");
      }

      return handleControllerError(res, error);
    }
  });

  /**
   * @openapi
   * /api/componentes/{id}/landings:
   *   get:
   *     tags:
   *       - Componentes
   *     summary: Lista las landings asociadas a un componente
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Lista de asociaciones landing-componente
   *       400:
   *         description: ID inválido
   */
  componenteController.get("/:id/landings", async (req, res) => {
    console.log(`[Controller] GET /componentes/${req.params.id}/landings`);

    const id = Number(req.params.id);
    if (Number.isNaN(id) || id <= 0) {
      return respondValidationError(res, "Invalid id");
    }

    try {
      const result = await getLandingsByComponenteService.execute(id);

      return res.status(200).json({
        message: "OK",
        data: result,
      });
    } catch (error: any) {
      console.log("[Controller] ERROR:", error);
      return handleControllerError(res, error);
    }
  });

  /**
   * @openapi
   * /api/componentes/{id}:
   *   delete:
   *     tags:
   *       - Componentes
   *     summary: Elimina un componente si no está asignado a una landing
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       204:
   *         description: Eliminado
   *       400:
   *         description: ID inválido
   *       404:
   *         description: No encontrado
   *       409:
   *         description: Componente asignado a una landing
   */
  componenteController.delete("/:id", async (req, res) => {
    console.log(`[Controller] DELETE /componentes/${req.params.id}`);

    const id = Number(req.params.id);
    if (Number.isNaN(id) || id <= 0) {
      return respondValidationError(res, "Invalid id");
    }

    try {
      await deleteComponenteService.execute(id);
      return res.status(204).send();
    } catch (error: any) {
      console.log("[Controller] ERROR:", error);

      if (error?.message === "COMPONENTE_NOT_FOUND") {
        return res.status(404).json({ error: "Not found" });
      }

      if (error?.message === "COMPONENTE_ASSIGNED") {
        return res.status(409).json({ error: "Componente assigned to landing" });
      }

      return handleControllerError(res, error);
    }
  });

  return componenteController;
};
