import { InMemoryDriverRepository } from "../../adapters/in-memory-driver-repository";
import { DomainRegistry } from "../boundaries/domain-registry";
import { Driver } from "../entities/driver";
import { GetManyDriversUseCase } from "./get-many-drivers-use-case";

describe("GetManyDriversUseCase", () => {
  let sut: GetManyDriversUseCase;
  let dirverRepository: InMemoryDriverRepository;

  beforeEach(() => {
    sut = new GetManyDriversUseCase();
    dirverRepository = new InMemoryDriverRepository();
    const registry = DomainRegistry.getInstance();
    registry.register("driverRepository", dirverRepository);
  });

  it("Should be able to get many drivers", async () => {
    const drivers = [
      { name: "John Doe" },
      { name: "Janny Doe" },
      { name: "Tom Frank" },
      { name: "Fransis Coller" },
      { name: "Jammy Willians" },
    ].map((driverInput) => Driver.create(driverInput));
    dirverRepository.items.push(...drivers);
    const output = await sut.execute();
    expect(output.drivers).toHaveLength(drivers.length);
    const firstDriverResult = drivers.find(
      (driver) => driver.getId() === output.drivers[0].driverId
    );
    expect(output.drivers[0].name).toEqual(firstDriverResult?.getName());
  });

  it.each([
    { input: { name: "Doe" }, resultLength: 2 },
    { input: { name: "Fr" }, resultLength: 2 },
    { input: { name: "Jammy" }, resultLength: 1 },
  ])(
    "Should be able to filter drivers per name",
    async ({ input, resultLength }) => {
      const drivers = [
        { name: "John Doe" },
        { name: "Janny Doe" },
        { name: "Tom Frank" },
        { name: "Fransis Coller" },
        { name: "Jammy Willians" },
      ].map((driverInput) => Driver.create(driverInput));
      dirverRepository.items.push(...drivers);
      const output = await sut.execute(input);
      expect(output.drivers).toHaveLength(resultLength);
    }
  );
});
