import type { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { DeleteDriverUseCase } from "../../domain/use-cases/delete-driver-use-case";

export async function deleteDriverController(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const requestParamsSchema = z.object({
    driverId: z.string(),
  });
  try {
    const input = requestParamsSchema.parse(request.params);
    const useCase = new DeleteDriverUseCase();
    await useCase.execute(input);
    return response.status(204).json();
  } catch (error: unknown) {
    next(error);
  }
}
