import type { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { UpdateDriverUseCase } from "../../domain/use-cases/update-driver-use-case";

export async function updateDriverController(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const requestBodySchema = z.object({
    name: z.string(),
  });
  const requestParamsSchema = z.object({
    driverId: z.string(),
  });
  try {
    const body = requestBodySchema.parse(request.body);
    const params = requestParamsSchema.parse(request.params);
    const input = { ...body, ...params };
    const useCase = new UpdateDriverUseCase();
    await useCase.execute(input);
    return response.status(204).json();
  } catch (error: unknown) {
    next(error);
  }
}
