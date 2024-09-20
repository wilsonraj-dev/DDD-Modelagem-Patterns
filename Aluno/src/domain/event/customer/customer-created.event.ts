import EventInterface from "../@shared/event.interface";

export default class CustomerCreatedEvent implements EventInterface {
    
    dataTimeOccurred: Date;
    evenData: any;

    constructor(eventData: any) {
        this.dataTimeOccurred = new Date();
        this.evenData = eventData;
    }
}