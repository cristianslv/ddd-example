import EventInterface from "../../@shared/event/event.interface";

export default class CustomerCreatedEvent implements EventInterface {
  dateTimeOccurred: Date;
  eventData: any;

  constructor(customer: any) {
    this.dateTimeOccurred = new Date();
    this.eventData = customer;
  }
}
