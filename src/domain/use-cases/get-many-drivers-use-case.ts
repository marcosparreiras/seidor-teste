import { inject } from "../boundaries/domain-registry";
import type { DriverRepository } from "../boundaries/driver-repository";

type Input = {
  name?: string;
};

type Output = {
  drivers: {
    driverId: string;
    name: string;
  }[];
};

export class GetManyDriversUseCase {
  @inject("driverRepository")
  private driverRepository!: DriverRepository;

  public constructor() {}

  public async execute(input?: Input): Promise<Output> {
    const drivers = await this.driverRepository.findMany({
      name: input?.name,
    });
    return {
      drivers: drivers.map((driver) => ({
        driverId: driver.getId(),
        name: driver.getName(),
      })),
    };
  }
}
