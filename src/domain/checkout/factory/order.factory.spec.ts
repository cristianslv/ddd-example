import { v4 as uuid } from "uuid";
import OrderFactory from "./order.factory";

describe("OrderFactory unit tests", () => {
  it("should create an order", () => {
    const orderProps = {
      customerId: uuid(),
      items: [
        { name: "Item 1", productId: uuid(), quantity: 1, price: 100 },
        { name: "Item 2", productId: uuid(), quantity: 2, price: 200 },
      ],
    }

    const order = OrderFactory.create(orderProps);

    expect(order.id).toBeDefined();
    expect(order.customerId).toBe(orderProps.customerId);
    expect(order.items).toHaveLength(2);
  });
})
