import { Router } from "express";
import { ILogger } from "@proodos/application/Interfaces/ILogger";
import {
  ICreateLandingPageUseCase,
  IDeleteLandingPageUseCase,
  IGetAllLandingPagesUseCase,
  IGetLandingPageByIdUseCase,
  IPatchLandingPageUseCase,
  IUpdateLandingPageUseCase,
} from "@proodos/application/Ports/ILandingPageUseCases";
import {
  IAssignLandingComponenteUseCase,
  IGetLandingComponentesUseCase,
  IUnassignLandingComponenteUseCase,
} from "@proodos/application/Ports/ILandingComponenteUseCases";
import {
  ensureFound,
  ensureRequiredFields,
  logControllerError,
  parsePositiveInteger,
  respondCreated,
  respondNoContent,
  respondOk,
} from "./ControllerHelpers";

type LandingPageControllerDeps = {
  logger: ILogger;
  createLandingPageService: ICreateLandingPageUseCase;
  getLandingPageByIdService: IGetLandingPageByIdUseCase;
  getAllLandingPagesService: IGetAllLandingPagesUseCase;
  updateLandingPageService: IUpdateLandingPageUseCase;
  patchLandingPageService: IPatchLandingPageUseCase;
  deleteLandingPageService: IDeleteLandingPageUseCase;
  assignLandingComponenteService: IAssignLandingComponenteUseCase;
  unassignLandingComponenteService: IUnassignLandingComponenteUseCase;
  getLandingComponentesService: IGetLandingComponentesUseCase;
};

export const createLandingPageController = ({
  logger,
  createLandingPageService,
  getLandingPageByIdService,
  getAllLandingPagesService,
  updateLandingPageService,
  patchLandingPageService,
  deleteLandingPageService,
  assignLandingComponenteService,
  unassignLandingComponenteService,
  getLandingComponentesService,
}: LandingPageControllerDeps) => {
  const landingPageController = Router();


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
  landingPageController.get("/", async (req, res, next) => {
  logger.info("[Controller] GET /landings");

  try {
    const result = await getAllLandingPagesService.execute();

    return respondOk(res, result);
  } catch (error) {
    logControllerError(logger, "GET /landings", error);
    return next(error);
  }
  });

/**
 * @openapi
 * /api/landings/{id}:
 *   get:
 *     tags:
 *       - Landing Pages
 *     summary: Obtiene landing page por ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la landing page
 *     responses:
 *       200:
 *         description: Landing encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   $ref: '#/components/schemas/LandingPageDTO'
 *       400:
 *         description: ID inválido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   example: true
 *                 code:
 *                   type: string
 *                   example: VALIDATION_ERROR
 *                 message:
 *                   type: string
 *                   example: Invalid id
 *       404:
 *         description: Landing no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: LandingPage not found
 */
  landingPageController.get("/:id", async (req, res, next) => {
  logger.info(`[Controller] GET /landings/${req.params.id}`);

  try {
    const landingId = parsePositiveInteger(req.params.id);
    const result = ensureFound(
      await getLandingPageByIdService.execute(landingId),
      "Landing not found"
    );

    return respondOk(res, result);
  } catch (error) {
    logControllerError(logger, `GET /landings/${req.params.id}`, error);
    return next(error);
  }
  });

/**
 * @openapi
 * /api/landings:
 *   post:
 *     tags:
 *       - Landing Pages
 *     summary: Crea una nueva landing page
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - URL
 *               - estado
 *               - segmento
 *             properties:
 *               URL:
 *                 type: string
 *                 example: "https://www.movistar.com.ar/landing/oferta"
 *               estado:
 *                 type: string
 *                 example: "ACTIVA"
 *               segmento:
 *                 type: string
 *                 example: "HOGAR"
 *     responses:
 *       200:
 *         description: Landing creada
 *       400:
 *         description: Request inválida
 */
  landingPageController.post("/", async (req, res, next) => {
  logger.info("[Controller] POST /landings", req.body);

  try {
    ensureRequiredFields(req.body, ["URL", "estado", "segmento"]);
    const result = await createLandingPageService.execute(req.body);

    return respondOk(res, result);
  } catch (error) {
    logControllerError(logger, "POST /landings", error);
    return next(error);
  }
  });

/**
 * @openapi
 * /api/landings/{id}:
 *   put:
 *     tags:
 *       - Landing Pages
 *     summary: Actualiza una landing page
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
 *               - URL
 *               - estado
 *               - segmento
 *             properties:
 *               URL:
 *                 type: string
 *               estado:
 *                 type: string
 *               segmento:
 *                 type: string
 *     responses:
 *       200:
 *         description: Landing actualizada
 *       400:
 *         description: Request inválida
 *       404:
 *         description: Landing no encontrada
 */
  landingPageController.put("/:id", async (req, res, next) => {
  logger.info(`[Controller] PUT /landings/${req.params.id}`);

  try {
    const id_landing = parsePositiveInteger(req.params.id);
    ensureRequiredFields(req.body, ["URL", "estado", "segmento"]);
    const { URL, estado, segmento } = req.body || {};
    const result = await updateLandingPageService.execute({
      id_landing,
      URL,
      estado,
      segmento,
    });

    return respondOk(res, result);
  } catch (error: any) {
    logControllerError(logger, `PUT /landings/${req.params.id}`, error);
    return next(error);
  }
  });

/**
 * @openapi
 * /api/landings/{id}:
 *   patch:
 *     tags:
 *       - Landing Pages
 *     summary: Actualiza parcialmente una landing page
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
 *               URL:
 *                 type: string
 *               estado:
 *                 type: string
 *               segmento:
 *                 type: string
 *     responses:
 *       200:
 *         description: Landing actualizada parcialmente
 *       400:
 *         description: Request inválida
 *       404:
 *         description: Landing no encontrada
 */
  landingPageController.patch("/:id", async (req, res, next) => {
  logger.info(`[Controller] PATCH /landings/${req.params.id}`);

  try {
    const id_landing = parsePositiveInteger(req.params.id);
    const result = await patchLandingPageService.execute(id_landing, req.body || {});

    return respondOk(res, result);
  } catch (error: any) {
    logControllerError(logger, `PATCH /landings/${req.params.id}`, error);
    return next(error);
  }
  });

/**
 * @openapi
 * /api/landings/{id}:
 *   delete:
 *     tags:
 *       - Landing Pages
 *     summary: Elimina una landing page
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Eliminada
 *       400:
 *         description: Request inválida
 */
  landingPageController.delete("/:id", async (req, res, next) => {
  logger.info(`[Controller] DELETE /landings/${req.params.id}`);

  try {
    const id_landing = parsePositiveInteger(req.params.id);
    await deleteLandingPageService.execute(id_landing);
    return respondNoContent(res);
  } catch (error: any) {
    logControllerError(logger, `DELETE /landings/${req.params.id}`, error);
    return next(error);
  }
  });

/**
 * @openapi
 * /api/landings/{id}/componentes:
 *   post:
 *     tags:
 *       - Landing Pages
 *     summary: Asocia un componente a una landing
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
 *               - id_componente
 *             properties:
 *               id_componente:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Asociación ya existente o creada (idempotente)
 *       201:
 *         description: Asociación creada
 *       400:
 *         description: Request inválida
 *       404:
 *         description: Landing o componente inexistente
 */
  landingPageController.post("/:id/componentes", async (req, res, next) => {
  logger.info(`[Controller] POST /landings/${req.params.id}/componentes`);

  try {
    const id_landing = parsePositiveInteger(req.params.id, "landing id");
    const id_componente = parsePositiveInteger(
      req.body?.id_componente,
      "id_componente"
    );
    const result = await assignLandingComponenteService.execute({
      id_landing,
      id_componente,
    });

    return result.existed
      ? respondOk(res, result.data)
      : respondCreated(res, result.data);
  } catch (error: any) {
    logControllerError(
      logger,
      `POST /landings/${req.params.id}/componentes`,
      error
    );
    return next(error);
  }
  });

/**
 * @openapi
 * /api/landings/{id}/componentes:
 *   get:
 *     tags:
 *       - Landing Pages
 *     summary: Lista los componentes asociados a una landing
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
  landingPageController.get("/:id/componentes", async (req, res, next) => {
  logger.info(`[Controller] GET /landings/${req.params.id}/componentes`);

  try {
    const id_landing = parsePositiveInteger(req.params.id, "landing id");
    const result = await getLandingComponentesService.execute(id_landing);

    return respondOk(res, result);
  } catch (error) {
    logControllerError(
      logger,
      `GET /landings/${req.params.id}/componentes`,
      error
    );
    return next(error);
  }
  });

/**
 * @openapi
 * /api/landings/{id}/componentes/{id_componente}:
 *   delete:
 *     tags:
 *       - Landing Pages
 *     summary: Desasocia un componente de una landing
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *       - name: id_componente
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
  landingPageController.delete("/:id/componentes/:id_componente", async (req, res, next) => {
  logger.info(
    `[Controller] DELETE /landings/${req.params.id}/componentes/${req.params.id_componente}`
  );

  try {
    const id_landing = parsePositiveInteger(req.params.id, "landing id");
    const id_componente = parsePositiveInteger(
      req.params.id_componente,
      "id_componente"
    );
    await unassignLandingComponenteService.execute({
      id_landing,
      id_componente,
    });
    return respondNoContent(res);
  } catch (error) {
    logControllerError(
      logger,
      `DELETE /landings/${req.params.id}/componentes/${req.params.id_componente}`,
      error
    );
    return next(error);
  }
  });

  return landingPageController;
};
