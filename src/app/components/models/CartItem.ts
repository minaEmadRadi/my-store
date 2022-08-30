export class CartItem {

  id: number;
  name: string;
  price: number;
  amount?: number;
  url: string;
  description: string;

  constructor() {
    this.id = 1;
    this.name = '';
    this.price = 0.0;
    this.amount = 0;
    this.url = '';
    this.description = '';
  }

}
