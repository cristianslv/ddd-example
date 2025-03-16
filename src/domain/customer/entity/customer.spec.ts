import EventDispatcher from "../../@shared/event/event-dispatcher";
import CustomerAddressUpdatedEvent from "../event/customer-address-updated.event";
import CustomerCreatedEvent from "../event/customer-created.event";
import Address from "../value-object/address";
import Customer from "./customer";

describe("Customer unit tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    EventDispatcher.getInstance().unregisterAll("CustomerCreatedEvent");
    EventDispatcher.getInstance().unregisterAll("CustomerAddressUpdatedEvent");
  });

  it("should throw error when id is empty", () => {
    expect(() => {
      let customer = new Customer("", "John");
    }).toThrowError("Id is required");
  });

  it("should throw error when name is empty", () => {
    expect(() => {
      let customer = new Customer("123", "");
    }).toThrowError("Name is required");
  });

  it("should change name", () => {
    // Arrange
    const customer = new Customer("123", "John");

    // Act
    customer.changeName("Jane");

    // Assert
    expect(customer.name).toBe("Jane");
  });

  it("should activate customer", () => {
    const customer = new Customer("1", "Customer 1");
    const address = new Address("Street 1", 123, "13330-250", "São Paulo");
    customer.Address = address;

    customer.activate();

    expect(customer.isActive()).toBe(true);
  });

  it("should throw error when address is undefined when you activate a customer", () => {
    expect(() => {
      const customer = new Customer("1", "Customer 1");
      customer.activate();
    }).toThrowError("Address is mandatory to activate a customer");
  });

  it("should deactivate customer", () => {
    const customer = new Customer("1", "Customer 1");

    customer.deactivate();

    expect(customer.isActive()).toBe(false);
  });

  it("should add reward points", () => {
    const customer = new Customer("1", "Customer 1");
    expect(customer.rewardPoints).toBe(0);

    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(10);

    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(20);
  });

  it("should register event handlers", () => {
    const eventDispatcher = EventDispatcher.getInstance();
    const customer = new Customer("1", "Customer 1");

    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toHaveLength(2);
    expect(eventDispatcher.getEventHandlers["CustomerAddressUpdatedEvent"]).toHaveLength(1);
  })

  it("should publish customer created event", () => {
    const eventDispatcher = EventDispatcher.getInstance();
    const notifySpy = jest.spyOn(eventDispatcher, "notify");
    const customer = new Customer("1", "Customer 1");

    expect(notifySpy).toHaveBeenCalledTimes(1);
    expect(notifySpy).toHaveBeenCalledWith(expect.any(CustomerCreatedEvent));
  });

  it("should publish customer address updated event", () => {
    const eventDispatcher = EventDispatcher.getInstance();
    const notifySpy = jest.spyOn(eventDispatcher, "notify");
    const customer = new Customer("1", "Customer 1");

    customer.changeAddress(new Address("Street 1", 123, "13330-250", "São Paulo"));

    expect(notifySpy).toHaveBeenCalledTimes(2);
    expect(notifySpy).toHaveBeenCalledWith(expect.any(CustomerCreatedEvent));
    expect(notifySpy).toHaveBeenCalledWith(expect.any(CustomerAddressUpdatedEvent));
  });
});
