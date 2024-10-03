import Address from "../../entity/address";
import EventInterface from "../../@shared/event.interface";

export default class CustomerChangeAddressEvent implements EventInterface {
    dataTimeOccurred: Date;
    evenData: {
        id: string,
        name: string,
        address: Address
    };

    constructor(eventData: any) {
        this.dataTimeOccurred = new Date();
        this.evenData = eventData;        
    }
}