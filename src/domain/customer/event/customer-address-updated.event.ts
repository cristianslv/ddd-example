export default class CustomerAddressUpdatedEvent {
  dateTimeOccurred: Date;
  eventData: any;

  constructor(customer: any) {
    this.dateTimeOccurred = new Date();
    this.eventData = customer;
  }
}
