import { prisma } from "../../shared/database/prisma-client.js";

export async function findUserByEmail(email: string) {
  return prisma.user.findUnique({ where: { email } });
}

export async function findAllUsers() {
  return prisma.user.findMany({
    select: { id: true, name: true, email: true, createdAt: true },
  });
}

export async function createUser(data: {
  name: string;
  email: string;
  password: string;
}) {
  return prisma.user.create({
    data,
    select: { id: true, name: true, email: true, createdAt: true },
  });
}
