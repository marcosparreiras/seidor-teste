import type {
  Filters,
  VehicleRepository,
} from "../domain/boundaries/vehicle-repository";
import type { Vehicle } from "../domain/entities/vehicle";

export class InMemoryVehicleRepository implements VehicleRepository {
  public items: Vehicle[] = [];

  async findMany(filters: Filters): Promise<Vehicle[]> {
    const { color, brand } = filters;
    let vehicles = this.items;
    if (brand) {
      vehicles = vehicles.filter((item) => item.getBrand().includes(brand));
    }
    if (color) {
      vehicles = vehicles.filter((item) => item.getColor().includes(color));
    }
    return vehicles;
  }

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

  async delete(vehicle: Vehicle): Promise<void> {
    this.items = this.items.filter((item) => item.getId() !== vehicle.getId());
  }
}
