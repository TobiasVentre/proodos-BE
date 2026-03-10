"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildRoutes = void 0;
const express_1 = require("express");
const ComponenteController_1 = require("../Controllers/ComponenteController");
const LandingPageController_1 = require("../Controllers/LandingPageController");
const PlanController_1 = require("../Controllers/PlanController");
const TipoComponenteController_1 = require("../Controllers/TipoComponenteController");
const TipoElementoController_1 = require("../Controllers/TipoElementoController");
const TipoVariacionController_1 = require("../Controllers/TipoVariacionController");
const ElementoComponenteController_1 = require("../Controllers/ElementoComponenteController");
const ApiContainer_1 = require("../CompositionRoot/ApiContainer");
const buildRoutes = async (logger) => {
    const routes = (0, express_1.Router)();
    const useCases = await (0, ApiContainer_1.buildApiUseCases)(logger);
    routes.use("/componentes", (0, ComponenteController_1.createComponenteController)({
        logger,
        createComponenteService: useCases.componente.createComponente,
        getAllComponentesService: useCases.componente.getAllComponentes,
        getComponenteByIdService: useCases.componente.getComponenteById,
        updateComponenteService: useCases.componente.updateComponente,
        patchComponenteService: useCases.componente.patchComponente,
        deleteComponenteService: useCases.componente.deleteComponente,
        softDeleteComponenteService: useCases.componente.softDeleteComponente,
        getLandingsByComponenteService: useCases.componente.getLandingsByComponente,
        assignComponenteHijoService: useCases.componente.assignComponenteHijo,
        unassignComponenteHijoService: useCases.componente.unassignComponenteHijo,
        getComponenteTreeService: useCases.componente.getComponenteTree,
        assignPlanToComponenteService: useCases.componente.assignPlanToComponente,
        unassignPlanFromComponenteService: useCases.componente.unassignPlanFromComponente,
    }));
    routes.use("/landings", (0, LandingPageController_1.createLandingPageController)({
        logger,
        createLandingPageService: useCases.landing.createLandingPage,
        getLandingPageByIdService: useCases.landing.getLandingPageById,
        getAllLandingPagesService: useCases.landing.getAllLandingPages,
        updateLandingPageService: useCases.landing.updateLandingPage,
        patchLandingPageService: useCases.landing.patchLandingPage,
        deleteLandingPageService: useCases.landing.deleteLandingPage,
        assignLandingComponenteService: useCases.landing.assignLandingComponente,
        unassignLandingComponenteService: useCases.landing.unassignLandingComponente,
        getLandingComponentesService: useCases.landing.getLandingComponentes,
    }));
    routes.use("/planes", (0, PlanController_1.createPlanController)({
        logger,
        createPlanService: useCases.plan.createPlan,
        createPlanFullService: useCases.plan.createPlanFull,
        getAllPlansService: useCases.plan.getAllPlans,
        getPlanByIdService: useCases.plan.getPlanById,
        patchPlanService: useCases.plan.patchPlan,
        patchPlanFullService: useCases.plan.patchPlanFull,
        updatePlanFullService: useCases.plan.updatePlanFull,
        updatePlanService: useCases.plan.updatePlan,
        deletePlanService: useCases.plan.deletePlan,
        getComponentesByPlanService: useCases.componente.getComponentesByPlan,
    }));
    routes.use("/tipos-componente", (0, TipoComponenteController_1.createTipoComponenteController)({
        logger,
        createTipoComponenteService: useCases.tipoComponente.createTipoComponente,
        getAllTiposComponenteService: useCases.tipoComponente.getAllTiposComponente,
        getTipoComponenteByIdService: useCases.tipoComponente.getTipoComponenteById,
        updateTipoComponenteService: useCases.tipoComponente.updateTipoComponente,
        patchTipoComponenteService: useCases.tipoComponente.patchTipoComponente,
        deleteTipoComponenteService: useCases.tipoComponente.deleteTipoComponente,
    }));
    routes.use("/tipos-variacion", (0, TipoVariacionController_1.createTipoVariacionController)({
        logger,
        createTipoVariacionService: useCases.tipoVariacion.createTipoVariacion,
        getAllTiposVariacionService: useCases.tipoVariacion.getAllTiposVariacion,
        getTipoVariacionByIdService: useCases.tipoVariacion.getTipoVariacionById,
        getVariacionesByTipoComponenteService: useCases.tipoVariacion.getVariacionesByTipoComponente,
        updateTipoVariacionService: useCases.tipoVariacion.updateTipoVariacion,
        patchTipoVariacionService: useCases.tipoVariacion.patchTipoVariacion,
        deleteTipoVariacionService: useCases.tipoVariacion.deleteTipoVariacion,
    }));
    routes.use("/tipos-elemento", (0, TipoElementoController_1.createTipoElementoController)({
        logger,
        createTipoElementoService: useCases.tipoElemento.createTipoElemento,
        getAllTiposElementoService: useCases.tipoElemento.getAllTiposElemento,
        getTipoElementoByIdService: useCases.tipoElemento.getTipoElementoById,
        updateTipoElementoService: useCases.tipoElemento.updateTipoElemento,
        patchTipoElementoService: useCases.tipoElemento.patchTipoElemento,
        deleteTipoElementoService: useCases.tipoElemento.deleteTipoElemento,
    }));
    routes.use("/elementos-componente", (0, ElementoComponenteController_1.createElementoComponenteController)({
        logger,
        createElementoComponenteService: useCases.elementoComponente.createElementoComponente,
        getAllElementosComponenteService: useCases.elementoComponente.getAllElementosComponente,
        getElementoComponenteByIdService: useCases.elementoComponente.getElementoComponenteById,
        getElementosByComponenteService: useCases.elementoComponente.getElementosByComponente,
        updateElementoComponenteService: useCases.elementoComponente.updateElementoComponente,
        patchElementoComponenteService: useCases.elementoComponente.patchElementoComponente,
        deleteElementoComponenteService: useCases.elementoComponente.deleteElementoComponente,
    }));
    return routes;
};
exports.buildRoutes = buildRoutes;
