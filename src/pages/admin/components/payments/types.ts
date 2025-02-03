export interface Payment {
  id: string;
  project_id: string;
  milestone_id?: string;
  amount: number;
  status: string;
  payment_method: string;
  created_at: string;
  completed_at?: string;
  project: {
    title: string;
  };
  milestone?: {
    description: string;
  };
}

export interface PaymentStats {
  totalVolume: number;
  volumeChange: number;
  pendingCount: number;
  pendingChange: number;
  successCount: number;
  successChange: number;
  failedCount: number;
  failedChange: number;
}