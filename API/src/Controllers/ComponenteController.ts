import { Router } from "express";
import { ILogger } from "@proodos/application/Interfaces/ILogger";
import {
  ICreateComponenteUseCase,
  IDeleteComponenteUseCase,
  IGetAllComponentesUseCase,
  IGetComponenteByIdUseCase,
  IGetComponenteTreeUseCase,
  IPatchComponenteUseCase,
  ISoftDeleteComponenteUseCase,
  IUpdateComponenteUseCase,
  IAssignComponenteHijoUseCase,
  IUnassignComponenteHijoUseCase,
  IAssignPlanToComponenteUseCase,
  IUnassignPlanFromComponenteUseCase,
} from "@proodos/application/Ports/IComponenteUseCases";
import { IGetLandingsByComponenteUseCase } from "@proodos/application/Ports/ILandingComponenteUseCases";
import {
  ensureFound,
  ensureRequiredFields,
  logControllerError,
  parsePositiveInteger,
  respondCreated,
  respondNoContent,
  respondOk,
} from "./ControllerHelpers";

type ComponenteControllerDeps = {
  logger: ILogger;
  createComponenteService: ICreateComponenteUseCase;
  getAllComponentesService: IGetAllComponentesUseCase;
  getComponenteByIdService: IGetComponenteByIdUseCase;
  updateComponenteService: IUpdateComponenteUseCase;
  patchComponenteService: IPatchComponenteUseCase;
  deleteComponenteService: IDeleteComponenteUseCase;
  softDeleteComponenteService: ISoftDeleteComponenteUseCase;
  getLandingsByComponenteService: IGetLandingsByComponenteUseCase;
  assignComponenteHijoService: IAssignComponenteHijoUseCase;
  unassignComponenteHijoService: IUnassignComponenteHijoUseCase;
  getComponenteTreeService: IGetComponenteTreeUseCase;
  assignPlanToComponenteService: IAssignPlanToComponenteUseCase;
  unassignPlanFromComponenteService: IUnassignPlanFromComponenteUseCase;
};

export const createComponenteController = ({
  logger,
  createComponenteService,
  getAllComponentesService,
  getComponenteByIdService,
  updateComponenteService,
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
    logger.info("[Controller] GET /componentes");

    try {
      const result = await getAllComponentesService.execute();

      return respondOk(res, result);
    } catch (error: any) {
      logControllerError(logger, "GET /componentes", error);
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
    logger.info(`[Controller] GET /componentes/${req.params.id}`);

    try {
      const id = parsePositiveInteger(req.params.id);
      const result = ensureFound(
        await getComponenteByIdService.execute(id),
        "Componente not found"
      );

      return respondOk(res, result);
    } catch (error: any) {
      logControllerError(logger, `GET /componentes/${req.params.id}`, error);
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
    logger.info("[Controller] POST /componentes");

    try {
      ensureRequiredFields(req.body, [
        "id_tipo_componente",
        "id_plan",
        "id_tipo_variacion",
        "nombre",
      ]);
      const result = await createComponenteService.execute(req.body);

      return respondOk(res, result);
    } catch (error: any) {
      logControllerError(logger, "POST /componentes", error);
      return next(error);
    }
  });

  /**
   * @openapi
   * /api/componentes/{id}:
   *   put:
   *     tags:
   *       - Componentes
   *     summary: Actualiza un componente
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
   *               - id_tipo_componente
   *               - id_plan
   *               - id_tipo_variacion
   *               - nombre
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
   *         description: Componente actualizado
   *       400:
   *         description: Request invalida
   *       404:
   *         description: Componente no encontrado
   */
  componenteController.put("/:id", async (req, res, next) => {
    logger.info(`[Controller] PUT /componentes/${req.params.id}`);

    try {
      const id_componente = parsePositiveInteger(req.params.id);
      ensureRequiredFields(req.body, [
        "id_tipo_componente",
        "id_plan",
        "id_tipo_variacion",
        "nombre",
      ]);
      const { id_tipo_componente, id_plan, id_tipo_variacion, nombre } =
        req.body || {};
      const result = await updateComponenteService.execute({
        id_componente,
        id_tipo_componente,
        id_plan,
        id_tipo_variacion,
        nombre,
      });

      return respondOk(res, result);
    } catch (error: any) {
      logControllerError(logger, `PUT /componentes/${req.params.id}`, error);
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
    logger.info(`[Controller] PATCH /componentes/${req.params.id}`);

    try {
      const id = parsePositiveInteger(req.params.id);
      const result = await patchComponenteService.execute(id, req.body);

      return respondOk(res, result);
    } catch (error: any) {
      logControllerError(logger, `PATCH /componentes/${req.params.id}`, error);
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
    logger.info(`[Controller] PATCH /componentes/${req.params.id}/baja`);

    try {
      const id = parsePositiveInteger(req.params.id);
      await softDeleteComponenteService.execute(id);
      return respondOk(res);
    } catch (error: any) {
      logControllerError(logger, `PATCH /componentes/${req.params.id}/baja`, error);
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
    logger.info(`[Controller] POST /componentes/${req.params.id}/plan`);

    try {
      const id_componente = parsePositiveInteger(req.params.id);
      const id_plan = parsePositiveInteger(req.body?.id_plan, "id_plan");
      const result = await assignPlanToComponenteService.execute(id_componente, id_plan);

      return respondOk(res, result);
    } catch (error: any) {
      logControllerError(logger, `POST /componentes/${req.params.id}/plan`, error);
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
    logger.info(`[Controller] DELETE /componentes/${req.params.id}/plan`);

    try {
      const id_componente = parsePositiveInteger(req.params.id);
      const result = await unassignPlanFromComponenteService.execute(id_componente);

      return respondOk(res, result);
    } catch (error: any) {
      logControllerError(logger, `DELETE /componentes/${req.params.id}/plan`, error);
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
    logger.info(`[Controller] GET /componentes/${req.params.id}/landings`);

    try {
      const id = parsePositiveInteger(req.params.id);
      const result = await getLandingsByComponenteService.execute(id);

      return respondOk(res, result);
    } catch (error: any) {
      logControllerError(logger, `GET /componentes/${req.params.id}/landings`, error);
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
    logger.info(`[Controller] GET /componentes/${req.params.id}/arbol`);

    try {
      const id = parsePositiveInteger(req.params.id);
      const result = await getComponenteTreeService.execute(id);

      return respondOk(res, result);
    } catch (error: any) {
      logControllerError(logger, `GET /componentes/${req.params.id}/arbol`, error);
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
    logger.info(`[Controller] POST /componentes/${req.params.id}/hijos`);

    try {
      const id_padre = parsePositiveInteger(req.params.id);
      const id_hijo = parsePositiveInteger(req.body?.id_hijo, "id_hijo");
      const result = await assignComponenteHijoService.execute({
        id_padre,
        id_hijo,
      });

      return result.created
        ? respondCreated(res, result.data)
        : respondOk(res, result.data);
    } catch (error: any) {
      logControllerError(logger, `POST /componentes/${req.params.id}/hijos`, error);
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
    logger.info(
      `[Controller] DELETE /componentes/${req.params.id}/hijos/${req.params.id_hijo}`
    );

    try {
      const id_padre = parsePositiveInteger(req.params.id);
      const id_hijo = parsePositiveInteger(req.params.id_hijo, "id_hijo");
      await unassignComponenteHijoService.execute({
        id_padre,
        id_hijo,
      });
      return respondNoContent(res);
    } catch (error: any) {
      logControllerError(
        logger,
        `DELETE /componentes/${req.params.id}/hijos/${req.params.id_hijo}`,
        error
      );
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
    logger.info(`[Controller] DELETE /componentes/${req.params.id}`);

    try {
      const id = parsePositiveInteger(req.params.id);
      await deleteComponenteService.execute(id);
      return respondNoContent(res);
    } catch (error: any) {
      logControllerError(logger, `DELETE /componentes/${req.params.id}`, error);
      return next(error);
    }
  });

  return componenteController;
};
