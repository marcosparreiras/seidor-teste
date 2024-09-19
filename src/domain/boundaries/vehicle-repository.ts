import type { Vehicle } from "../entities/vehicle";

export type Filters = {
  color?: string;
  brand?: string;
};

export interface VehicleRepository {
  findMany(filters?: Filters): Promise<Vehicle[]>;
  findById(id: string): Promise<Vehicle | null>;
  findByPlate(plate: string): Promise<Vehicle | null>;
  insert(vehicle: Vehicle): Promise<void>;
  update(vehicle: Vehicle): Promise<void>;
  delete(vehicle: Vehicle): Promise<void>;
}
