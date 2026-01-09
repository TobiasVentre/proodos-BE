"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = require("express");
const ComponenteController_1 = require("../Controllers/ComponenteController");
const LandingPageController_1 = require("../Controllers/LandingPageController");
exports.routes = (0, express_1.Router)();
exports.routes.use("/componentes", ComponenteController_1.ComponenteController);
exports.routes.use("/landings", LandingPageController_1.LandingPageController);
