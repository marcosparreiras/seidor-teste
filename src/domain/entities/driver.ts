import { Name } from "./value-objects/name";
import { UUID } from "./value-objects/uuid";

interface CreateDriverDTO {
  name: string;
}

export class Driver {
  private id: UUID;
  private name: Name;

  public getId(): string {
    return this.id.toString();
  }

  public getName(): string {
    return this.name.toString();
  }

  public setName(name: string): void {
    this.name = new Name(name);
  }

  private constructor(id: UUID, name: Name) {
    this.id = id;
    this.name = name;
  }

  public static create(input: CreateDriverDTO): Driver {
    const id = UUID.generate();
    const name = new Name(input.name);
    return new Driver(id, name);
  }
}
