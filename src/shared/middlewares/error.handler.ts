import type { FastifyRequest, FastifyReply } from "fastify";
import { hasZodFastifySchemaValidationErrors } from "fastify-type-provider-zod";
import { AppError } from "../errors/app.error.js";

export async function errorHandler(
  error: unknown,
  _request: FastifyRequest,
  reply: FastifyReply,
) {
  if (hasZodFastifySchemaValidationErrors(error)) {
    return reply.status(400).send({
      error: {
        code: "BAD_REQUEST",
        message: "Dados inválidos",
        details: error.validation,
      },
    });
  }

  if (error instanceof AppError) {
    return reply.status(error.statusCode).send({
      error: {
        code: error.code,
        message: error.message,
        ...(error.details ? { details: error.details } : {}),
      },
    });
  }

  console.error(error);

  return reply.status(500).send({
    error: {
      code: "INTERNAL",
      message: "Erro interno do servidor",
    },
  });
}
