import type { NextFunction, Request, Response } from "express";
import { GetManyRidesEnrichedWithDriverAndVehicleUseCase } from "../../domain/use-cases/get-many-rides-enriched-with-driver-and-vehicle-use-case";

export async function getManyRidesEnrichedWithDriverAndVehicleController(
  _request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const useCase = new GetManyRidesEnrichedWithDriverAndVehicleUseCase();
    const output = await useCase.execute();
    return response.status(200).json({
      rides: output.rides,
    });
  } catch (error: unknown) {
    next(error);
  }
}
