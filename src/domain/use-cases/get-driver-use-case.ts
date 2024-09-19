import { inject } from "../boundaries/domain-registry";
import type { DriverRepository } from "../boundaries/driver-repository";
import { DriverNotFoundExcepiton } from "../exceptions/driver-not-found-exception";

type Input = {
  driverId: string;
};

type Output = {
  driverId: string;
  name: string;
};

export class GetDriverUseCase {
  @inject("driverRepository")
  private dirverRepository!: DriverRepository;

  public constructor() {}

  public async execute(input: Input): Promise<Output> {
    const driver = await this.dirverRepository.findById(input.driverId);
    if (driver === null) {
      throw new DriverNotFoundExcepiton(input.driverId);
    }
    return {
      driverId: driver.getId(),
      name: driver.getName(),
    };
  }
}
