import type { Driver } from "../entities/driver";

export type Filters = {
  name?: string;
};

export interface DriverRepository {
  findMany(filters: Filters): Promise<Driver[]>;
  findById(id: string): Promise<Driver | null>;
  insert(driver: Driver): Promise<void>;
  update(driver: Driver): Promise<void>;
  delete(driver: Driver): Promise<void>;
}
