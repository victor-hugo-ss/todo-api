import { AppError } from "../../shared/errors/app.error.js";
import type { CreateTaskInput } from "./tasks.schema.js";
import * as tasksRepository from "./tasks.repository.js";

export async function createTask(data: CreateTaskInput, userId: string) {
  return tasksRepository.createTask({
    title: data.title,
    description: data.description,
    userId,
  });
}

export async function findTasksByUserId(userId: string) {
  return tasksRepository.findTasksByUserId(userId);
}

export async function markTaskAsDone(id: string, userId: string) {
  const task = await tasksRepository.findTaskById(id);

  if (!task) {
    throw AppError.notFound("Tarefa não encontrada");
  }

  if (task.userId !== userId) {
    throw AppError.forbidden("Sem permissão para alterar essa tarefa");
  }

  return tasksRepository.markTaskAsDone(id);
}

export async function deleteTask(id: string, userId: string) {
  const task = await tasksRepository.findTaskById(id);

  if (!task) {
    throw AppError.notFound("Tarefa não encontrada");
  }

  if (task.userId !== userId) {
    throw AppError.forbidden("Sem permissão para deletar essa tarefa");
  }

  await tasksRepository.deleteTask(id);
}
