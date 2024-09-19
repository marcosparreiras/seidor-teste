import type {
  DriverRepository,
  Filters,
} from "../domain/boundaries/driver-repository";
import type { Driver } from "../domain/entities/driver";

export class InMemoryDriverRepository implements DriverRepository {
  public items: Driver[] = [];

  async findMany(filters: Filters): Promise<Driver[]> {
    let drivers = this.items;
    const { name } = filters;
    if (name) {
      drivers = drivers.filter((driver) => driver.getName().includes(name));
    }
    return drivers;
  }

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

  async delete(driver: Driver): Promise<void> {
    this.items = this.items.filter((item) => item.getId() !== driver.getId());
  }
}
