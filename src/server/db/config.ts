import { toInteger } from "lodash";
import path from "path";
import { ConnectionOptions } from "typeorm";

export const dbConfig: ConnectionOptions = {
  type: "postgres",
  entities: [path.resolve(__dirname, "../models/*.ts")],
  username: process.env.DB_USERNAME || "postgres",
  password: process.env.DB_PASSWORD || undefined,
  database: process.env.DB_NAME || "postgres",
  port: toInteger(process.env.DB_PORT) || 5432,
  synchronize: true,
  logging: true,
};
