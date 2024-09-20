import type { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { GetManyVehiclesUseCase } from "../../domain/use-cases/get-many-vehicles";

export async function getManyVehiclesController(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const requestQuerySchema = z.object({
    color: z.string().optional(),
    brand: z.string().optional(),
  });
  try {
    const input = requestQuerySchema.parse(request.query);
    const useCase = new GetManyVehiclesUseCase();
    const output = await useCase.execute(input);
    return response.status(200).json({
      vehicles: output.vehicles,
    });
  } catch (error: unknown) {
    next(error);
  }
}
