import { DomainRegistry, inject } from "../boundaries/domain-registry";
import type { VehicleRepository } from "../boundaries/vehicle-repository";
import { Vehicle } from "../entities/vehicle";
import { VehicleAlreadyExistsException } from "../exceptions/vehicle-already-exists-exception";

type Input = {
  plate: string;
  brand: string;
  color: string;
};

type Output = {
  vehicleId: string;
};

export class RegisterVehicleUseCase {
  @inject("vehicleRepository")
  private vehicleRepository!: VehicleRepository;

  public constructor() {
    // this.vehicleRepository =
    //   DomainRegistry.getInstance().inject("vehicleRepository");
  }

  public async execute(input: Input): Promise<Output> {
    const vehicleExists = await this.vehicleRepository.findByPlate(input.plate);
    if (vehicleExists !== null) {
      throw new VehicleAlreadyExistsException(input.plate);
    }
    const vehicle = Vehicle.create({
      plate: input.plate,
      brand: input.brand,
      color: input.color,
    });
    await this.vehicleRepository.insert(vehicle);
    return { vehicleId: vehicle.getId() };
  }
}
