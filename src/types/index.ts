export interface Product {
  _id: string;
  sku: string;
  name: string;
  price: number;
  image: any;
  description?: string;
  category?: string;
}

export interface CartItem extends Product {
  quantity: number;
}