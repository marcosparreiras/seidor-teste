import type { Vehicle } from "../entities/vehicle";

export interface VehicleRepository {
  findById(id: string): Promise<Vehicle | null>;
  findByPlate(plate: string): Promise<Vehicle | null>;
  insert(vehicle: Vehicle): Promise<void>;
  update(vehicle: Vehicle): Promise<void>;
}
