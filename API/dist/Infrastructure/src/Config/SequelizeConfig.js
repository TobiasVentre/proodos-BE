"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const DB_NAME = process.env.DB_NAME || "";
const DB_HOST = process.env.DB_HOST || "localhost";
const DB_PORT = Number(process.env.DB_PORT) || 1433;
exports.sequelize = new sequelize_1.Sequelize(DB_NAME, "", "", {
    dialect: "mssql",
    host: DB_HOST,
    port: DB_PORT,
    logging: false,
    dialectOptions: {
        options: {
            trustedConnection: true,
            trustServerCertificate: true
        }
    }
});
