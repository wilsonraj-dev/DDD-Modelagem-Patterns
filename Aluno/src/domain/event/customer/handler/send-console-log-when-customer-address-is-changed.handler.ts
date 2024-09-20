import EventHandlerInterface from "../../@shared/event-handler.interface";
import CustomerChangeAddressEvent from "../customer-change-address.event";

export default class SendConsoleLogWhenCustomerAddressIsChangedHandler implements EventHandlerInterface<CustomerChangeAddressEvent> {
    handle(event: CustomerChangeAddressEvent): void {
        console.log(`Endereço do cliente: ${event.evenData.id}, ${event.evenData.name} alterado para: ${event.evenData.address}`);
    }
}