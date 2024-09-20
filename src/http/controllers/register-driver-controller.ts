import type { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { RegisterDriverUseCase } from "../../domain/use-cases/register-driver-use-case";

export async function registerDriverController(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const requestBodySchema = z.object({
    name: z.string(),
  });
  try {
    const input = requestBodySchema.parse(request.body);
    const useCase = new RegisterDriverUseCase();
    const output = await useCase.execute(input);
    return response.status(201).send({ driverId: output.driverId });
  } catch (error: unknown) {
    next(error);
  }
}
