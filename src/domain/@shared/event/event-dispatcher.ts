import EventDispatcherInterface from "./event-dispatcher.interface";
import EventHandlerInterface from "./event-handler.interface";
import EventHandler from "./event-handler.interface";
import EventInterface from "./event.interface";

export default class EventDispatcher implements EventDispatcherInterface {
  private static instance: EventDispatcher;
  private eventHandlers: { [eventName: string]: EventHandlerInterface[] } = {};

  private constructor() {}

  static getInstance(): EventDispatcher {
    if (!EventDispatcher.instance) {
      EventDispatcher.instance = new EventDispatcher();
    }

    return EventDispatcher.instance
  }

  get getEventHandlers(): { [eventName: string]: EventHandlerInterface[] } {
    return this.eventHandlers;
  }

  notify(event: EventInterface): void {
    if (!this.eventHandlers[event.constructor.name]) {
      return;
    }

    this.eventHandlers[event.constructor.name].forEach((handler) => {
      handler.handle(event);
    });
  }

  register(eventName: string, eventHandler: EventHandler): void {
    if (!this.eventHandlers[eventName]) {
      this.eventHandlers[eventName] = [];
    }

    this.eventHandlers[eventName].push(eventHandler);
  }

  unregister(eventName: string, eventHandler: EventHandler): void {
    if (!this.eventHandlers[eventName]) {
      return;
    }

    this.eventHandlers[eventName] = this.eventHandlers[eventName].filter(
      (handler) => handler !== eventHandler
    );
  }

  unregisterAll(eventName: string): void {
    if (!this.eventHandlers[eventName]) {
      return;
    }

    delete this.eventHandlers[eventName];
  }
}
