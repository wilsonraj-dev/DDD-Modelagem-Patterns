export default class OrderItem {
    private _id: string;
    private _productId: string;
    private _quantity: number;
    private _name: string;
    private _price: number;

    constructor(id: string, name: string, price: number, productId: string, quantity: number) {
        this._id = id;
        this._name = name;
        this._price = price;
        this._productId = productId;
        this._quantity = quantity;
    }

    get productId(): string {
        return this._productId;
    }

    get id(): string {
        return this._id;    
    }

    get name(): string {
        return this._name;
    }

    get price(): number {
        return this._price * this._quantity;
    }

    get quantity(): number {
        return this._quantity;
    }

    get total() : number {
        return this._price * this._quantity;
    }

    changeName(name: string) : void {
        this._name = name;
    }

    changeQuantity(quantity: number) : void {
        this._quantity = quantity;
    }
}