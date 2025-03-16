import EventDispatcher from "../../@shared/event/event-dispatcher";
import CustomerAddressUpdatedEvent from "../event/customer-address-updated.event";
import CustomerCreatedEvent from "../event/customer-created.event";
import EnviaConsoleLog1Handler from "../event/handler/envia-console-log-1.handler";
import EnviaConsoleLog2Handler from "../event/handler/envia-console-log-2.handler";
import EnviaConsoleLogHandler from "../event/handler/envia-console-log.handler";
import Address from "../value-object/address";

export default class Customer {
  private _id: string;
  private _name: string = "";
  private _address!: Address;
  private _active: boolean = false;
  private _rewardPoints: number = 0;
  private _eventDispatcher: EventDispatcher;

  constructor(id: string, name: string) {
    this._id = id;
    this._name = name;
    this._eventDispatcher = EventDispatcher.getInstance();
    this.registerEventHandlers();

    this.validate();

    this.publishCustomerCreatedEvent();
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get rewardPoints(): number {
    return this._rewardPoints;
  }

  validate() {
    if (this._id.length === 0) {
      throw new Error("Id is required");
    }
    if (this._name.length === 0) {
      throw new Error("Name is required");
    }
  }

  changeName(name: string) {
    this._name = name;
    this.validate();
  }

  get Address(): Address {
    return this._address;
  }

  changeAddress(address: Address) {
    this._address = address;

    this.publishCustoerAddressUpdatedEvent();
  }

  isActive(): boolean {
    return this._active;
  }

  activate() {
    if (this._address === undefined) {
      throw new Error("Address is mandatory to activate a customer");
    }
    this._active = true;
  }

  deactivate() {
    this._active = false;
  }

  addRewardPoints(points: number) {
    this._rewardPoints += points;
  }

  set Address(address: Address) {
    this._address = address;
  }

  registerEventHandlers() {
    this._eventDispatcher.register("CustomerCreatedEvent", new EnviaConsoleLog1Handler());
    this._eventDispatcher.register("CustomerCreatedEvent", new EnviaConsoleLog2Handler());
    this._eventDispatcher.register("CustomerAddressUpdatedEvent", new EnviaConsoleLogHandler());
  }

  publishCustomerCreatedEvent() {
    this._eventDispatcher.notify(new CustomerCreatedEvent(this));
  }

  publishCustoerAddressUpdatedEvent() {
    this._eventDispatcher.notify(new CustomerAddressUpdatedEvent(this));
  }
}
