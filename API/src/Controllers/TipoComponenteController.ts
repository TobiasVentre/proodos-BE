import { Router } from "express";
import {
  CreateTipoComponenteUseCase,
  DeleteTipoComponenteUseCase,
  GetAllTiposComponenteUseCase,
  GetTipoComponenteByIdUseCase,
  PatchTipoComponenteUseCase,
  UpdateTipoComponenteUseCase,
} from "@proodos/application/Ports/TipoComponenteUseCases";
import { buildNotFoundError, buildValidationError } from "./ControllerErrors";

type TipoComponenteControllerDeps = {
  createTipoComponenteService: CreateTipoComponenteUseCase;
  getAllTiposComponenteService: GetAllTiposComponenteUseCase;
  getTipoComponenteByIdService: GetTipoComponenteByIdUseCase;
  updateTipoComponenteService: UpdateTipoComponenteUseCase;
  patchTipoComponenteService: PatchTipoComponenteUseCase;
  deleteTipoComponenteService: DeleteTipoComponenteUseCase;
};

export const createTipoComponenteController = ({
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
    console.log("[Controller] GET /tipos-componente");

    try {
      const result = await getAllTiposComponenteService.execute();

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
    console.log(`[Controller] GET /tipos-componente/${req.params.id}`);

    const id = Number(req.params.id);
    if (Number.isNaN(id) || id <= 0) {
      return next(buildValidationError("Invalid id"));
    }

    try {
      const result = await getTipoComponenteByIdService.execute(id);

      if (!result) {
        return next(buildNotFoundError("Tipo componente not found"));
      }

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
    console.log("[Controller] POST /tipos-componente");

    const { nombre, estado } = req.body || {};
    if (!nombre || !estado) {
      return next(buildValidationError("Missing required fields", {
        required: ["nombre", "estado"],
      }));
    }

    try {
      const result = await createTipoComponenteService.execute(req.body);

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
    console.log(`[Controller] PUT /tipos-componente/${req.params.id}`);

    const id_tipo_componente = Number(req.params.id);
    if (Number.isNaN(id_tipo_componente) || id_tipo_componente <= 0) {
      return next(buildValidationError("Invalid id"));
    }

    const { nombre, estado } = req.body || {};
    if (!nombre || !estado) {
      return next(buildValidationError("Missing required fields", {
        required: ["nombre", "estado"],
      }));
    }

    try {
      const result = await updateTipoComponenteService.execute({
        id_tipo_componente,
        nombre,
        estado,
      });

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
    console.log(`[Controller] PATCH /tipos-componente/${req.params.id}`);

    const id_tipo_componente = Number(req.params.id);
    if (Number.isNaN(id_tipo_componente) || id_tipo_componente <= 0) {
      return next(buildValidationError("Invalid id"));
    }

    try {
      const result = await patchTipoComponenteService.execute(
        id_tipo_componente,
        req.body || {}
      );

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
    console.log(`[Controller] DELETE /tipos-componente/${req.params.id}`);

    const id_tipo_componente = Number(req.params.id);
    if (Number.isNaN(id_tipo_componente) || id_tipo_componente <= 0) {
      return next(buildValidationError("Invalid id"));
    }

    try {
      await deleteTipoComponenteService.execute(id_tipo_componente);
      return res.status(204).send();
    } catch (error: any) {
      console.log("[Controller] ERROR:", error);
      return next(error);
    }
  });

  return tipoComponenteController;
};
