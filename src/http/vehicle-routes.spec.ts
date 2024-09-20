import request from "supertest";
import { InMemoryVehicleRepository } from "../adapters/in-memory-vehicle-repository";
import { DomainRegistry } from "../domain/boundaries/domain-registry";
import { expressServer } from "./app";

describe("HTTP /vehicle/*", () => {
  beforeEach(() => {
    const registry = DomainRegistry.getInstance();
    registry.register("vehicleRepository", new InMemoryVehicleRepository());
  });

  it("Should be able to register a new vehicle", async () => {
    const registerVehicleBody = {
      plate: "PUJ5426",
      brand: "BMW",
      color: "white",
    };
    const registerVehicleResponse = await request(expressServer)
      .post("/vehicle")
      .send(registerVehicleBody);
    expect(registerVehicleResponse.status).toEqual(201);
    expect(registerVehicleResponse.body.vehicleId).toEqual(expect.any(String));
  });

  it("Should be able to get a vehicle data", async () => {
    const registerVehicleBody = {
      plate: "PUJ5426",
      brand: "BMW",
      color: "white",
    };
    const registerVehicleResponse = await request(expressServer)
      .post("/vehicle")
      .send(registerVehicleBody);
    const { vehicleId } = registerVehicleResponse.body;
    const getVehicleResponse = await request(expressServer).get(
      `/vehicle/${vehicleId}`
    );
    expect(getVehicleResponse.status).toEqual(200);
    expect(getVehicleResponse.body).toEqual(
      expect.objectContaining({
        vehicleId: vehicleId,
        plate: registerVehicleBody.plate,
        brand: registerVehicleBody.brand,
        color: registerVehicleBody.color,
      })
    );
  });

  it("Should be able to update a vehicle data", async () => {
    const registerVehicleBody = {
      plate: "PUJ5426",
      brand: "BMW",
      color: "white",
    };
    const registerVehicleResponse = await request(expressServer)
      .post("/vehicle")
      .send(registerVehicleBody);
    const { vehicleId } = registerVehicleResponse.body;
    const updateVehicleBody = {
      color: "black",
    };
    const updateVehicleResponse = await request(expressServer)
      .put(`/vehicle/${vehicleId}`)
      .send(updateVehicleBody);
    expect(updateVehicleResponse.status).toEqual(204);
    const getVehicleResponse = await request(expressServer).get(
      `/vehicle/${vehicleId}`
    );
    expect(getVehicleResponse.body).toEqual(
      expect.objectContaining({
        vehicleId: vehicleId,
        plate: registerVehicleBody.plate,
        brand: registerVehicleBody.brand,
        color: updateVehicleBody.color,
      })
    );
  });

  it("Should be able to delete a vehicle", async () => {
    const registerVehicleBody = {
      plate: "PUJ5426",
      brand: "BMW",
      color: "white",
    };
    const registerVehicleResponse = await request(expressServer)
      .post("/vehicle")
      .send(registerVehicleBody);
    const { vehicleId } = registerVehicleResponse.body;
    const deleteVehicleResponse = await request(expressServer).delete(
      `/vehicle/${vehicleId}`
    );
    expect(deleteVehicleResponse.status).toEqual(204);
    const getVehicleResponse = await request(expressServer).get(
      `/vehicle/${vehicleId}`
    );
    expect(getVehicleResponse.status).toEqual(400);
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
