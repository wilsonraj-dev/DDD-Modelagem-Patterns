import SendEmailWhenProductIsCreatedHandler from "../product/handler/send-email-when-product-is-created.handler";
import EventDispatcher from "./event-dispatcher";

describe("Domain events tests", () => {
    
    it("Should register event handler", () => {

        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register("ProductCreateEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(1);
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);
    });

    it("Should unregister an event handler", () => {

        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();
        
        eventDispatcher.register("ProductCreateEvent", eventHandler);
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);

        eventDispatcher.unregister("ProductCreateEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers["ProductCreateEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["ProductCreateEvent"].length).toBe(0);
    });

    it("Should unregister all event handlers", () => {

        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();
        
        eventDispatcher.register("ProductCreateEvent", eventHandler);
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);

        eventDispatcher.unregisterAll();

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeUndefined();
    });
});