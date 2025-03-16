import Address from "../value-object/address";
import CustomerFactory from "./customer.factory";

describe("CustomerFactory unit tests", () => {
  it("should create a customer", () => {
    const customer = CustomerFactory.create("Customer A");

    expect(customer.id).toBeDefined();
    expect(customer.name).toBe("Customer A");
    expect(customer.Address).toBeUndefined();
  });

  it("should create a customer with an address", () => {
    const address = new Address("Main St", 123, "12345", "Springfield");
    const customer = CustomerFactory.createWithAddress("Customer A", address);

    expect(customer.id).toBeDefined();
    expect(customer.name).toBe("Customer A");
    expect(customer.Address.street).toBe("Main St");
    expect(customer.Address.number).toBe(123);
    expect(customer.Address.zip).toBe("12345");
    expect(customer.Address.city).toBe("Springfield");
  })
});
