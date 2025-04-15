import Entity from "../../@shared/entity/entity.abstract";
import EventDispatcherInterface from "../../@shared/event/event-dispatcher.interface";
import NotificationError from "../../@shared/notification/notification.error";
import CustomerChangeAddressEvent from "../event/customer-change-address.event";
import CustomerCreatedEvent from "../event/customer-created.event";
import CustomerValidatorFactory from "../factory/customer.validator.factory";
import Address from "../value-object/address";

export default class Customer extends Entity{
    private _name: string = "";
    private _address!: Address;
    private _active: boolean = false;
    private _rewardPoints: number = 0;
  
    constructor(id: string, name: string, eventDispatcher:(EventDispatcherInterface | undefined) = undefined) {
      super();
      this._id = id;
      this._name = name;
      this.validate();

      if (this.notification.hasErrors()) {
        throw new NotificationError(this.notification.getErrors());
      }

      if (eventDispatcher) {
        eventDispatcher.notify(new CustomerCreatedEvent({
          id,
          name,
        }));
      }
    }    
  
    get name(): string {
      return this._name;
    }
  
    get rewardPoints(): number {
      return this._rewardPoints;
    }
  
    get address(): Address {
      return this._address;
    }

    get Address(): Address {
      return this._address;
    }

    validate() {
      CustomerValidatorFactory.create().validate(this);
    }
  
    changeName(name: string) {
      this._name = name;
      this.validate();
    }    
    
    changeAddress(address: Address, eventDispatcher:(EventDispatcherInterface | undefined) = undefined) {
      this._address = address;
      if (eventDispatcher) {
        eventDispatcher.notify(new CustomerChangeAddressEvent({
          id: this.id,
          name: this.name,
          address: address
        }));
      }
    }
  
    isActive(): boolean {
      return this._active;
    }
  
    activate() {
      if (this._address === undefined) {
        throw new Error("Address is mandatory to activate a customer");
      }
      this._active = true;
    }
  
    deactivate() {
      this._active = false;
    }
  
    addRewardPoints(points: number) {
      this._rewardPoints += points;
    }
  
    set Address(address: Address) {
      this._address = address;
    }
  }