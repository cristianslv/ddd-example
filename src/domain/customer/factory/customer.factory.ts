import { v4 } from "uuid";
import Customer from "../entity/customer";
import Address from "../value-object/address";

export default class CustomerFactory {
  static create(name: string): Customer {
    return new Customer(v4(), name);
  }

  static createWithAddress(name: string, address: Address): Customer {
    const customer = new Customer(v4(), name);

    customer.changeAddress(address)

    return customer;
  }
}
