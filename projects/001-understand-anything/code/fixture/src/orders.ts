import { reserveStock } from './inventory';
import { chargePayment } from './payment';
import { saveOrder } from './repository';

export function createOrder(quantity: number, unitPrice: number): string {
  if (!reserveStock(quantity)) throw new Error('Insufficient stock');
  const receipt = chargePayment(quantity * unitPrice);
  return saveOrder(quantity, receipt);
}
