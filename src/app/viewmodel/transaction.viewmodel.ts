export class Transaction {
  transaction_id: number;
  user_id: number;
  created_at: string | null;
  payment_method: string;
  transaction_point: number;

  constructor(Transaction?: Transaction) {
    this.transaction_id = Transaction.transaction_id || 0;
    this.user_id = Transaction.user_id || 0;
    this.created_at = Transaction.created_at || null;
    this.payment_method = Transaction.payment_method || '';
    this.transaction_point = Transaction.transaction_point || 0;
  }
}