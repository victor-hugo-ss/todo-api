import { z } from "zod";

export const createUserSchema = {
  tags: ["Users"],
  summary: "Cadastrar usuário",
  body: z.object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6),
  }),
  response: {
    201: z.object({
      id: z.string(),
      name: z.string(),
      email: z.string(),
      createdAt: z.date(),
    }),
  },
};

export const loginSchema = {
  tags: ["Users"],
  summary: "Login",
  body: z.object({
    email: z.string().email(),
    password: z.string(),
  }),
  response: {
    200: z.object({
      token: z.string(),
    }),
  },
};

export const findAllUsersSchema = {
  tags: ["Users"],
  summary: "Listar usuários",
  response: {
    200: z.array(
      z.object({
        id: z.string(),
        name: z.string(),
        email: z.string(),
        createdAt: z.date(),
      }),
    ),
  },
};

export type CreateUserInput = z.infer<typeof createUserSchema.body>;
export type LoginInput = z.infer<typeof loginSchema.body>;
