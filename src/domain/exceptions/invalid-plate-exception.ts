import { DomainException } from "./domain-exception";

export class InvalidPlateException extends DomainException {
  public constructor(plate: string) {
    super(`Invalid plate format (${plate})`);
  }
}
