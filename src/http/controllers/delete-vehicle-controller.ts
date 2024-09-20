import type { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { DeleteVehicleUseCase } from "../../domain/use-cases/delete-vehicle-use-case";

export async function deleteVehicleController(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const requestParamsSchema = z.object({
    vehicleId: z.string(),
  });
  try {
    const input = requestParamsSchema.parse(request.params);
    const useCase = new DeleteVehicleUseCase();
    await useCase.execute(input);
    return response.status(204).json();
  } catch (error: unknown) {
    next(error);
  }
}
