import SendEmailWhenProductIsCreatedHandler from "../../product/event/handler/send-email-when-product-is-created.handler";
import ProductCreatedEvent from "../../product/event/product-created.event";
import EventDispatcher from "./event-dispatcher";

describe("Domain events tests", () => {
  it("should register event handler", () => {
    const eventDispatcher = EventDispatcher.getInstance();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(1);
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);
  });

  it("should unregister an event handler", () => {
    const eventDispatcher = EventDispatcher.getInstance();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);
    eventDispatcher.unregister("ProductCreatedEvent", eventHandler);

    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(1);
  });

  it("should unregister all event handlers", () => {
    const eventDispatcher = EventDispatcher.getInstance();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    eventDispatcher.unregisterAll("ProductCreatedEvent");

    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeUndefined();
  });

  it("should notify all event handlers", () => {
    const eventDispatcher = EventDispatcher.getInstance();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();
    const productCreatedEvent = new ProductCreatedEvent({
      name: "Product 1",
      description: "Product 1 description",
      price: 100,
    });
    const eventHandlerSpy = jest.spyOn(eventHandler, "handle");

    eventDispatcher.register("ProductCreatedEvent", eventHandler);
    eventDispatcher.notify(productCreatedEvent);

    expect(eventHandlerSpy).toBeCalledWith(productCreatedEvent);
  });
});
