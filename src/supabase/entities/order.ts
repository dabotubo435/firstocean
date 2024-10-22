export interface IOrder {
  id: string;
  cartId: string;
  amount: number;
  paid: boolean;
  delivered: boolean;
}
