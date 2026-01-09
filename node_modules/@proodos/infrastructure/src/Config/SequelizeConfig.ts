import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const DB_NAME = process.env.DB_NAME || "";
const DB_HOST = process.env.DB_HOST || "localhost";
const DB_PORT = Number(process.env.DB_PORT) || 1433;

export const sequelize = new Sequelize(DB_NAME, "", "", {
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
