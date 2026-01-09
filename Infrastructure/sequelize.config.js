require("dotenv").config();

const useWindowsAuth = String(process.env.DB_USE_WINDOWS_AUTH).toLowerCase() === "true";
const encrypt = String(process.env.DB_ENCRYPT).toLowerCase() === "true"; // vos dijiste false
const trustCert = String(process.env.DB_TRUST_CERT).toLowerCase() !== "false";

const server = process.env.DB_HOST; // requerido por tedious
const port = Number(process.env.DB_PORT || 1433);
const database = process.env.DB_NAME;

const common = {
  dialect: "mssql",
  // mantenemos host/port por sequelize, pero lo crítico es options.server
  host: server,
  port,
  database,
  logging: false,
  dialectOptions: {
    options: {
      server,               // ✅ requerido por tedious
      port,                 // ✅
      database,             // ✅
      encrypt,              // false
      trustServerCertificate: trustCert
    }
  }
};

if (useWindowsAuth) {
  common.dialectOptions.authentication = {
    type: "ntlm",
    options: {
      domain: process.env.DB_WIN_DOMAIN,
      userName: process.env.DB_WIN_USER,
      password: process.env.DB_WIN_PASSWORD
    }
  };
} else {
  common.username = process.env.DB_USER;
  common.password = process.env.DB_PASSWORD;
}

module.exports = {
  development: common,
  test: common,
  production: common
};
