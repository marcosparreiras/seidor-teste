import type { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { UpdateVehicleUseCase } from "../../domain/use-cases/update-vehicle-use-case";

export async function updateVehicleController(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const requestBodySchema = z.object({
    color: z.string(),
  });
  const requestParamsSchema = z.object({
    vehicleId: z.string(),
  });
  try {
    const body = requestBodySchema.parse(request.body);
    const params = requestParamsSchema.parse(request.params);
    const input = { ...body, ...params };
    const useCase = new UpdateVehicleUseCase();
    await useCase.execute(input);
    return response.status(204).json();
  } catch (error: unknown) {
    next(error);
  }
}
