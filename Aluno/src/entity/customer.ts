import Address from "./address";

export default class Customer {
    _id: string;
    _name: string;
    _address!: Address;

    constructor(id: string, name: string) {
        this._id = id;
        this._name = name;
        this.validate();
    }

    validate() {
        if (this._name.length === 0) {
            throw new Error("Name is required");
        }
        if (this._id.length === 0) {
            throw new Error("Id is required");
        }
    }

    set Address(address: Address) {
        this._address = address;
    }
}