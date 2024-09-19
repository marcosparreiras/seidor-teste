import { inject } from "../boundaries/domain-registry";
import type { VehicleRepository } from "../boundaries/vehicle-repository";
import { VehicleNotFoundException } from "../exceptions/vehicle-not-found-exception";

type Input = {
  vehicleId: string;
};

type Output = {
  vehicleId: string;
  plate: string;
  brand: string;
  color: string;
};

export class GetVehicleUseCase {
  @inject("vehicleRepository")
  private vehicleRepository!: VehicleRepository;

  public constructor() {}

  public async execute(input: Input): Promise<Output> {
    const vehicle = await this.vehicleRepository.findById(input.vehicleId);
    if (vehicle === null) {
      throw new VehicleNotFoundException(input.vehicleId);
    }
    return {
      vehicleId: vehicle.getId(),
      brand: vehicle.getBrand(),
      color: vehicle.getColor(),
      plate: vehicle.getPlate(),
    };
  }
}
