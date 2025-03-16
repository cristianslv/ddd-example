import OrderItem from "../entity/order_item";
import { v4 } from "uuid";
import Order from "../entity/order";

interface OrderProps {
  customerId: string;
  items: { name: string, productId: string; quantity: number; price: number }[];
}

export default class OrderFactory {
  static create(props: OrderProps): Order {
    const items = props.items.map((item) => new OrderItem(
      v4(),
      this.name,
      item.price,
      item.productId,
      item.quantity,
    ));

    return new Order(v4(), props.customerId, items);
  }
}
