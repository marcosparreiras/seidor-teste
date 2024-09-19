import { Plate } from "./value-objects/plate";
import { UUID } from "./value-objects/uuid";

interface CreateVehicleDTO {
  plate: string;
  color: string;
  brand: string;
}

export class Vehicle {
  private id: UUID;
  private plate: Plate;
  private color: string;
  private brand: string;

  public getId(): string {
    return this.id.toString();
  }

  public getPlate(): string {
    return this.plate.toString();
  }

  public getColor(): string {
    return this.color;
  }

  public setColor(color: string): void {
    this.color = color;
  }

  public getBrand(): string {
    return this.brand;
  }

  private constructor(id: UUID, plate: Plate, color: string, brand: string) {
    this.id = id;
    this.color = color;
    this.plate = plate;
    this.brand = brand;
  }

  public static create(input: CreateVehicleDTO): Vehicle {
    const id = UUID.generate();
    const plate = new Plate(input.plate);
    return new Vehicle(id, plate, input.color, input.brand);
  }
}
