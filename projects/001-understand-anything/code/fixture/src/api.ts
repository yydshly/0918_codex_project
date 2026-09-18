import { createOrder } from './orders';

export function handleCheckout(quantity: number, unitPrice: number): string {
  return createOrder(quantity, unitPrice);
}
