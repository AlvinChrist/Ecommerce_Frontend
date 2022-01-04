export class Cart{
  user_id: number;
  product_id: number;
  product_qty: number;
  status: string;
  created_at: string | null;
  updated_at: string | null;
  transaction_id: string;

  constructor(Cart?: Cart) {
    this.user_id = Cart.user_id || 0;
    this.product_id = Cart.product_id || 0;
    this.product_qty = Cart.product_qty || 0;
    this.status = Cart.status || '';
    this.created_at = Cart.created_at || null;
    this.updated_at = Cart.updated_at || null;
    this.transaction_id = Cart.transaction_id || '';
  }
}