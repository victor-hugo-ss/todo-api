import { prisma } from "../../shared/database/prisma-client.js";

export async function createTask(data: {
  title: string;
  description?: string | null;
  userId: string;
}) {
  return prisma.task.create({ data });
}

export async function findTasksByUserId(userId: string) {
  return prisma.task.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
}

export async function findTaskById(id: string) {
  return prisma.task.findUnique({ where: { id } });
}

export async function markTaskAsDone(id: string) {
  return prisma.task.update({
    where: { id },
    data: { done: true },
  });
}

export async function deleteTask(id: string) {
  return prisma.task.delete({ where: { id } });
}
