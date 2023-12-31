export interface Transaction {
  id: string;
  from: string;
  to: string;
  amount: string;
  status: {
    pending: boolean;
    accepted: boolean;
    rejected: boolean;
  };
}
