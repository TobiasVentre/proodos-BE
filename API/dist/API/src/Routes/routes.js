"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildRoutes = void 0;
const express_1 = require("express");
const ComponenteController_1 = require("../Controllers/ComponenteController");
const LandingPageController_1 = require("../Controllers/LandingPageController");
const ApiContainer_1 = require("@proodos/api/CompositionRoot/ApiContainer");
const buildRoutes = async (logger) => {
    const routes = (0, express_1.Router)();
    const useCases = await (0, ApiContainer_1.buildApiUseCases)(logger);
    routes.use("/componentes", (0, ComponenteController_1.createComponenteController)({
        createComponenteService: useCases.componente.createComponente,
        getAllComponentesService: useCases.componente.getAllComponentes,
        getComponenteByIdService: useCases.componente.getComponenteById,
        patchComponenteService: useCases.componente.patchComponente,
    }));
    routes.use("/landings", (0, LandingPageController_1.createLandingPageController)({
        createLandingPageService: useCases.landing.createLandingPage,
        getLandingPageByIdService: useCases.landing.getLandingPageById,
        getAllLandingPagesService: useCases.landing.getAllLandingPages,
        assignLandingComponenteService: useCases.landing.assignLandingComponente,
    }));
    return routes;
};
exports.buildRoutes = buildRoutes;
