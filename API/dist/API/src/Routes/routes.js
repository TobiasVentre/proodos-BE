"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildRoutes = void 0;
const express_1 = require("express");
const ComponenteController_1 = require("../Controllers/ComponenteController");
const LandingPageController_1 = require("../Controllers/LandingPageController");
const buildRoutes = (logger) => {
    const routes = (0, express_1.Router)();
    routes.use("/componentes", (0, ComponenteController_1.createComponenteController)(logger));
    routes.use("/landings", LandingPageController_1.LandingPageController);
    return routes;
};
exports.buildRoutes = buildRoutes;
