import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { authenticate } from "../../shared/middlewares/auth.middleware.js";
import * as tasksController from "./tasks.controller.js";
import {
  createTaskSchema,
  findTasksSchema,
  markTaskAsDoneSchema,
  deleteTaskSchema,
} from "./tasks.schema.js";

export async function tasksRoutes(app: FastifyInstance) {
  const router = app.withTypeProvider<ZodTypeProvider>();

  router.addHook("onRequest", authenticate);

  router.post(
    "/tasks",
    { schema: createTaskSchema },
    tasksController.createTask,
  );
  router.get("/tasks", { schema: findTasksSchema }, tasksController.findTasks);
  router.patch(
    "/tasks/:id/done",
    { schema: markTaskAsDoneSchema },
    tasksController.markTaskAsDone,
  );
  router.delete(
    "/tasks/:id",
    { schema: deleteTaskSchema },
    tasksController.deleteTask,
  );
}
