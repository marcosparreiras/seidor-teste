import request from "supertest";
import { InMemoryVehicleRepository } from "../adapters/in-memory-vehicle-repository";
import { DomainRegistry } from "../domain/boundaries/domain-registry";
import { expressServer } from "./app";

describe("HTTP /vehicle/*", () => {
  beforeEach(() => {
    const registry = DomainRegistry.getInstance();
    registry.register("vehicleRepository", new InMemoryVehicleRepository());
  });

  it("Should be able to list vehicles", async () => {
    const vehiclesToRegister = [
      {
        plate: "JHS4123",
        brand: "BMW",
        color: "white",
      },
      {
        plate: "JHS4124",
        brand: "FORD",
        color: "white",
      },
      {
        plate: "JHS4125",
        brand: "BMW",
        color: "black",
      },
      {
        plate: "JHS4126",
        brand: "BMW",
        color: "white",
      },
    ];
    await Promise.all(
      vehiclesToRegister.map((body) =>
        request(expressServer).post("/vehicle").send(body)
      )
    );
    const queryParams = {
      brand: "BMW",
      color: "white",
    };
    const listVehicleResponse = await request(expressServer)
      .get("/vehicle")
      .query(queryParams);
    expect(listVehicleResponse.status).toEqual(200);
    expect(listVehicleResponse.body.vehicles).toHaveLength(2);
    expect(listVehicleResponse.body.vehicles[0]).toEqual(
      expect.objectContaining({
        brand: "BMW",
        color: "white",
      })
    );
  });

  it("Should be able to do a vehicle life cycle (create, update, read, delete)", async () => {
    // POST /vehcile
    const registerVehicleBody = {
      plate: "PUJ5426",
      brand: "BMW",
      color: "white",
    };
    const registerVehicleResponse = await request(expressServer)
      .post("/vehicle")
      .send(registerVehicleBody);
    const { vehicleId } = registerVehicleResponse.body;
    expect(registerVehicleResponse.status).toEqual(201);

    // PUT /vehicle/vehicleId
    const updateVehicleBody = { color: "black" };
    const updateVehicleResponse = await request(expressServer)
      .put(`/vehicle/${vehicleId}`)
      .send(updateVehicleBody);
    expect(updateVehicleResponse.status).toEqual(204);

    // GET /vehicle/vehicleId
    const getVehicleResponse = await request(expressServer).get(
      `/vehicle/${vehicleId}`
    );
    expect(getVehicleResponse.status).toEqual(200);
    expect(getVehicleResponse.body.vehicleId).toEqual(vehicleId);
    expect(getVehicleResponse.body.plate).toEqual(registerVehicleBody.plate);
    expect(getVehicleResponse.body.brand).toEqual(registerVehicleBody.brand);
    expect(getVehicleResponse.body.color).toEqual(updateVehicleBody.color);

    // DELETE /vehicle/vehicleId
    const deleteVehicleResponse = await request(expressServer).delete(
      `/vehicle/${vehicleId}`
    );
    expect(deleteVehicleResponse.status).toEqual(204);
  });

  it("Should not be able to register a vehicle with invalid plate format", async () => {
    const body = {
      plate: "PU5426K",
      brand: "BMW",
      color: "white",
    };
    const response = await request(expressServer).post("/vehicle").send(body);
    expect(response.status).toEqual(400);
    expect(response.body.message).toEqual(expect.any(String));
  });

  it("Should not be able to register a vehicle without request body", async () => {
    const body = {};
    const response = await request(expressServer).post("/vehicle").send(body);
    expect(response.status).toEqual(400);
    expect(response.body.message).toEqual(expect.any(Array));
  });
});
