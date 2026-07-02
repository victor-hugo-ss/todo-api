import type { FastifyRequest, FastifyReply } from "fastify";
import type { CreateTaskInput, TaskParams } from "./tasks.schema.js";
import * as tasksService from "./tasks.service.js";

export async function createTask(
  request: FastifyRequest<{ Body: CreateTaskInput }>,
  reply: FastifyReply,
) {
  const task = await tasksService.createTask(request.body, request.user.sub);
  return reply.status(201).send(task);
}

export async function findTasks(request: FastifyRequest, reply: FastifyReply) {
  const tasks = await tasksService.findTasksByUserId(request.user.sub);
  return reply.send(tasks);
}

export async function markTaskAsDone(
  request: FastifyRequest<{ Params: TaskParams }>,
  reply: FastifyReply,
) {
  const task = await tasksService.markTaskAsDone(
    request.params.id,
    request.user.sub,
  );
  return reply.send(task);
}

export async function deleteTask(
  request: FastifyRequest<{ Params: TaskParams }>,
  reply: FastifyReply,
) {
  await tasksService.deleteTask(request.params.id, request.user.sub);
  return reply.status(204).send();
}
