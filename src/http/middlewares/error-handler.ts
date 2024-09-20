import type { NextFunction, Request, Response } from "express";
import { DomainException } from "../../domain/exceptions/domain-exception";
import { ZodError } from "zod";

export async function errorHandlerMiddleware(
  error: Error,
  _request: Request,
  response: Response,
  _next: NextFunction
) {
  if (error instanceof DomainException) {
    return response
      .status(error.getStatus())
      .json({ message: error.getMessage() });
  }
  if (error instanceof ZodError) {
    return response.status(400).json({ message: error.format()._errors });
  }
  return response.status(500).json({ message: "Internal server error " });
}
