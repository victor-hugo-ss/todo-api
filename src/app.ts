import Fastify from "fastify";
import fastifyJwt from "@fastify/jwt";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";
import { usersRoutes } from "./modules/users/users.routes.js";
import { tasksRoutes } from "./modules/tasks/tasks.routes.js";
import { env } from "./shared/config/env.js";
import { errorHandler } from "./shared/middlewares/error.handler.js";

export function buildApp() {
  const app = Fastify({ logger: true });

  app.setValidatorCompiler(validatorCompiler);
  app.setSerializerCompiler(serializerCompiler);

  app.register(fastifySwagger, {
    openapi: {
      info: {
        title: "Todo API",
        description: "Documentação da API de tarefas",
        version: "1.0.0",
      },
      components: {
        securitySchemes: {
          bearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
          },
        },
      },
    },
    transform: jsonSchemaTransform,
  });

  app.register(fastifySwaggerUi, { routePrefix: "/docs" });
  app.register(fastifyJwt, { secret: env.JWT_SECRET });

  app.setErrorHandler(errorHandler);

  app.register(usersRoutes);
  app.register(tasksRoutes);

  return app;
}
