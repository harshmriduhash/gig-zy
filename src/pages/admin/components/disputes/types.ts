export interface Dispute {
  id: string;
  transaction_id: string;
  client_id: string;
  freelancer_id: string;
  status: string;
  priority: string;
  reason: string;
  amount: number;
  created_at: string;
  resolved_at: string | null;
  client: {
    full_name: string;
  };
  freelancer: {
    full_name: string;
  };
  project: {
    title: string;
  };
}