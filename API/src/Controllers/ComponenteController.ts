import { Router } from "express";
import {
  CreateComponenteUseCase,
  DeleteComponenteUseCase,
  GetAllComponentesUseCase,
  GetComponenteByIdUseCase,
  GetComponenteTreeUseCase,
  PatchComponenteUseCase,
  SoftDeleteComponenteUseCase,
  AssignComponenteHijoUseCase,
  UnassignComponenteHijoUseCase,
  AssignPlanToComponenteUseCase,
  UnassignPlanFromComponenteUseCase,
} from "@proodos/application/Ports/ComponenteUseCases";
import { GetLandingsByComponenteUseCase } from "@proodos/application/Ports/LandingComponenteUseCases";
import { buildNotFoundError, buildValidationError } from "./ControllerErrors";

type ComponenteControllerDeps = {
  createComponenteService: CreateComponenteUseCase;
  getAllComponentesService: GetAllComponentesUseCase;
  getComponenteByIdService: GetComponenteByIdUseCase;
  patchComponenteService: PatchComponenteUseCase;
  deleteComponenteService: DeleteComponenteUseCase;
  softDeleteComponenteService: SoftDeleteComponenteUseCase;
  getLandingsByComponenteService: GetLandingsByComponenteUseCase;
  assignComponenteHijoService: AssignComponenteHijoUseCase;
  unassignComponenteHijoService: UnassignComponenteHijoUseCase;
  getComponenteTreeService: GetComponenteTreeUseCase;
  assignPlanToComponenteService: AssignPlanToComponenteUseCase;
  unassignPlanFromComponenteService: UnassignPlanFromComponenteUseCase;
};

export const createComponenteController = ({
  createComponenteService,
  getAllComponentesService,
  getComponenteByIdService,
  patchComponenteService,
  deleteComponenteService,
  softDeleteComponenteService,
  getLandingsByComponenteService,
  assignComponenteHijoService,
  unassignComponenteHijoService,
  getComponenteTreeService,
  assignPlanToComponenteService,
  unassignPlanFromComponenteService,
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
   *                       estado:
   *                         type: string
   *                       fecha_baja:
   *                         type: string
   *                         format: date-time
   *                         nullable: true
   *                       plan:
   *                         type: object
   *                         nullable: true
   *                         additionalProperties: true
   */
  componenteController.get("/", async (req, res, next) => {
    console.log("[Controller] GET /componentes");

    try {
      const result = await getAllComponentesService.execute();

      return res.status(200).json({
        message: "OK",
        data: result
      });
    } catch (error: any) {
      console.log("[Controller] ERROR:", error);
      return next(error);
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
   *                     estado:
   *                       type: string
   *                     fecha_baja:
   *                       type: string
   *                       format: date-time
   *                       nullable: true
   *                     plan:
   *                       type: object
   *                       nullable: true
   *                       additionalProperties: true
   *       400:
   *         description: ID inválido
   *       404:
   *         description: No encontrado
   */
  componenteController.get("/:id", async (req, res, next) => {
    console.log(`[Controller] GET /componentes/${req.params.id}`);

    try {
      const id = Number(req.params.id);
      if (Number.isNaN(id) || id <= 0) {
        return next(buildValidationError("Invalid id"));
      }

      const result = await getComponenteByIdService.execute(id);

      if (!result) {
        return next(buildNotFoundError("Componente not found"));
      }

      return res.status(200).json({
        message: "OK",
        data: result
      });
    } catch (error: any) {
      console.log("[Controller] ERROR:", error);
      return next(error);
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
  componenteController.post("/", async (req, res, next) => {
    console.log("[Controller] POST /componentes");

    try {
      const result = await createComponenteService.execute(req.body);

      return res.status(200).json({
        message: "OK",
        data: result
      });
    } catch (error: any) {
      console.log("[Controller] ERROR:", error);
      return next(error);
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
  componenteController.patch("/:id", async (req, res, next) => {
    console.log(`[Controller] PATCH /componentes/${req.params.id}`);

    try {
      const id = Number(req.params.id);
      if (Number.isNaN(id) || id <= 0) {
        return next(buildValidationError("Invalid id"));
      }

      const result = await patchComponenteService.execute(id, req.body);

      return res.status(200).json({
        message: "OK",
        data: result,
      });
    } catch (error: any) {
      console.log("[Controller] ERROR:", error);
      return next(error);
    }
  });

  /**
   * @openapi
   * /api/componentes/{id}/baja:
   *   patch:
   *     tags:
   *       - Componentes
   *     summary: Da de baja (soft delete) un componente
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Componente dado de baja
   *       400:
   *         description: ID inválido
   *       404:
   *         description: No encontrado
   *       409:
   *         description: Componente asignado a una landing
   */
  componenteController.patch("/:id/baja", async (req, res, next) => {
    console.log(`[Controller] PATCH /componentes/${req.params.id}/baja`);

    const id = Number(req.params.id);
    if (Number.isNaN(id) || id <= 0) {
      return next(buildValidationError("Invalid id"));
    }

    try {
      await softDeleteComponenteService.execute(id);
      return res.status(200).json({ message: "OK" });
    } catch (error: any) {
      console.log("[Controller] ERROR:", error);
      return next(error);
    }
  });

  /**
   * @openapi
   * /api/componentes/{id}/plan:
   *   post:
   *     tags:
   *       - Componentes
   *     summary: Asocia un plan a un componente
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
   *               - id_plan
   *             properties:
   *               id_plan:
   *                 type: integer
   *     responses:
   *       200:
   *         description: Plan asociado
   *       400:
   *         description: Request inválida
   *       404:
   *         description: Componente o plan inexistente
   */
  componenteController.post("/:id/plan", async (req, res, next) => {
    console.log(`[Controller] POST /componentes/${req.params.id}/plan`);

    const id_componente = Number(req.params.id);
    const id_plan = Number(req.body?.id_plan);

    if (Number.isNaN(id_componente) || id_componente <= 0) {
      return next(buildValidationError("Invalid id"));
    }
    if (Number.isNaN(id_plan) || id_plan <= 0) {
      return next(buildValidationError("Invalid id_plan"));
    }

    try {
      const result = await assignPlanToComponenteService.execute(id_componente, id_plan);

      return res.status(200).json({
        message: "OK",
        data: result,
      });
    } catch (error: any) {
      console.log("[Controller] ERROR:", error);
      return next(error);
    }
  });

  /**
   * @openapi
   * /api/componentes/{id}/plan:
   *   delete:
   *     tags:
   *       - Componentes
   *     summary: Desasocia un plan de un componente
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Plan desasociado
   *       400:
   *         description: Request inválida
   *       404:
   *         description: Componente inexistente
   */
  componenteController.delete("/:id/plan", async (req, res, next) => {
    console.log(`[Controller] DELETE /componentes/${req.params.id}/plan`);

    const id_componente = Number(req.params.id);
    if (Number.isNaN(id_componente) || id_componente <= 0) {
      return next(buildValidationError("Invalid id"));
    }

    try {
      const result = await unassignPlanFromComponenteService.execute(id_componente);

      return res.status(200).json({
        message: "OK",
        data: result,
      });
    } catch (error: any) {
      console.log("[Controller] ERROR:", error);
      return next(error);
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
  componenteController.get("/:id/landings", async (req, res, next) => {
    console.log(`[Controller] GET /componentes/${req.params.id}/landings`);

    const id = Number(req.params.id);
    if (Number.isNaN(id) || id <= 0) {
      return next(buildValidationError("Invalid id"));
    }

    try {
      const result = await getLandingsByComponenteService.execute(id);

      return res.status(200).json({
        message: "OK",
        data: result,
      });
    } catch (error: any) {
      console.log("[Controller] ERROR:", error);
      return next(error);
    }
  });

  /**
   * @openapi
   * /api/componentes/{id}/arbol:
   *   get:
   *     tags:
   *       - Componentes
   *     summary: Obtiene el árbol jerárquico de un componente
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Árbol de componentes
   *       400:
   *         description: ID inválido
   *       404:
   *         description: No encontrado
   */
  componenteController.get("/:id/arbol", async (req, res, next) => {
    console.log(`[Controller] GET /componentes/${req.params.id}/arbol`);

    const id = Number(req.params.id);
    if (Number.isNaN(id) || id <= 0) {
      return next(buildValidationError("Invalid id"));
    }

    try {
      const result = await getComponenteTreeService.execute(id);

      return res.status(200).json({
        message: "OK",
        data: result,
      });
    } catch (error: any) {
      console.log("[Controller] ERROR:", error);
      return next(error);
    }
  });

  /**
   * @openapi
   * /api/componentes/{id}/hijos:
   *   post:
   *     tags:
   *       - Componentes
   *     summary: Asocia un componente hijo a un componente padre
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
   *               - id_hijo
   *             properties:
   *               id_hijo:
   *                 type: integer
   *                 example: 10
   *     responses:
   *       200:
   *         description: Asociación ya existente o creada (idempotente)
   *       201:
   *         description: Asociación creada
   *       400:
   *         description: Request inválida
   *       404:
   *         description: Componente inexistente
   */
  componenteController.post("/:id/hijos", async (req, res, next) => {
    console.log(`[Controller] POST /componentes/${req.params.id}/hijos`);

    const id_padre = Number(req.params.id);
    const id_hijo = Number(req.body?.id_hijo);

    if (Number.isNaN(id_padre) || id_padre <= 0) {
      return next(buildValidationError("Invalid id"));
    }
    if (Number.isNaN(id_hijo) || id_hijo <= 0) {
      return next(buildValidationError("Invalid id_hijo"));
    }

    try {
      const result = await assignComponenteHijoService.execute(id_padre, id_hijo);

      return res.status(result.created ? 201 : 200).json({ message: "OK" });
    } catch (error: any) {
      console.log("[Controller] ERROR:", error);
      return next(error);
    }
  });

  /**
   * @openapi
   * /api/componentes/{id}/hijos/{id_hijo}:
   *   delete:
   *     tags:
   *       - Componentes
   *     summary: Elimina la asociación padre-hijo entre componentes
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         schema:
   *           type: integer
   *       - name: id_hijo
   *         in: path
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       204:
   *         description: Desasociado
   *       400:
   *         description: Request inválida
   */
  componenteController.delete("/:id/hijos/:id_hijo", async (req, res, next) => {
    console.log(
      `[Controller] DELETE /componentes/${req.params.id}/hijos/${req.params.id_hijo}`
    );

    const id_padre = Number(req.params.id);
    const id_hijo = Number(req.params.id_hijo);

    if (Number.isNaN(id_padre) || id_padre <= 0) {
      return next(buildValidationError("Invalid id"));
    }
    if (Number.isNaN(id_hijo) || id_hijo <= 0) {
      return next(buildValidationError("Invalid id_hijo"));
    }

    try {
      await unassignComponenteHijoService.execute(id_padre, id_hijo);
      return res.status(204).send();
    } catch (error: any) {
      console.log("[Controller] ERROR:", error);
      return next(error);
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
  componenteController.delete("/:id", async (req, res, next) => {
    console.log(`[Controller] DELETE /componentes/${req.params.id}`);

    const id = Number(req.params.id);
    if (Number.isNaN(id) || id <= 0) {
      return next(buildValidationError("Invalid id"));
    }

    try {
      await deleteComponenteService.execute(id);
      return res.status(204).send();
    } catch (error: any) {
      console.log("[Controller] ERROR:", error);
      return next(error);
    }
  });

  return componenteController;
};
