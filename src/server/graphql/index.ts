import { resolve } from "path";
import { buildSchema } from "type-graphql";
import { Container } from "typedi";

export const GraphQLSchema = buildSchema({
  resolvers: [resolve(__dirname, "./resolvers/*.ts")],
  validate: false,
  globalMiddlewares: [],
  emitSchemaFile: resolve(__dirname, "../../../schema.gql"),
  container: Container,
});
