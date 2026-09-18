export function reserveStock(quantity: number): boolean {
  return quantity > 0 && quantity <= 100;
}
