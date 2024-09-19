import type { Driver } from "../entities/driver";

export interface DriverRepository {
  findById(id: string): Promise<Driver | null>;
  insert(driver: Driver): Promise<void>;
  update(driver: Driver): Promise<void>;
}
