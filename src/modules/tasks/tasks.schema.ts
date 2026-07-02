// src/modules/tasks/tasks.schema.ts
import { z } from "zod";

const bearerAuth = { security: [{ bearerAuth: [] }] };

const taskResponse = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().nullable(),
  done: z.boolean(),
  userId: z.string(),
  createdAt: z.date(),
});

const taskParams = z.object({ id: z.string().uuid() });

export const createTaskSchema = {
  tags: ["Tasks"],
  summary: "Criar tarefa",
  ...bearerAuth,
  body: z.object({
    title: z.string().min(1),
    description: z.string().nullable().optional().default(null),
  }),
  response: { 201: taskResponse },
};

export const findTasksSchema = {
  tags: ["Tasks"],
  summary: "Listar tarefas do usuário logado",
  ...bearerAuth,
  response: { 200: z.array(taskResponse) },
};

export const markTaskAsDoneSchema = {
  tags: ["Tasks"],
  summary: "Marcar tarefa como concluída",
  ...bearerAuth,
  params: taskParams,
  response: { 200: taskResponse },
};

export const deleteTaskSchema = {
  tags: ["Tasks"],
  summary: "Deletar tarefa",
  ...bearerAuth,
  params: taskParams,
  response: { 204: z.null() },
};

export type CreateTaskInput = z.infer<typeof createTaskSchema.body>;
export type TaskParams = z.infer<typeof taskParams>;
