export default class OrderItem {
    private _id: string;
    private _productId: string;
    private _name: string;
    private _price: number;
    private _quantity: number;
  
    constructor(id: string, name: string, price: number, productID: string, quantity: number) {
      this._id = id;
      this._name = name;
      this._price = price;
      this._productId = productID;
      this._quantity = quantity;
    }
  
    get id(): string {
      return this._id;
    }
  
    get name(): string {
      return this._name;
    }
  
    get quantity(): number {
      return this._quantity;
    }
  
    get price():  number {
      return this._price;
    }
  
    get productId(): string {
      return this._productId;
    }
  
    get total(): number {
      return this._price * this._quantity;
    }
  }