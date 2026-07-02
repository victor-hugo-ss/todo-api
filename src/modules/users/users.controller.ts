import type { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import type { CreateUserInput, LoginInput } from "./users.schema.js";
import * as usersService from "./users.service.js";

export async function createUser(
  request: FastifyRequest<{ Body: CreateUserInput }>,
  reply: FastifyReply,
) {
  const user = await usersService.CreateUser(request.body);
  return reply.status(201).send(user);
}

export function makeLoginController(app: FastifyInstance) {
  return async function login(
    request: FastifyRequest<{ Body: LoginInput }>,
    reply: FastifyReply,
  ) {
    const user = await usersService.login(request.body);

    const token = app.jwt.sign(
      { name: user.name, email: user.email },
      { sub: user.id, expiresIn: "7d" },
    );

    return reply.send({ token });
  };
}

export async function findAllUsers(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const users = await usersService.findAllUsers();
  return reply.send(users);
}
