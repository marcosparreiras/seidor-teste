import { inject } from "../boundaries/domain-registry";
import type { DriverRepository } from "../boundaries/driver-repository";
import type { RideRepository } from "../boundaries/ride-repository";
import type { VehicleRepository } from "../boundaries/vehicle-repository";
import type { Ride } from "../entities/ride";

type Output = {
  rides: {
    rideId: string;
    startDate: Date;
    endDate: Date | null;
    reason: string;
    driver: {
      driverId?: string;
      name?: string;
    };
    vehicle: {
      vehicleId?: string;
      plate?: string;
      brand?: string;
      color?: string;
    };
  }[];
};

export class GetManyRidesEnrichedWithDriverAndVehicleUseCase {
  @inject("driverRepository")
  private driverRepository!: DriverRepository;
  @inject("vehicleRepository")
  private vehicleRepository!: VehicleRepository;
  @inject("rideRepository")
  private rideRepository!: RideRepository;

  public constructor() {}

  public async execute(): Promise<Output> {
    const rides = await this.rideRepository.findMany();
    const ridesEnriched = await Promise.all(
      rides.map((ride) => this.erichRideWithDriverAndVehicles(ride))
    );
    return {
      rides: ridesEnriched.map((data) => ({
        rideId: data.ride.getId(),
        startDate: data.ride.getStartDate(),
        endDate: data.ride.getEndDate(),
        reason: data.ride.getReason(),
        driver: {
          driverId: data.driver?.getId(),
          name: data.driver?.getName(),
        },
        vehicle: {
          vehicleId: data.vehicle?.getId(),
          brand: data.vehicle?.getBrand(),
          color: data.vehicle?.getColor(),
          plate: data.vehicle?.getPlate(),
        },
      })),
    };
  }

  private async erichRideWithDriverAndVehicles(ride: Ride) {
    const [driver, vehicle] = await Promise.all([
      this.driverRepository.findById(ride.getDriverId()),
      this.vehicleRepository.findById(ride.getVehicleId()),
    ]);
    return {
      ride,
      driver,
      vehicle,
    };
  }
}
