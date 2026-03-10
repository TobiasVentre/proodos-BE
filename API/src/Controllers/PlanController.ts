import { Router } from "express";
import { ILogger } from "@proodos/application/Interfaces/ILogger";
import {
  ICreatePlanUseCase,
  ICreatePlanFullUseCase,
  IDeletePlanUseCase,
  IGetAllPlansUseCase,
  IGetPlanByIdUseCase,
  IPatchPlanUseCase,
  IPatchPlanFullUseCase,
  IUpdatePlanFullUseCase,
  IUpdatePlanUseCase,
} from "@proodos/application/Ports/IPlanUseCases";
import { IGetComponentesByPlanUseCase } from "@proodos/application/Ports/IComponenteUseCases";
import {
  ensureFound,
  ensureRequiredFields,
  logControllerError,
  parsePositiveInteger,
  respondNoContent,
  respondOk,
} from "./ControllerHelpers";

const requiredPlanFields = [
  "nombre",
  "capacidad",
  "capacidad_anterior",
  "precio_full_price",
  "precio_oferta",
  "aumento",
  "precio_sin_iva",
];

type PlanControllerDeps = {
  logger: ILogger;
  createPlanService: ICreatePlanUseCase;
  createPlanFullService: ICreatePlanFullUseCase;
  getAllPlansService: IGetAllPlansUseCase;
  getPlanByIdService: IGetPlanByIdUseCase;
  patchPlanService: IPatchPlanUseCase;
  patchPlanFullService: IPatchPlanFullUseCase;
  updatePlanFullService: IUpdatePlanFullUseCase;
  updatePlanService: IUpdatePlanUseCase;
  deletePlanService: IDeletePlanUseCase;
  getComponentesByPlanService: IGetComponentesByPlanUseCase;
};

export const createPlanController = ({
  logger,
  createPlanService,
  createPlanFullService,
  getAllPlansService,
  getPlanByIdService,
  patchPlanService,
  patchPlanFullService,
  updatePlanFullService,
  updatePlanService,
  deletePlanService,
  getComponentesByPlanService,
}: PlanControllerDeps) => {
  const planController = Router();

  /**
   * @openapi
   * /api/planes:
   *   get:
   *     tags:
   *       - Planes
   *     summary: Obtiene todos los planes
   *     responses:
   *       200:
   *         description: Lista de planes
  */
  planController.get("/", async (req, res, next) => {
    logger.info("[Controller] GET /planes");

    try {
      const result = await getAllPlansService.execute();

      return respondOk(res, result);
    } catch (error) {
      logControllerError(logger, "GET /planes", error);
      return next(error);
    }
  });

  /**
   * @openapi
   * /api/planes/{id}:
   *   get:
   *     tags:
   *       - Planes
   *     summary: Obtiene un plan por ID
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Plan encontrado
   *       400:
   *         description: ID inválido
   *       404:
   *         description: No encontrado
  */
  planController.get("/:id", async (req, res, next) => {
    logger.info(`[Controller] GET /planes/${req.params.id}`);

    try {
      const id = parsePositiveInteger(req.params.id);
      const result = ensureFound(
        await getPlanByIdService.execute(id),
        "Plan not found"
      );

      return respondOk(res, result);
    } catch (error) {
      logControllerError(logger, `GET /planes/${req.params.id}`, error);
      return next(error);
    }
  });

  /**
   * @openapi
   * /api/planes/{id}/componentes:
   *   get:
   *     tags:
   *       - Planes
   *     summary: Obtiene los componentes asociados a un plan
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Lista de componentes
   *       400:
   *         description: ID inválido
   *       404:
   *         description: Plan no encontrado
  */
  planController.get("/:id/componentes", async (req, res, next) => {
    logger.info(`[Controller] GET /planes/${req.params.id}/componentes`);

    try {
      const id = parsePositiveInteger(req.params.id);
      ensureFound(await getPlanByIdService.execute(id), "Plan not found");
      const result = await getComponentesByPlanService.execute(id);

      return respondOk(res, result);
    } catch (error) {
      logControllerError(logger, `GET /planes/${req.params.id}/componentes`, error);
      return next(error);
    }
  });

  /**
   * @openapi
   * /api/planes:
   *   post:
   *     tags:
   *       - Planes
   *     summary: Crea un nuevo plan
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/ICreatePlanDTO'
   *     responses:
   *       200:
   *         description: Plan creado
  */
  planController.post("/", async (req, res, next) => {
    logger.info("[Controller] POST /planes");

    try {
      ensureRequiredFields(req.body, requiredPlanFields);
      const result = await createPlanService.execute(req.body);

      return respondOk(res, result);
    } catch (error) {
      logControllerError(logger, "POST /planes", error);
      return next(error);
    }
  });

  /**
   * @openapi
   * /api/planes/full:
   *   post:
   *     tags:
   *       - Planes
   *     summary: Crea un nuevo plan con todos los campos opcionales
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/ICreatePlanFullDTO'
   *     responses:
   *       200:
   *         description: Plan creado
  */
  planController.post("/full", async (req, res, next) => {
    logger.info("[Controller] POST /planes/full");

    try {
      const result = await createPlanFullService.execute(req.body);

      return respondOk(res, result);
    } catch (error) {
      logControllerError(logger, "POST /planes/full", error);
      return next(error);
    }
  });

  /**
   * @openapi
   * /api/planes/{id}:
   *   patch:
   *     tags:
   *       - Planes
   *     summary: Actualiza parcialmente un plan
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
   *             $ref: '#/components/schemas/IPatchPlanDTO'
   *     responses:
   *       200:
   *         description: Plan actualizado parcialmente
   *       400:
   *         description: Request inválida
   *       404:
   *         description: No encontrado
  */
  planController.patch("/:id", async (req, res, next) => {
    logger.info(`[Controller] PATCH /planes/${req.params.id}`);

    try {
      const id = parsePositiveInteger(req.params.id);
      const result = await patchPlanService.execute(id, req.body);

      return respondOk(res, result);
    } catch (error: any) {
      logControllerError(logger, `PATCH /planes/${req.params.id}`, error);
      return next(error);
    }
  });

  /**
   * @openapi
   * /api/planes/{id}/full:
   *   patch:
   *     tags:
   *       - Planes
   *     summary: Actualiza parcialmente un plan con todos los campos
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
   *             $ref: '#/components/schemas/IPatchPlanFullDTO'
   *     responses:
   *       200:
   *         description: Plan actualizado parcialmente
   *       400:
   *         description: Request inválida
   *       404:
   *         description: No encontrado
  */
  planController.patch("/:id/full", async (req, res, next) => {
    logger.info(`[Controller] PATCH /planes/${req.params.id}/full`);

    try {
      const id = parsePositiveInteger(req.params.id);
      const result = await patchPlanFullService.execute(id, req.body);

      return respondOk(res, result);
    } catch (error: any) {
      logControllerError(logger, `PATCH /planes/${req.params.id}/full`, error);
      return next(error);
    }
  });

  /**
   * @openapi
   * /api/planes/{id}/full:
   *   put:
   *     tags:
   *       - Planes
   *     summary: Reemplaza el contrato full del plan; campos omitidos se persisten como null
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
   *             $ref: '#/components/schemas/IUpdatePlanFullDTO'
   *     responses:
   *       200:
   *         description: Plan full actualizado
   *       400:
   *         description: Request invalida
   *       404:
   *         description: No encontrado
  */
  planController.put("/:id/full", async (req, res, next) => {
    logger.info(`[Controller] PUT /planes/${req.params.id}/full`);

    try {
      const id = parsePositiveInteger(req.params.id);
      const result = await updatePlanFullService.execute({
        id_plan: id,
        ...(req.body ?? {}),
      });

      return respondOk(res, result);
    } catch (error: any) {
      logControllerError(logger, `PUT /planes/${req.params.id}/full`, error);
      return next(error);
    }
  });

  /**
   * @openapi
   * /api/planes/{id}:
   *   put:
   *     tags:
   *       - Planes
   *     summary: Actualiza un plan
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
   *             $ref: '#/components/schemas/IUpdatePlanDTO'
   *     responses:
   *       200:
   *         description: Plan actualizado
   *       400:
   *         description: Request inválida
   *       404:
   *         description: No encontrado
  */
  planController.put("/:id", async (req, res, next) => {
    logger.info(`[Controller] PUT /planes/${req.params.id}`);

    try {
      const id = parsePositiveInteger(req.params.id);
      ensureRequiredFields(req.body, requiredPlanFields);
      const result = await updatePlanService.execute({
        id_plan: id,
        ...req.body,
      });

      return respondOk(res, result);
    } catch (error: any) {
      logControllerError(logger, `PUT /planes/${req.params.id}`, error);
      return next(error);
    }
  });

  /**
   * @openapi
   * /api/planes/{id}:
   *   delete:
   *     tags:
   *       - Planes
   *     summary: Elimina un plan
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
  */
  planController.delete("/:id", async (req, res, next) => {
    logger.info(`[Controller] DELETE /planes/${req.params.id}`);

    try {
      const id = parsePositiveInteger(req.params.id);
      await deletePlanService.execute(id);
      return respondNoContent(res);
    } catch (error: any) {
      logControllerError(logger, `DELETE /planes/${req.params.id}`, error);
      return next(error);
    }
  });

  return planController;
};
