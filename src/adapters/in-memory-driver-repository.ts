import type { DriverRepository } from "../domain/boundaries/driver-repository";
import type { Driver } from "../domain/entities/driver";

export class InMemoryDriverRepository implements DriverRepository {
  public items: Driver[] = [];

  async insert(driver: Driver): Promise<void> {
    this.items.push(driver);
  }
}
