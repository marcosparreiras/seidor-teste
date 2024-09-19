import { DomainException } from "./domain-exception";

export class DriverNotFoundExcepiton extends DomainException {
  public constructor(query: string) {
    super(`Driver not found (${query})`);
  }
}
