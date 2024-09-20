import { z } from "zod";
import { expressServer } from "./http/app";
import { DomainRegistry } from "./domain/boundaries/domain-registry";
import { InMemoryDriverRepository } from "./adapters/in-memory-driver-repository";
import { InMemoryVehicleRepository } from "./adapters/in-memory-vehicle-repository";
import { InMemoryRideRepository } from "./adapters/in-memory-ride-repository";

const envSchema = z.object({
  PORT: z.coerce.number().default(3000),
});
export const env = envSchema.parse(process.env);

const registry = DomainRegistry.getInstance();
registry.register("driverRepository", new InMemoryDriverRepository());
registry.register("vehicleRepository", new InMemoryVehicleRepository());
registry.register("rideRepository", new InMemoryRideRepository());

expressServer.listen(env.PORT, () => {
  console.log(`Http server is running on port ${env.PORT}`);
});
