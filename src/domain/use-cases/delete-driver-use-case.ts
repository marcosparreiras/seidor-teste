import { inject } from "../boundaries/domain-registry";
import type { DriverRepository } from "../boundaries/driver-repository";
import { DriverNotFoundExcepiton } from "../exceptions/driver-not-found-exception";

type Input = {
  driverId: string;
};

export class DeleteDriverUseCase {
  @inject("driverRepository")
  private driverRepository!: DriverRepository;

  public constructor() {}

  public async execute(input: Input): Promise<void> {
    const driver = await this.driverRepository.findById(input.driverId);
    if (driver === null) {
      throw new DriverNotFoundExcepiton(input.driverId);
    }
    await this.driverRepository.delete(driver);
    return;
  }
}
