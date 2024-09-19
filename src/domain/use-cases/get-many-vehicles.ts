import { inject } from "../boundaries/domain-registry";
import type { VehicleRepository } from "../boundaries/vehicle-repository";

type Input = {
  color?: string;
  brand?: string;
};

type Output = {
  vehicles: {
    vehicleId: string;
    plate: string;
    brand: string;
    color: string;
  }[];
};

export class GetManyVehiclesUseCase {
  @inject("vehicleRepository")
  private vehicleRepository!: VehicleRepository;

  public constructor() {}

  public async execute(input?: Input): Promise<Output> {
    const vehicles = await this.vehicleRepository.findMany({
      color: input?.color,
      brand: input?.brand,
    });
    return {
      vehicles: vehicles.map((vehicle) => ({
        vehicleId: vehicle.getId(),
        brand: vehicle.getBrand(),
        color: vehicle.getColor(),
        plate: vehicle.getPlate(),
      })),
    };
  }
}
