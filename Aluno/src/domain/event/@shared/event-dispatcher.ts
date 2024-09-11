import EventDispatcherInterface from "./event-dispatcher.interface";
import EventHandlerInterface from "./event-handler.interface";
import EventInterface from "./event.interface";

export default class EventDispatcher implements EventDispatcherInterface {
    
    register(eventName: string, eventHandler: EventHandlerInterface): void {
        throw new Error("Method not implemented.");
    }

    unregister(eventName: string, eventHandler: EventHandlerInterface): void {
        throw new Error("Method not implemented.");
    }

    unregisterAll(): void {
        throw new Error("Method not implemented.");
    }

    notify(event: EventInterface): void {
        throw new Error("Method not implemented.");
    }    
}