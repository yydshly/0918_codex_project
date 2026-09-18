export function chargePayment(amount: number): string {
  if (amount <= 0) throw new Error('Invalid amount');
  return `demo-receipt-${amount}`;
}
