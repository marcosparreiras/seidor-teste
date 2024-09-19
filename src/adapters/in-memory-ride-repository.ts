import type { rideRepository } from "../domain/boundaries/ride-repository";
import type { Ride } from "../domain/entities/ride";

export class InMemoryRideRepository implements rideRepository {
  public items: Ride[] = [];

  async findByVehicleOrDriverWithOpenRide(
    vehicleId: string,
    driverId: string
  ): Promise<Ride[]> {
    const rides = this.items.filter((item) => {
      const vehicleWithOpenRide =
        item.getVehicleId() === vehicleId && item.getEndDate() === null;
      const driverWithOpenRide =
        item.getDriverId() === driverId && item.getEndDate() === null;
      if (vehicleWithOpenRide || driverWithOpenRide) {
        return true;
      }
      return false;
    });
    return rides;
  }

  async insert(ride: Ride): Promise<void> {
    this.items.push(ride);
  }
}
