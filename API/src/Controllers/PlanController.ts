import { Request, Router } from "express";
import { AppError } from "@proodos/application/Errors/AppError";
import { ILogger } from "@proodos/application/Interfaces/ILogger";
import {
  ICreatePlanUseCase,
  ICreatePlanFullUseCase,
  IDeletePlanUseCase,
  IGetAllPlansUseCase,
  IGetPlansDataUseCase,
  IGetPlanByIdUseCase,
  IPatchPlanUseCase,
  IPatchPlanFullUseCase,
  IPublishPlansUseCase,
  IUpdatePlanFullUseCase,
  IUpdatePlanUseCase,
} from "@proodos/application/Ports/IPlanUseCases";
import { IPublishPlanChangeDTO } from "@proodos/application/DTOs/Plan/IPublishPlansDTO";
import { IGetComponentesByPlanUseCase } from "@proodos/application/Ports/IComponenteUseCases";
import { canAccessSegment, getAdminRoles, isAdminUser, requireAnyRole } from "../Middleware/auth";
import {
  ensureFound,
  ensureRequiredFields,
  logControllerError,
  parsePositiveInteger,
  respondNoContent,
  respondOk,
} from "./ControllerHelpers";
import { buildValidationError } from "./ControllerErrors";

const planAccessRoles = ["admin", "diseñador"];

const requiredPlanFields = [
  "nombre",
  "capacidad",
  "capacidad_anterior",
  "precio_full_price",
  "precio_oferta",
  "aumento",
  "precio_sin_iva",
];

const publishPlanFieldTypes = {
  segmento: "string",
  producto: "string",
  bonete: "string",
  nombre: "string",
  nombre_plan: "string",
  capacidad: "number",
  capacidad_plan: "string",
  capacidad_anterior: "number",
  precio_full_price: "number",
  precio_oferta: "number",
  tag_1: "string",
  tag_2: "string",
  beneficio_1: "string",
  beneficio_2: "string",
  beneficio_3: "string",
  beneficio_4: "string",
  cta_1: "string",
  link_1: "string",
  cta_2: "string",
  link_2: "string",
  aumento: "number",
  precio_tv_digital: "number",
  precio_tv_max: "number",
  promo_activa: "boolean",
  muestra_desde: "string",
  canales_tv_digital: "string",
  canales_tv_max: "string",
  precio_no_cliente: "number",
  descripcion_oferta: "string",
  comercial_name: "string",
  comercial_id: "string",
  telefono_0800: "string",
  icono_tag_1: "string",
  pre_beneficio_2_titulo: "string",
  pre_beneficio_2_descripcion: "string",
  pre_beneficio_1_titulo: "string",
  pre_beneficio_1_descripcion: "string",
  nombre_plan_tv: "string",
  grilla_canales: "string",
  icono_bonete: "string",
  precio_sin_iva: "number",
} as const;

const parsePublishFieldValue = (
  value: unknown,
  fieldType: "string" | "number" | "boolean",
  fieldName: string
) => {
  if (value === null || value === "") {
    return null;
  }

  if (fieldType === "string") {
    if (typeof value !== "string") {
      throw buildValidationError(`El campo ${fieldName} debe ser string.`);
    }

    return value;
  }

  if (fieldType === "number") {
    const parsed = Number(value);
    if (!Number.isFinite(parsed)) {
      throw buildValidationError(`El campo ${fieldName} debe ser numerico.`);
    }

    return parsed;
  }

  if (typeof value === "boolean") {
    return value;
  }

  if (typeof value === "string") {
    const normalized = value.trim().toLowerCase();
    if (["true", "si", "sí", "1"].includes(normalized)) {
      return true;
    }

    if (["false", "no", "0"].includes(normalized)) {
      return false;
    }
  }

  throw buildValidationError(`El campo ${fieldName} debe ser boolean.`);
};

type PlanControllerDeps = {
  logger: ILogger;
  createPlanService: ICreatePlanUseCase;
  createPlanFullService: ICreatePlanFullUseCase;
  getAllPlansService: IGetAllPlansUseCase;
  getPlansDataService: IGetPlansDataUseCase;
  getPlanByIdService: IGetPlanByIdUseCase;
  patchPlanService: IPatchPlanUseCase;
  patchPlanFullService: IPatchPlanFullUseCase;
  publishPlansService: IPublishPlansUseCase;
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
  getPlansDataService,
  getPlanByIdService,
  patchPlanService,
  patchPlanFullService,
  publishPlansService,
  updatePlanFullService,
  updatePlanService,
  deletePlanService,
  getComponentesByPlanService,
}: PlanControllerDeps) => {
  const planController = Router();
  const requireAdmin = requireAnyRole(getAdminRoles());

  const assertPlanSegmentAccess = async (req: Request, planId: number) => {
    const plan = ensureFound(await getPlanByIdService.execute(planId), "Plan not found");
    if (!canAccessSegment(req.user, plan?.segmento ?? null)) {
      throw new AppError("FORBIDDEN", "No autorizado para operar este segmento.", 403, {
        segment: plan?.segmento ?? null,
      });
    }

    return plan;
  };

  planController.use(requireAnyRole(planAccessRoles));

  const parsePublishPlanChanges = (value: unknown): IPublishPlanChangeDTO[] => {
    if (!Array.isArray(value) || value.length === 0) {
      throw buildValidationError("El campo plans debe ser un array no vacio.");
    }

    return value.map((item, index) => {
      if (typeof item !== "object" || item === null) {
        throw buildValidationError(`El item ${index} de plans es invalido.`);
      }

      const payload = item as Record<string, unknown>;
      const change: IPublishPlanChangeDTO = {
        id_plan: parsePositiveInteger(payload.id_plan, `plans[${index}].id_plan`),
      };

      for (const [field, fieldType] of Object.entries(publishPlanFieldTypes)) {
        if (payload[field] === undefined) {
          continue;
        }

        (change as unknown as Record<string, unknown>)[field] = parsePublishFieldValue(
          payload[field],
          fieldType,
          `plans[${index}].${field}`
        );
      }

      const unknownFields = Object.keys(payload).filter(
        (field) => field !== "id_plan" && !(field in publishPlanFieldTypes)
      );
      if (unknownFields.length > 0) {
        throw buildValidationError(
          `El item ${index} de plans tiene campos no permitidos: ${unknownFields.join(", ")}.`
        );
      }

      if (Object.keys(change).length === 1) {
        throw buildValidationError(
          `El item ${index} de plans no tiene cambios para publicar.`
        );
      }

      return change;
    });
  };

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
      const allowedResult = isAdminUser(req.user)
        ? result
        : result.filter((plan: any) => canAccessSegment(req.user, plan?.segmento ?? null));

      return respondOk(res, allowedResult);
    } catch (error) {
      logControllerError(logger, "GET /planes", error);
      return next(error);
    }
  });

  /**
   * @openapi
   * /api/planes/export-data:
   *   get:
   *     tags:
   *       - Planes
   *     summary: Devuelve el snapshot JSON de todos los planes
   *     responses:
   *       200:
   *         description: Snapshot de planes
   */
  planController.get("/export-data", async (req, res, next) => {
    logger.info("[Controller] GET /planes/export-data");

    try {
      const result = await getPlansDataService.execute();
      const allowedResult = isAdminUser(req.user) || !Array.isArray(result)
        ? result
        : result.filter((plan: any) => canAccessSegment(req.user, plan?.segmento ?? null));

      res.setHeader("Cache-Control", "no-store");
      return res.status(200).json(allowedResult);
    } catch (error) {
      logControllerError(logger, "GET /planes/export-data", error);
      return next(error);
    }
  });

  /**
   * @openapi
   * /api/planes/publish:
   *   post:
   *     tags:
   *       - Planes
   *     summary: Persiste cambios, exporta plans-data.json y lo publica
   *     responses:
   *       200:
   *         description: Publicacion completada
   */
  planController.post("/publish", async (req, res, next) => {
    logger.info("[Controller] POST /planes/publish");

    try {
      const plans = parsePublishPlanChanges((req.body as { plans?: unknown } | null)?.plans);
      for (const plan of plans) {
        await assertPlanSegmentAccess(req, plan.id_plan);
      }
      const result = await publishPlansService.execute(plans);

      return respondOk(res, result);
    } catch (error) {
      logControllerError(logger, "POST /planes/publish", error);
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
      if (!canAccessSegment(req.user, result?.segmento ?? null)) {
        throw new AppError("FORBIDDEN", "No autorizado para operar este segmento.", 403, {
          segment: result?.segmento ?? null,
        });
      }

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
      await assertPlanSegmentAccess(req, id);
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
  planController.post("/", requireAdmin, async (req, res, next) => {
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
  planController.post("/full", requireAdmin, async (req, res, next) => {
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
      await assertPlanSegmentAccess(req, id);
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
      await assertPlanSegmentAccess(req, id);
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
  planController.put("/:id/full", requireAdmin, async (req, res, next) => {
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
  planController.put("/:id", requireAdmin, async (req, res, next) => {
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
  planController.delete("/:id", requireAdmin, async (req, res, next) => {
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
