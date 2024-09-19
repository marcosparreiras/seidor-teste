import { DomainException } from "./domain-exception";

export class VehicleNotFoundException extends DomainException {
  public constructor(query: string) {
    super(`Vehicle not found (${query})`);
  }
}
