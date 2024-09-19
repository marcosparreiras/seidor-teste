import { inject } from "../boundaries/domain-registry";
import type { DriverRepository } from "../boundaries/driver-repository";
import { Driver } from "../entities/driver";

type Input = {
  name: string;
};

type Output = {
  driverId: string;
};

export class RegisterDriverUseCase {
  @inject("driverRepository")
  private driverRepository!: DriverRepository;

  public constructor() {}

  public async execute(input: Input): Promise<Output> {
    const driver = Driver.create({ name: input.name });
    await this.driverRepository.insert(driver);
    return { driverId: driver.getId() };
  }
}
