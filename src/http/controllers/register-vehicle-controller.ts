import type { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { RegisterVehicleUseCase } from "../../domain/use-cases/register-vehicle-use-case";

export async function RegisterVehicleController(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const requestBodySchema = z.object({
    plate: z.string(),
    brand: z.string(),
    color: z.string(),
  });
  try {
    const input = requestBodySchema.parse(request.body);
    const useCase = new RegisterVehicleUseCase();
    const output = await useCase.execute(input);
    return response.status(201).json({ vehicleId: output.vehicleId });
  } catch (error: unknown) {
    next(error);
  }
}
