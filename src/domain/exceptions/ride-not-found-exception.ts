import { DomainException } from "./domain-exception";

export class RideNotFoundException extends DomainException {
  public constructor(query: string) {
    super(`Ride not found (${query})`);
  }
}
