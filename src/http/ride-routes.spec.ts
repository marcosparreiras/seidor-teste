import request from "supertest";
import { expressServer } from "./app";
import { InMemoryDriverRepository } from "../adapters/in-memory-driver-repository";
import { InMemoryRideRepository } from "../adapters/in-memory-ride-repository";
import { InMemoryVehicleRepository } from "../adapters/in-memory-vehicle-repository";
import { DomainRegistry } from "../domain/boundaries/domain-registry";

describe("HTTP /ride/*", () => {
  beforeEach(() => {
    const registry = DomainRegistry.getInstance();
    registry.register("driverRepository", new InMemoryDriverRepository());
    registry.register("vehicleRepository", new InMemoryVehicleRepository());
    registry.register("rideRepository", new InMemoryRideRepository());
  });

  it("Should be able to start a ride", async () => {
    const registerDriverResponse = await request(expressServer)
      .post("/driver")
      .send({ name: "John Doe" });
    const registerVehicleResponse = await request(expressServer)
      .post("/vehicle")
      .send({
        brand: "BMW",
        color: "white",
        plate: "HJD5687",
      });
    const { driverId } = registerDriverResponse.body;
    const { vehicleId } = registerVehicleResponse.body;
    const registerRideBody = {
      driverId,
      vehicleId,
      reason: "Attending a bussines meeting.",
    };
    const startRideResponse = await request(expressServer)
      .post("/ride")
      .send(registerRideBody);
    expect(startRideResponse.status).toEqual(201);
    expect(startRideResponse.body.rideId).toEqual(expect.any(String));
  });

  it("Should be able to end a ride", async () => {
    const registerDriverResponse = await request(expressServer)
      .post("/driver")
      .send({ name: "John Doe" });
    const registerVehicleResponse = await request(expressServer)
      .post("/vehicle")
      .send({
        brand: "BMW",
        color: "white",
        plate: "HJD5687",
      });
    const { driverId } = registerDriverResponse.body;
    const { vehicleId } = registerVehicleResponse.body;
    const registerRideBody = {
      driverId,
      vehicleId,
      reason: "Attending a bussines meeting.",
    };
    const startRideResponse = await request(expressServer)
      .post("/ride")
      .send(registerRideBody);
    const { rideId } = startRideResponse.body;
    const endRideResponse = await request(expressServer).patch(
      `/ride/${rideId}/end`
    );
    expect(endRideResponse.status).toEqual(204);
  });
});
