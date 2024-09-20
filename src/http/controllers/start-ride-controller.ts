import type { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { StartRideUseCase } from "../../domain/use-cases/start-ride-use-case";

export async function startRideController(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const requestBodySchema = z.object({
    driverId: z.string(),
    vehicleId: z.string(),
    reason: z.string(),
  });
  try {
    const input = requestBodySchema.parse(request.body);
    const useCase = new StartRideUseCase();
    const output = await useCase.execute(input);
    return response.status(201).send({
      rideId: output.rideId,
    });
  } catch (error: unknown) {
    next(error);
  }
}
