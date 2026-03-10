import { Router } from "express";
import { ILogger } from "@proodos/application/Interfaces/ILogger";
import {
  ICreateElementoComponenteUseCase,
  IDeleteElementoComponenteUseCase,
  IGetAllElementosComponenteUseCase,
  IGetElementoComponenteByIdUseCase,
  IGetElementosByComponenteUseCase,
  IPatchElementoComponenteUseCase,
  IUpdateElementoComponenteUseCase,
} from "@proodos/application/Ports/IElementoComponenteUseCases";
import {
  ensureFound,
  ensureRequiredFields,
  logControllerError,
  parseOptionalPositiveInteger,
  parsePositiveInteger,
  respondNoContent,
  respondOk,
} from "./ControllerHelpers";

type ElementoComponenteControllerDeps = {
  logger: ILogger;
  createElementoComponenteService: ICreateElementoComponenteUseCase;
  getAllElementosComponenteService: IGetAllElementosComponenteUseCase;
  getElementoComponenteByIdService: IGetElementoComponenteByIdUseCase;
  getElementosByComponenteService: IGetElementosByComponenteUseCase;
  updateElementoComponenteService: IUpdateElementoComponenteUseCase;
  patchElementoComponenteService: IPatchElementoComponenteUseCase;
  deleteElementoComponenteService: IDeleteElementoComponenteUseCase;
};

export const createElementoComponenteController = ({
  logger,
  createElementoComponenteService,
  getAllElementosComponenteService,
  getElementoComponenteByIdService,
  getElementosByComponenteService,
  updateElementoComponenteService,
  patchElementoComponenteService,
  deleteElementoComponenteService,
}: ElementoComponenteControllerDeps) => {
  const elementoComponenteController = Router();

  /**
   * @openapi
   * /api/elementos-componente:
   *   get:
   *     tags:
   *       - Elementos de Componente
   *     summary: Obtiene todos los elementos o filtra por componente
   *     parameters:
   *       - name: id_componente
   *         in: query
   *         required: false
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Lista de elementos
   */
  elementoComponenteController.get("/", async (req, res, next) => {
    logger.info("[Controller] GET /elementos-componente");

    try {
      const id_componente = parseOptionalPositiveInteger(
        req.query?.id_componente,
        "id_componente"
      );
      const result = id_componente
        ? await getElementosByComponenteService.execute(id_componente)
        : await getAllElementosComponenteService.execute();

      return respondOk(res, result);
    } catch (error: any) {
      logControllerError(logger, "GET /elementos-componente", error);
      return next(error);
    }
  });

  /**
   * @openapi
   * /api/elementos-componente/{id}:
   *   get:
   *     tags:
   *       - Elementos de Componente
   *     summary: Obtiene un elemento por ID
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Elemento encontrado
   *       400:
   *         description: ID inválido
   *       404:
   *         description: No encontrado
   */
  elementoComponenteController.get("/:id", async (req, res, next) => {
    logger.info(`[Controller] GET /elementos-componente/${req.params.id}`);

    try {
      const id = parsePositiveInteger(req.params.id);
      const result = ensureFound(
        await getElementoComponenteByIdService.execute(id),
        "Elemento componente not found"
      );

      return respondOk(res, result);
    } catch (error: any) {
      logControllerError(logger, `GET /elementos-componente/${req.params.id}`, error);
      return next(error);
    }
  });

  /**
   * @openapi
   * /api/elementos-componente:
   *   post:
   *     tags:
   *       - Elementos de Componente
   *     summary: Crea un nuevo elemento de componente
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - id_componente
   *               - id_tipo_elemento
   *               - nombre
   *               - icono_img
   *               - descripcion
   *               - link
   *               - orden
   *               - css_url
   *             properties:
   *               id_componente:
   *                 type: integer
   *               id_tipo_elemento:
   *                 type: integer
   *               nombre:
   *                 type: string
   *               icono_img:
   *                 type: string
   *               descripcion:
   *                 type: string
   *               link:
   *                 type: string
   *               orden:
   *                 type: integer
   *               css_url:
   *                 type: string
   *     responses:
   *       200:
   *         description: Elemento creado
   */
  elementoComponenteController.post("/", async (req, res, next) => {
    logger.info("[Controller] POST /elementos-componente");

    try {
      ensureRequiredFields(req.body, [
        "id_componente",
        "id_tipo_elemento",
        "nombre",
        "icono_img",
        "descripcion",
        "link",
        "orden",
        "css_url",
      ]);
      const result = await createElementoComponenteService.execute(req.body);

      return respondOk(res, result);
    } catch (error: any) {
      logControllerError(logger, "POST /elementos-componente", error);
      return next(error);
    }
  });

  /**
   * @openapi
   * /api/elementos-componente/{id}:
   *   put:
   *     tags:
   *       - Elementos de Componente
   *     summary: Actualiza un elemento de componente
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
   *               - id_tipo_elemento
   *               - nombre
   *               - icono_img
   *               - descripcion
   *               - link
   *               - orden
   *               - css_url
   *             properties:
   *               id_componente:
   *                 type: integer
   *               id_tipo_elemento:
   *                 type: integer
   *               nombre:
   *                 type: string
   *               icono_img:
   *                 type: string
   *               descripcion:
   *                 type: string
   *               link:
   *                 type: string
   *               orden:
   *                 type: integer
   *               css_url:
   *                 type: string
   *     responses:
   *       200:
   *         description: Elemento actualizado
   *       400:
   *         description: Request inválida
   *       404:
   *         description: No encontrado
   */
  elementoComponenteController.put("/:id", async (req, res, next) => {
    logger.info(`[Controller] PUT /elementos-componente/${req.params.id}`);

    try {
      const id_elemento = parsePositiveInteger(req.params.id);
      ensureRequiredFields(req.body, [
        "id_componente",
        "id_tipo_elemento",
        "nombre",
        "icono_img",
        "descripcion",
        "link",
        "orden",
        "css_url",
      ]);
      const result = await updateElementoComponenteService.execute({
        id_elemento,
        ...req.body,
      });

      return respondOk(res, result);
    } catch (error: any) {
      logControllerError(logger, `PUT /elementos-componente/${req.params.id}`, error);
      return next(error);
    }
  });

  /**
   * @openapi
   * /api/elementos-componente/{id}:
   *   patch:
   *     tags:
   *       - Elementos de Componente
   *     summary: Actualiza parcialmente un elemento de componente
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
   *               id_componente:
   *                 type: integer
   *               id_tipo_elemento:
   *                 type: integer
   *               nombre:
   *                 type: string
   *               icono_img:
   *                 type: string
   *               descripcion:
   *                 type: string
   *               link:
   *                 type: string
   *               orden:
   *                 type: integer
   *               css_url:
   *                 type: string
   *     responses:
   *       200:
   *         description: Elemento actualizado
   *       400:
   *         description: Request inválida
   *       404:
   *         description: No encontrado
   */
  elementoComponenteController.patch("/:id", async (req, res, next) => {
    logger.info(`[Controller] PATCH /elementos-componente/${req.params.id}`);

    try {
      const id_elemento = parsePositiveInteger(req.params.id);
      const result = await patchElementoComponenteService.execute(
        id_elemento,
        req.body || {}
      );

      return respondOk(res, result);
    } catch (error: any) {
      logControllerError(logger, `PATCH /elementos-componente/${req.params.id}`, error);
      return next(error);
    }
  });

  /**
   * @openapi
   * /api/elementos-componente/{id}:
   *   delete:
   *     tags:
   *       - Elementos de Componente
   *     summary: Elimina un elemento de componente
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
  elementoComponenteController.delete("/:id", async (req, res, next) => {
    logger.info(`[Controller] DELETE /elementos-componente/${req.params.id}`);

    try {
      const id_elemento = parsePositiveInteger(req.params.id);
      await deleteElementoComponenteService.execute(id_elemento);
      return respondNoContent(res);
    } catch (error: any) {
      logControllerError(logger, `DELETE /elementos-componente/${req.params.id}`, error);
      return next(error);
    }
  });

  return elementoComponenteController;
};
