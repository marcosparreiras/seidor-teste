export class DomainRegistry {
  private container: Record<string, any>;
  private static instance?: DomainRegistry;

  private constructor() {
    this.container = {};
  }

  public static getInstance() {
    if (!this.instance) {
      this.instance = new DomainRegistry();
    }
    return this.instance;
  }

  public inject(key: string): any {
    return this.container[key];
  }

  public register(key: string, value: any): void {
    this.container[key] = value;
  }
}

// Method Decorator
export function inject(key: string) {
  return function (target: any, propertyKey: string): void {
    Object.defineProperty(target, propertyKey, {
      get() {
        return DomainRegistry.getInstance().inject(key);
      },
    });
  };
}
