import type { VehicleRepository } from "../domain/boundaries/vehicle-repository";
import type { Vehicle } from "../domain/entities/vehicle";

export class InMemoryVehicleRepository implements VehicleRepository {
  public items: Vehicle[] = [];

  async findById(id: string): Promise<Vehicle | null> {
    const vehicle = this.items.find((item) => item.getId() === id);
    return vehicle ?? null;
  }

  async findByPlate(plate: string): Promise<Vehicle | null> {
    const vehicle = this.items.find((item) => item.getPlate() === plate);
    return vehicle ?? null;
  }

  async insert(vehicle: Vehicle): Promise<void> {
    this.items.push(vehicle);
  }

  async update(vehicle: Vehicle): Promise<void> {
    const index = this.items.findIndex(
      (item) => item.getId() === vehicle.getId()
    );
    this.items[index] = vehicle;
  }
}
