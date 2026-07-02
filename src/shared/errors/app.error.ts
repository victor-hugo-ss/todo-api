export type AppErrorCode =
  | "BAD_REQUEST"
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "NOT_FOUND"
  | "CONFLICT"
  | "INTERNAL";

const codeToStatus: Record<AppErrorCode, number> = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL: 500,
};

export class AppError extends Error {
  public readonly code: AppErrorCode;
  public readonly statusCode: number;
  public readonly isOperational: boolean;
  public readonly details?: unknown;

  constructor(code: AppErrorCode, message: string, details?: unknown) {
    super(message);
    this.code = code;
    this.statusCode = codeToStatus[code];
    this.isOperational = true;
    this.details = details;
    this.name = "AppError";
    Object.setPrototypeOf(this, AppError.prototype);
    Error.captureStackTrace?.(this, this.constructor);
  }

  static badRequest(message = "Dados inválidos", details?: unknown) {
    return new AppError("BAD_REQUEST", message, details);
  }

  static unauthorized(message = "Não autorizado", details?: unknown) {
    return new AppError("UNAUTHORIZED", message, details);
  }

  static forbidden(message = "Sem permissão", details?: unknown) {
    return new AppError("FORBIDDEN", message, details);
  }

  static notFound(message = "Recurso não encontrado", details?: unknown) {
    return new AppError("NOT_FOUND", message, details);
  }

  static conflict(message = "Conflito de dados", details?: unknown) {
    return new AppError("CONFLICT", message, details);
  }

  static internal(message = "Erro interno do servidor", details?: unknown) {
    return new AppError("INTERNAL", message, details);
  }
}
