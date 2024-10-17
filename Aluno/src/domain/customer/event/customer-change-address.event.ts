import EventInterface from "../../@shared/event/event.interface";
import Address from "../value-object/address";

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