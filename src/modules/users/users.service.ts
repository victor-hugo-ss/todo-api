import bcrypt from "bcryptjs";
import { AppError } from "../../shared/errors/app.error.js";
import type { CreateUserInput, LoginInput } from "./users.schema.js";
import * as usersRepository from "./users.repository.js";

export async function CreateUser(data: CreateUserInput) {
  const emailAlreadyExists = await usersRepository.findUserByEmail(data.email);

  if (emailAlreadyExists) {
    throw AppError.conflict("E-mail já cadastrado");
  }

  const passwordHash = await bcrypt.hash(data.password, 8);

  return usersRepository.createUser({
    name: data.name,
    email: data.email,
    password: passwordHash,
  });
}

export async function login(data: LoginInput) {
  const user = await usersRepository.findUserByEmail(data.email);

  if (!user) {
    throw AppError.unauthorized("E-mail ou senha inválidos");
  }

  const passwordMatch = await bcrypt.compare(data.password, user.password);

  if (!passwordMatch) {
    throw AppError.unauthorized("E-mail ou senha inválidos");
  }

  return user;
}

export async function findAllUsers() {
  return usersRepository.findAllUsers();
}
