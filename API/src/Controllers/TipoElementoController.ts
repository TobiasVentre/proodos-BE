import { Router } from "express";
import { ILogger } from "@proodos/application/Interfaces/ILogger";
import {
  ICreateTipoElementoUseCase,
  IDeleteTipoElementoUseCase,
  IGetAllTiposElementoUseCase,
  IGetTipoElementoByIdUseCase,
  IPatchTipoElementoUseCase,
  IUpdateTipoElementoUseCase,
} from "@proodos/application/Ports/ITipoElementoUseCases";
import {
  ensureFound,
  ensureRequiredFields,
  logControllerError,
  parsePositiveInteger,
  respondNoContent,
  respondOk,
} from "./ControllerHelpers";

type TipoElementoControllerDeps = {
  logger: ILogger;
  createTipoElementoService: ICreateTipoElementoUseCase;
  getAllTiposElementoService: IGetAllTiposElementoUseCase;
  getTipoElementoByIdService: IGetTipoElementoByIdUseCase;
  updateTipoElementoService: IUpdateTipoElementoUseCase;
  patchTipoElementoService: IPatchTipoElementoUseCase;
  deleteTipoElementoService: IDeleteTipoElementoUseCase;
};

export const createTipoElementoController = ({
  logger,
  createTipoElementoService,
  getAllTiposElementoService,
  getTipoElementoByIdService,
  updateTipoElementoService,
  patchTipoElementoService,
  deleteTipoElementoService,
}: TipoElementoControllerDeps) => {
  const tipoElementoController = Router();

  /**
   * @openapi
   * /api/tipos-elemento:
   *   get:
   *     tags:
   *       - Tipos de Elemento
   *     summary: Obtiene todos los tipos de elemento
   *     responses:
   *       200:
   *         description: Lista de tipos de elemento
  */
  tipoElementoController.get("/", async (req, res, next) => {
    logger.info("[Controller] GET /tipos-elemento");

    try {
      const result = await getAllTiposElementoService.execute();

      return respondOk(res, result);
    } catch (error: any) {
      logControllerError(logger, "GET /tipos-elemento", error);
      return next(error);
    }
  });

  /**
   * @openapi
   * /api/tipos-elemento/{id}:
   *   get:
   *     tags:
   *       - Tipos de Elemento
   *     summary: Obtiene un tipo de elemento por ID
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Tipo de elemento encontrado
   *       400:
   *         description: ID inválido
   *       404:
   *         description: No encontrado
  */
  tipoElementoController.get("/:id", async (req, res, next) => {
    logger.info(`[Controller] GET /tipos-elemento/${req.params.id}`);

    try {
      const id = parsePositiveInteger(req.params.id);
      const result = ensureFound(
        await getTipoElementoByIdService.execute(id),
        "Tipo elemento not found"
      );

      return respondOk(res, result);
    } catch (error: any) {
      logControllerError(logger, `GET /tipos-elemento/${req.params.id}`, error);
      return next(error);
    }
  });

  /**
   * @openapi
   * /api/tipos-elemento:
   *   post:
   *     tags:
   *       - Tipos de Elemento
   *     summary: Crea un nuevo tipo de elemento
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - nombre
   *             properties:
   *               nombre:
   *                 type: string
   *     responses:
   *       200:
   *         description: Tipo de elemento creado
  */
  tipoElementoController.post("/", async (req, res, next) => {
    logger.info("[Controller] POST /tipos-elemento");

    try {
      ensureRequiredFields(req.body, ["nombre"]);
      const result = await createTipoElementoService.execute(req.body);

      return respondOk(res, result);
    } catch (error: any) {
      logControllerError(logger, "POST /tipos-elemento", error);
      return next(error);
    }
  });

  /**
   * @openapi
   * /api/tipos-elemento/{id}:
   *   put:
   *     tags:
   *       - Tipos de Elemento
   *     summary: Actualiza un tipo de elemento
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
   *               - nombre
   *             properties:
   *               nombre:
   *                 type: string
   *     responses:
   *       200:
   *         description: Tipo de elemento actualizado
   *       400:
   *         description: Request inválida
   *       404:
   *         description: No encontrado
  */
  tipoElementoController.put("/:id", async (req, res, next) => {
    logger.info(`[Controller] PUT /tipos-elemento/${req.params.id}`);

    try {
      const id_tipo_elemento = parsePositiveInteger(req.params.id);
      ensureRequiredFields(req.body, ["nombre"]);
      const { nombre } = req.body || {};
      const result = await updateTipoElementoService.execute({
        id_tipo_elemento,
        nombre,
      });

      return respondOk(res, result);
    } catch (error: any) {
      logControllerError(logger, `PUT /tipos-elemento/${req.params.id}`, error);
      return next(error);
    }
  });

  /**
   * @openapi
   * /api/tipos-elemento/{id}:
   *   patch:
   *     tags:
   *       - Tipos de Elemento
   *     summary: Actualiza parcialmente un tipo de elemento
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
   *               nombre:
   *                 type: string
   *     responses:
   *       200:
   *         description: Tipo de elemento actualizado
   *       400:
   *         description: Request inválida
   *       404:
   *         description: No encontrado
  */
  tipoElementoController.patch("/:id", async (req, res, next) => {
    logger.info(`[Controller] PATCH /tipos-elemento/${req.params.id}`);

    try {
      const id_tipo_elemento = parsePositiveInteger(req.params.id);
      const result = await patchTipoElementoService.execute(
        id_tipo_elemento,
        req.body || {}
      );

      return respondOk(res, result);
    } catch (error: any) {
      logControllerError(logger, `PATCH /tipos-elemento/${req.params.id}`, error);
      return next(error);
    }
  });

  /**
   * @openapi
   * /api/tipos-elemento/{id}:
   *   delete:
   *     tags:
   *       - Tipos de Elemento
   *     summary: Elimina un tipo de elemento
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
  tipoElementoController.delete("/:id", async (req, res, next) => {
    logger.info(`[Controller] DELETE /tipos-elemento/${req.params.id}`);

    try {
      const id_tipo_elemento = parsePositiveInteger(req.params.id);
      await deleteTipoElementoService.execute(id_tipo_elemento);
      return respondNoContent(res);
    } catch (error: any) {
      logControllerError(logger, `DELETE /tipos-elemento/${req.params.id}`, error);
      return next(error);
    }
  });

  return tipoElementoController;
};
