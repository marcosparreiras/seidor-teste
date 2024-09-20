import { type NextFunction, type Request, type Response } from "express";
import { z } from "zod";
import { EndRideUseCase } from "../../domain/use-cases/end-ride-use-case";

export async function endRideController(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const requestParamsSchema = z.object({
    rideId: z.string(),
  });
  try {
    const input = requestParamsSchema.parse(request.params);
    const useCase = new EndRideUseCase();
    await useCase.execute(input);
    return response.status(204).json();
  } catch (error: unknown) {
    next(error);
  }
}
