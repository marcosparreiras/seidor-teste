import type { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { GetDriverUseCase } from "../../domain/use-cases/get-driver-use-case";

export async function getDriverController(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const requestParamsSchema = z.object({
    driverId: z.string(),
  });
  try {
    const input = requestParamsSchema.parse(request.params);
    const useCase = new GetDriverUseCase();
    const output = await useCase.execute(input);
    return response.status(200).json({
      driverId: output.driverId,
      name: output.name,
    });
  } catch (error: unknown) {
    next(error);
  }
}
