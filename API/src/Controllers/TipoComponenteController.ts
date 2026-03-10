import { Router } from "express";
import { ILogger } from "@proodos/application/Interfaces/ILogger";
import {
  ICreateTipoComponenteUseCase,
  IDeleteTipoComponenteUseCase,
  IGetAllTiposComponenteUseCase,
  IGetTipoComponenteByIdUseCase,
  IPatchTipoComponenteUseCase,
  IUpdateTipoComponenteUseCase,
} from "@proodos/application/Ports/ITipoComponenteUseCases";
import {
  ensureFound,
  ensureRequiredFields,
  logControllerError,
  parsePositiveInteger,
  respondNoContent,
  respondOk,
} from "./ControllerHelpers";

type TipoComponenteControllerDeps = {
  logger: ILogger;
  createTipoComponenteService: ICreateTipoComponenteUseCase;
  getAllTiposComponenteService: IGetAllTiposComponenteUseCase;
  getTipoComponenteByIdService: IGetTipoComponenteByIdUseCase;
  updateTipoComponenteService: IUpdateTipoComponenteUseCase;
  patchTipoComponenteService: IPatchTipoComponenteUseCase;
  deleteTipoComponenteService: IDeleteTipoComponenteUseCase;
};

export const createTipoComponenteController = ({
  logger,
  createTipoComponenteService,
  getAllTiposComponenteService,
  getTipoComponenteByIdService,
  updateTipoComponenteService,
  patchTipoComponenteService,
  deleteTipoComponenteService,
}: TipoComponenteControllerDeps) => {
  const tipoComponenteController = Router();

  /**
   * @openapi
   * /api/tipos-componente:
   *   get:
   *     tags:
   *       - Tipos de Componente
   *     summary: Obtiene todos los tipos de componente
   *     responses:
   *       200:
   *         description: Lista de tipos de componente
  */
  tipoComponenteController.get("/", async (req, res, next) => {
    logger.info("[Controller] GET /tipos-componente");

    try {
      const result = await getAllTiposComponenteService.execute();

      return respondOk(res, result);
    } catch (error: any) {
      logControllerError(logger, "GET /tipos-componente", error);
      return next(error);
    }
  });

  /**
   * @openapi
   * /api/tipos-componente/{id}:
   *   get:
   *     tags:
   *       - Tipos de Componente
   *     summary: Obtiene un tipo de componente por ID
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Tipo de componente encontrado
   *       400:
   *         description: ID inválido
   *       404:
   *         description: No encontrado
  */
  tipoComponenteController.get("/:id", async (req, res, next) => {
    logger.info(`[Controller] GET /tipos-componente/${req.params.id}`);

    try {
      const id = parsePositiveInteger(req.params.id);
      const result = ensureFound(
        await getTipoComponenteByIdService.execute(id),
        "Tipo componente not found"
      );

      return respondOk(res, result);
    } catch (error: any) {
      logControllerError(logger, `GET /tipos-componente/${req.params.id}`, error);
      return next(error);
    }
  });

  /**
   * @openapi
   * /api/tipos-componente:
   *   post:
   *     tags:
   *       - Tipos de Componente
   *     summary: Crea un nuevo tipo de componente
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - nombre
   *               - estado
   *             properties:
   *               nombre:
   *                 type: string
   *               estado:
   *                 type: string
   *     responses:
   *       200:
   *         description: Tipo de componente creado
  */
  tipoComponenteController.post("/", async (req, res, next) => {
    logger.info("[Controller] POST /tipos-componente");

    try {
      ensureRequiredFields(req.body, ["nombre", "estado"]);
      const result = await createTipoComponenteService.execute(req.body);

      return respondOk(res, result);
    } catch (error: any) {
      logControllerError(logger, "POST /tipos-componente", error);
      return next(error);
    }
  });

  /**
   * @openapi
   * /api/tipos-componente/{id}:
   *   put:
   *     tags:
   *       - Tipos de Componente
   *     summary: Actualiza un tipo de componente
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
   *               - estado
   *             properties:
   *               nombre:
   *                 type: string
   *               estado:
   *                 type: string
   *     responses:
   *       200:
   *         description: Tipo de componente actualizado
   *       400:
   *         description: Request inválida
   *       404:
   *         description: No encontrado
  */
  tipoComponenteController.put("/:id", async (req, res, next) => {
    logger.info(`[Controller] PUT /tipos-componente/${req.params.id}`);

    try {
      const id_tipo_componente = parsePositiveInteger(req.params.id);
      ensureRequiredFields(req.body, ["nombre", "estado"]);
      const { nombre, estado } = req.body || {};
      const result = await updateTipoComponenteService.execute({
        id_tipo_componente,
        nombre,
        estado,
      });

      return respondOk(res, result);
    } catch (error: any) {
      logControllerError(logger, `PUT /tipos-componente/${req.params.id}`, error);
      return next(error);
    }
  });

  /**
   * @openapi
   * /api/tipos-componente/{id}:
   *   patch:
   *     tags:
   *       - Tipos de Componente
   *     summary: Actualiza parcialmente un tipo de componente
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
   *               estado:
   *                 type: string
   *     responses:
   *       200:
   *         description: Tipo de componente actualizado
   *       400:
   *         description: Request inválida
   *       404:
   *         description: No encontrado
  */
  tipoComponenteController.patch("/:id", async (req, res, next) => {
    logger.info(`[Controller] PATCH /tipos-componente/${req.params.id}`);

    try {
      const id_tipo_componente = parsePositiveInteger(req.params.id);
      const result = await patchTipoComponenteService.execute(
        id_tipo_componente,
        req.body || {}
      );

      return respondOk(res, result);
    } catch (error: any) {
      logControllerError(logger, `PATCH /tipos-componente/${req.params.id}`, error);
      return next(error);
    }
  });

  /**
   * @openapi
   * /api/tipos-componente/{id}:
   *   delete:
   *     tags:
   *       - Tipos de Componente
   *     summary: Elimina un tipo de componente
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
  tipoComponenteController.delete("/:id", async (req, res, next) => {
    logger.info(`[Controller] DELETE /tipos-componente/${req.params.id}`);

    try {
      const id_tipo_componente = parsePositiveInteger(req.params.id);
      await deleteTipoComponenteService.execute(id_tipo_componente);
      return respondNoContent(res);
    } catch (error: any) {
      logControllerError(logger, `DELETE /tipos-componente/${req.params.id}`, error);
      return next(error);
    }
  });

  return tipoComponenteController;
};
