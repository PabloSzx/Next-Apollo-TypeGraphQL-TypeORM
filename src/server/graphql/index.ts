import { buildSchema } from "type-graphql";
import { Connection } from "typeorm";

import { User } from "../models/user";
import { BookResolver } from "./resolvers";

export const GraphQLSchema = buildSchema({
  resolvers: [BookResolver],
  validate: false,
  globalMiddlewares: [],
});

export const context = (dbConnection: Connection) => {
  return {
    dbConnection,
    UserRepository: dbConnection.getRepository(User),
  };
};

export type IContext = ReturnType<typeof context>;
