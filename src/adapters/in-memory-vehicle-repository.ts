import type { VehicleRepository } from "../domain/boundaries/vehicle-repository";
import type { Vehicle } from "../domain/entities/vehicle";

export class InMemoryVehicleRepository implements VehicleRepository {
  public items: Vehicle[] = [];

  async findByPlate(plate: string): Promise<Vehicle | null> {
    const vehicle = this.items.find((item) => item.getPlate() === plate);
    return vehicle ?? null;
  }

  async insert(vehicle: Vehicle): Promise<void> {
    this.items.push(vehicle);
  }
}
