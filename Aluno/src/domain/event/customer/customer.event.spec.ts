import Address from "../../entity/address";
import Customer from "../../entity/customer";
import EventDispatcher from "../@shared/event-dispatcher";
import SendConsoleLog1Handler from "./handler/send-console-log-1.handler";
import SendConsoleLog2Handler from "./handler/send-console-log-2.handler";
import SendConsoleLogWhenCustomerAddressIsChangedHandler from "./handler/send-console-log-when-customer-address-is-changed.handler";

describe("Customer events tests", () => {

    it("should trigger two events when a customer is created", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler1 = new SendConsoleLog1Handler();
        const eventHandler2 = new SendConsoleLog2Handler();

        const spyEventHandler1 = jest.spyOn(eventHandler1, "handle");
        const spyEventHandler2 = jest.spyOn(eventHandler2, "handle");

        eventDispatcher.register("CustomerCreatedEvent", eventHandler1);
        eventDispatcher.register("CustomerCreatedEvent", eventHandler2);

        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(2);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toContainEqual(eventHandler1);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toContainEqual(eventHandler2);

        let customer = new Customer("1", "Customer 1", eventDispatcher);
        expect(spyEventHandler1).toHaveBeenCalled();
        expect(spyEventHandler2).toHaveBeenCalled();
    })

    it("should trigger an event when address customer is changed", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendConsoleLogWhenCustomerAddressIsChangedHandler();
        const spyEventHandler = jest.spyOn(eventHandler, "handle");

        eventDispatcher.register("CustomerChangeAddressEvent", eventHandler);
        expect(eventDispatcher.getEventHandlers["CustomerChangeAddressEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["CustomerChangeAddressEvent"].length).toBe(1);
        expect(eventDispatcher.getEventHandlers["CustomerChangeAddressEvent"][0]).toMatchObject(eventHandler);

        let customer = new Customer("1", "Ben", eventDispatcher);
        let address = new Address("Rua 1", 123, "00000-000", "Neverland");
        customer.changeAddress(address, eventDispatcher);

        expect(spyEventHandler).toHaveBeenCalled();
    })
});