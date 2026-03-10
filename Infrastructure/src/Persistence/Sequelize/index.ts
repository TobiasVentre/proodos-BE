import { sequelize } from "../../Config/SequelizeConfig";
import * as models from "../Models";
import { initAssociations } from "./associations";
import { ILogger } from "@proodos/application/Interfaces/ILogger";



export const initModels = async (logger: ILogger) => {
  await sequelize.authenticate();
  logger.info("[DB] authenticate OK");
  Object.values(models).forEach((m: any) => {
    if (typeof m.initModel === "function") m.initModel(sequelize);
  });

  initAssociations();
};

export { sequelize };
