import { inject } from "../boundaries/domain-registry";
import type { VehicleRepository } from "../boundaries/vehicle-repository";
import { VehicleNotFoundException } from "../exceptions/vehicle-not-found-exception";

type Input = {
  vehicleId: string;
};

export class DeleteVehicleUseCase {
  @inject("vehicleRepository")
  private vehicleRepository!: VehicleRepository;

  public constructor() {}

  public async execute(input: Input): Promise<void> {
    const vehicle = await this.vehicleRepository.findById(input.vehicleId);
    if (vehicle === null) {
      throw new VehicleNotFoundException(input.vehicleId);
    }
    await this.vehicleRepository.delete(vehicle);
    return;
  }
}
