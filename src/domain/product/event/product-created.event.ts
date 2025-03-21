import EventInterface from "../../@shared/event/event.interface";

export default class ProductCreatedEvent implements EventInterface {
  dateTimeOccurred: Date;
  eventData: any;

  constructor(product: any) {
    this.dateTimeOccurred = new Date();
    this.eventData = product;
  }
}
