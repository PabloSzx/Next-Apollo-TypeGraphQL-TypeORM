import "reflect-metadata";

import { ApolloServer } from "apollo-server-express";
import express from "express";
import next from "next";
import { createConnection } from "typeorm";

import { dbConfig } from "./db/config";
import { context, GraphQLSchema } from "./graphql";

const app = express();

const nextApp = next({
  dev: process.env.NODE_ENV !== "production",
});

const nextHandle = nextApp.getRequestHandler();

(async () => {
  const [schema, dbConnection] = await Promise.all([
    GraphQLSchema,
    createConnection(dbConfig),
    nextApp.prepare(),
  ]);

  const apolloServer = new ApolloServer({
    schema,
    playground:
      process.env.NODE_ENV !== "production"
        ? {
            settings: {
              "request.credentials": "include",
            },
          }
        : false,
    context: context(dbConnection),
  });

  const path = "/graphql";

  app.use((req, res, next) => {
    if (req.url === path) return next();
    nextHandle(req, res);
  });

  apolloServer.applyMiddleware({
    app,
    path,
  });

  const port = 3000;

  app.listen({ port }, () => {
    console.log(`Servera Listening on port ${port}!`);
  });
})();
