import { InvalidPlateException } from "../../exceptions/invalid-plate-exception";

export class Plate {
  private value: string;

  public toString(): string {
    return this.value;
  }

  public constructor(value: string) {
    const isValid = /^[A-Z]{3}\d{4}$/.test(value);
    if (!isValid) {
      throw new InvalidPlateException(value);
    }
    this.value = value;
  }
}
