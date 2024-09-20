import type { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { GetManyDriversUseCase } from "../../domain/use-cases/get-many-drivers-use-case";

export async function getManyDriversController(
  requet: Request,
  response: Response,
  next: NextFunction
) {
  const requestQuerySchema = z.object({
    name: z.string().optional(),
  });
  try {
    const input = requestQuerySchema.parse(requet.query);
    const useCase = new GetManyDriversUseCase();
    const output = await useCase.execute(input);
    return response.status(200).json({
      drivers: output.drivers.map((data) => ({
        driverId: data.driverId,
        name: data.name,
      })),
    });
  } catch (error: unknown) {
    next(error);
  }
}
