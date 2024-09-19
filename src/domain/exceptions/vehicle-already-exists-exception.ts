import { DomainException } from "./domain-exception";

export class VehicleAlreadyExistsException extends DomainException {
  public constructor(palte: string) {
    super(`Vehicle of plate (${palte}) already exists`);
  }
}
