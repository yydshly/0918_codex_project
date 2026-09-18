export function saveOrder(quantity: number, receipt: string): string {
  return `demo-order:${quantity}:${receipt}`;
}
