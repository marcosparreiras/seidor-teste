import type { DriverRepository } from "../domain/boundaries/driver-repository";
import type { Driver } from "../domain/entities/driver";

export class InMemoryDriverRepository implements DriverRepository {
  public items: Driver[] = [];

  async findById(id: string): Promise<Driver | null> {
    const driver = this.items.find((item) => item.getId() === id);
    return driver ?? null;
  }

  async insert(driver: Driver): Promise<void> {
    this.items.push(driver);
  }

  async update(driver: Driver): Promise<void> {
    const index = this.items.findIndex(
      (item) => item.getId() === driver.getId()
    );
    this.items[index] = driver;
  }
}
