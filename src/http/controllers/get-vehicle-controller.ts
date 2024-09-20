import type { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { GetVehicleUseCase } from "../../domain/use-cases/get-vehicle-use-case";

export async function getVehicleController(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const requestParamsSchema = z.object({
    vehicleId: z.string(),
  });
  try {
    const input = requestParamsSchema.parse(request.params);
    const useCase = new GetVehicleUseCase();
    const output = await useCase.execute(input);
    return response.status(200).json({
      vehicleId: output.vehicleId,
      brand: output.brand,
      color: output.color,
      plate: output.plate,
    });
  } catch (error: unknown) {
    next(error);
  }
}
