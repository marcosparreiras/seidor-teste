import type { Vehicle } from "../entities/vehicle";

export interface VehicleRepository {
  findByPlate(plate: string): Promise<Vehicle | null>;
  insert(vehicle: Vehicle): Promise<void>;
}
