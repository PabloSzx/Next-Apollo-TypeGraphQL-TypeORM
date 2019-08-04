import "reflect-metadata";

import { ApolloServer } from "apollo-server-express";
import express from "express";
import next from "next";
import notifier from "node-notifier";
import { Container } from "typedi";
import { createConnection, useContainer } from "typeorm";

import { dbConfig } from "./db";
import { GraphQLSchema } from "./graphql";

const app = express();

const nextApp = next({
  dev: process.env.NODE_ENV !== "production",
});

const nextHandle = nextApp.getRequestHandler();

useContainer(Container);

(async () => {
  const [schema] = await Promise.all([
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
    const message = `Server Listening on port ${port}!`;
    console.log(message);
    if (process.env.NODE_ENV !== "production") {
      notifier.notify({
        title: "🚀  Server ready",
        message: `at http://localhost:${port}`,
      });
    }
  });
})();
