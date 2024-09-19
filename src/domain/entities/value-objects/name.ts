import { InvalidNameException } from "../../exceptions/invalid-name-exception";

export class Name {
  private value: string;

  public toString(): string {
    return this.value;
  }

  public constructor(value: string) {
    const isValid = /^[A-Za-zÀ-ÖØ-öø-ÿ]{3,}(?: [A-Za-zÀ-ÖØ-öø-ÿ]+)*$/.test(
      value
    );
    if (!isValid) {
      throw new InvalidNameException(value);
    }
    this.value = value;
  }
}
