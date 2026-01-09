"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComponenteRepository = void 0;
const Models_1 = require("../Models");
const ComponenteMapper_1 = require("../../Mappers/ComponenteMapper");
class ComponenteRepository {
    constructor(logger) {
        this.logger = logger;
    }
    async create(entity) {
        this.logger.info("[Repository] ComponenteRepository.create()");
        this.logger.debug("[Repository] Datos recibidos:", entity);
        const created = await Models_1.ComponenteModel.create({
            id_tipo_componente: entity.id_tipo_componente,
            id_plan: entity.id_plan,
            id_tipo_variacion: entity.id_tipo_variacion,
            nombre: entity.nombre,
            fecha_creacion: new Date()
        });
        return ComponenteMapper_1.ComponenteMapper.toDomain(created);
    }
    async update(entity) {
        await Models_1.ComponenteModel.update({
            id_tipo_componente: entity.id_tipo_componente,
            id_plan: entity.id_plan,
            id_tipo_variacion: entity.id_tipo_variacion,
            nombre: entity.nombre,
            fecha_creacion: entity.fecha_creacion,
        }, {
            where: { id_componente: entity.id_componente },
        });
        const updated = await Models_1.ComponenteModel.findByPk(entity.id_componente);
        return updated ? ComponenteMapper_1.ComponenteMapper.toDomain(updated) : null;
    }
    async delete(id_componente) {
        await Models_1.ComponenteModel.destroy({ where: { id_componente } });
    }
    async getById(id) {
        const row = await Models_1.ComponenteModel.findByPk(id, {
            include: [
                { model: Models_1.TipoComponenteModel, as: "tipoComponente" },
                { model: Models_1.TipoVariacionModel, as: "tipoVariacion" },
            ],
        });
        return row ? ComponenteMapper_1.ComponenteMapper.toDomain(row) : null;
    }
    async getAll() {
        const rows = await Models_1.ComponenteModel.findAll({
            include: [
                { model: Models_1.TipoComponenteModel, as: "tipoComponente" },
                { model: Models_1.TipoVariacionModel, as: "tipoVariacion" },
            ],
        });
        return rows.map((r) => ComponenteMapper_1.ComponenteMapper.toDomain(r));
    }
}
exports.ComponenteRepository = ComponenteRepository;
