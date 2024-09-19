import { randomUUID } from "crypto";

interface CreateVehicleDTO {
  plate: string;
  color: string;
  brand: string;
}

export class Vehicle {
  private id: string;
  private plate: string;
  private color: string;
  private brand: string;

  public getId(): string {
    return this.id;
  }
  public getPlate(): string {
    return this.plate;
  }
  public getColor(): string {
    return this.color;
  }
  public getBrand(): string {
    return this.brand;
  }

  private constructor(id: string, plate: string, color: string, brand: string) {
    this.id = id;
    this.color = color;
    this.plate = plate;
    this.brand = brand;
  }

  public static create(input: CreateVehicleDTO): Vehicle {
    const id = randomUUID();
    return new Vehicle(id, input.plate, input.color, input.brand);
  }
}
