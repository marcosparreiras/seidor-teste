import { randomUUID } from "node:crypto";

export class UUID {
  private value: string;

  public toString(): string {
    return this.value;
  }

  public constructor(value: string) {
    this.value = value;
  }

  public static generate(): UUID {
    const value = randomUUID();
    return new UUID(value);
  }
}
