import { type FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import * as usersController from "./users.controller.js";
import {
  createUserSchema,
  loginSchema,
  findAllUsersSchema,
} from "./users.schema.js";

export async function usersRoutes(app: FastifyInstance) {
  const router = app.withTypeProvider<ZodTypeProvider>();

  router.post(
    "/users",
    { schema: createUserSchema },
    usersController.makeCreateUserController(app),
  );
  router.post(
    "/sessions",
    { schema: loginSchema },
    usersController.makeLoginController(app),
  );
  router.get(
    "/users",
    { schema: findAllUsersSchema },
    usersController.findAllUsers,
  );
}
