import { InMemoryDriverRepository } from "../../adapters/in-memory-driver-repository";
import { DomainRegistry } from "../boundaries/domain-registry";
import { Driver } from "../entities/driver";
import { DriverNotFoundExcepiton } from "../exceptions/driver-not-found-exception";
import { UpdateDriverUseCase } from "./update-driver-use-case";

describe("UpdateDriverUseCase", () => {
  let sut: UpdateDriverUseCase;
  let driverRepository: InMemoryDriverRepository;

  beforeEach(() => {
    sut = new UpdateDriverUseCase();
    driverRepository = new InMemoryDriverRepository();
    const registry = DomainRegistry.getInstance();
    registry.register("driverRepository", driverRepository);
  });

  it("Should be able to udpate a driver data", async () => {
    const driver = Driver.create({ name: "John Doe" });
    driverRepository.items.push(driver);
    const input = {
      driverId: driver.getId(),
      name: "Jonny Doe",
    };
    await sut.execute(input);
    expect(driverRepository.items).toHaveLength(1);
    expect(driver.getName()).toEqual(input.name);
  });

  it("Should not be able to update the data of an unexistent driver", async () => {
    const input = {
      driverId: "UNEXISTENT-DRIVER-ID",
      name: "John Doe",
    };
    await expect(() => sut.execute(input)).rejects.toBeInstanceOf(
      DriverNotFoundExcepiton
    );
  });
});
