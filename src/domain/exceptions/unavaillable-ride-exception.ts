import { DomainException } from "./domain-exception";

export class UnavaillableRideException extends DomainException {
  public constructor() {
    super(`The driver or vehicle is unavaillable for this ride`);
  }
}
