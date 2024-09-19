import type { rideRepository } from "../domain/boundaries/ride-repository";
import type { Ride } from "../domain/entities/ride";

export class InMemoryRideRepository implements rideRepository {
  public items: Ride[] = [];

  async findManyByVehicleOrDriverWithOpenRide(
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

  async findById(id: string): Promise<Ride | null> {
    const ride = this.items.find((item) => item.getId() === id);
    return ride ?? null;
  }

  async insert(ride: Ride): Promise<void> {
    this.items.push(ride);
  }

  async update(ride: Ride): Promise<void> {
    const index = this.items.findIndex((item) => item.getId() === ride.getId());
    this.items[index] = ride;
  }
}
