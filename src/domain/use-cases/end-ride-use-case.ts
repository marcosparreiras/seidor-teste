import { inject } from "../boundaries/domain-registry";
import type { rideRepository } from "../boundaries/ride-repository";
import { RideNotFoundException } from "../exceptions/ride-not-found-exception";

type Input = {
  rideId: string;
};

export class EndRideUseCase {
  @inject("rideRepository")
  private rideRepository!: rideRepository;

  public constructor() {}

  public async execute(input: Input): Promise<void> {
    const ride = await this.rideRepository.findById(input.rideId);
    if (ride === null) {
      throw new RideNotFoundException(input.rideId);
    }
    ride.endRide();
    await this.rideRepository.update(ride);
    return;
  }
}
