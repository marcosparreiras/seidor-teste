import { InMemoryDriverRepository } from "../../adapters/in-memory-driver-repository";
import { DomainRegistry } from "../boundaries/domain-registry";
import { RegisterDriverUseCase } from "./register-driver-use-case";

describe("RegisterDriverUseCase", () => {
  let sut: RegisterDriverUseCase;
  let driverRepository: InMemoryDriverRepository;

  beforeEach(() => {
    sut = new RegisterDriverUseCase();
    driverRepository = new InMemoryDriverRepository();
    const registry = DomainRegistry.getInstance();
    registry.register("driverRepository", driverRepository);
  });

  it("Should be able to register a new driver", async () => {
    const input = {
      name: "John Doe",
    };
    const output = await sut.execute(input);
    expect(output.driverId).toEqual(expect.any(String));
    const driverOnRepository = driverRepository.items.find(
      (item) => item.getId() === output.driverId
    );
    expect(driverOnRepository?.getName()).toEqual(input.name);
  });
});
