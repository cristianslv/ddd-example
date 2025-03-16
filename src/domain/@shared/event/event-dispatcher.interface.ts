import EventHandler from "./event-handler.interface";
import EventInterface from "./event.interface";

export default interface EventDispatcherInterface {
  notify(event: EventInterface): void;
  register(eventName: string, handler: EventHandler): void;
  unregister(eventName: string, handler: EventHandler): void;
  unregisterAll(eventName: string): void;
}
