import type { Driver } from "../entities/driver";

export interface DriverRepository {
  insert(driver: Driver): Promise<void>;
}
