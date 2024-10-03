import EventInterface from "../../@shared/event/event.interface";

export default class ProductCreatedEvent implements EventInterface {
    
    dataTimeOccurred: Date;
    evenData: any;

    constructor(eventData: any) {
        this.dataTimeOccurred = new Date();
        this.evenData = eventData;
    }
}