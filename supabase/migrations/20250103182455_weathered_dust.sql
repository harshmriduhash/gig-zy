/*
  # Payments and Transactions Schema

  1. New Tables
    - `payment_methods` - Stores supported payment methods
    - `transactions` - Records all financial transactions
    - `transaction_disputes` - Handles payment disputes

  2. Security
    - RLS policies for transaction visibility
    - Only involved parties can view their transactions
    - Strict status transition rules
*/

-- Create enum for payment methods
CREATE TYPE payment_method AS ENUM (
  'credit_card',
  'paypal',
  'stripe'
);

-- Create enum for transaction status
CREATE TYPE transaction_status AS ENUM (
  'pending',
  'processing',
  'completed',
  'failed',
  'disputed',
  'refunded'
);

-- Create transactions table
CREATE TABLE IF NOT EXISTS transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES projects(id) ON DELETE RESTRICT,
  milestone_id uuid REFERENCES milestones(id) ON DELETE RESTRICT,
  sender_id uuid REFERENCES users(id) ON DELETE RESTRICT,
  receiver_id uuid REFERENCES users(id) ON DELETE RESTRICT,
  amount numeric(10,2) NOT NULL,
  payment_method payment_method NOT NULL,
  status transaction_status DEFAULT 'pending',
  payment_intent_id text UNIQUE,
  payment_error text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  completed_at timestamptz,
  
  -- Ensure amount is positive
  CONSTRAINT positive_transaction_amount 
    CHECK (amount > 0),
    
  -- Ensure sender and receiver are different
  CONSTRAINT different_sender_receiver
    CHECK (sender_id != receiver_id)
);

-- Create transaction disputes table
CREATE TABLE IF NOT EXISTS transaction_disputes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  transaction_id uuid REFERENCES transactions(id) ON DELETE RESTRICT,
  raised_by uuid REFERENCES users(id) ON DELETE RESTRICT,
  reason text NOT NULL,
  evidence text,
  resolved_at timestamptz,
  resolution_notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE transaction_disputes ENABLE ROW LEVEL SECURITY;

-- Transaction policies
CREATE POLICY "Users can view their own transactions"
  ON transactions FOR SELECT
  TO authenticated
  USING (
    auth.uid() IN (sender_id, receiver_id)
  );

-- Transaction disputes policies
CREATE POLICY "Users can view disputes for their transactions"
  ON transaction_disputes FOR SELECT
  TO authenticated
  USING (
    transaction_id IN (
      SELECT id FROM transactions
      WHERE auth.uid() IN (sender_id, receiver_id)
    )
  );

CREATE POLICY "Users can create disputes for their transactions"
  ON transaction_disputes FOR INSERT
  TO authenticated
  WITH CHECK (
    transaction_id IN (
      SELECT id FROM transactions
      WHERE auth.uid() IN (sender_id, receiver_id)
    ) AND
    raised_by = auth.uid()
  );

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_transactions_project ON transactions(project_id);
CREATE INDEX IF NOT EXISTS idx_transactions_milestone ON transactions(milestone_id);
CREATE INDEX IF NOT EXISTS idx_transactions_sender ON transactions(sender_id);
CREATE INDEX IF NOT EXISTS idx_transactions_receiver ON transactions(receiver_id);
CREATE INDEX IF NOT EXISTS idx_transactions_status ON transactions(status);
CREATE INDEX IF NOT EXISTS idx_transactions_created ON transactions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_disputes_transaction ON transaction_disputes(transaction_id);

-- Create function to update transaction timestamp
CREATE OR REPLACE FUNCTION update_transaction_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for transaction timestamp updates
CREATE TRIGGER update_transaction_modified
  BEFORE UPDATE ON transactions
  FOR EACH ROW
  EXECUTE FUNCTION update_transaction_timestamp();

-- Create function to validate transaction status transitions
CREATE OR REPLACE FUNCTION validate_transaction_status_transition()
RETURNS TRIGGER AS $$
BEGIN
  -- Only allow specific status transitions
  IF OLD.status = 'pending' AND NEW.status NOT IN ('processing', 'failed') THEN
    RAISE EXCEPTION 'Invalid status transition from pending';
  ELSIF OLD.status = 'processing' AND NEW.status NOT IN ('completed', 'failed') THEN
    RAISE EXCEPTION 'Invalid status transition from processing';
  ELSIF OLD.status = 'completed' AND NEW.status NOT IN ('disputed', 'refunded') THEN
    RAISE EXCEPTION 'Completed transactions can only be disputed or refunded';
  ELSIF OLD.status IN ('failed', 'refunded') THEN
    RAISE EXCEPTION 'Final transaction status cannot be changed';
  END IF;

  -- Set completed_at timestamp when status changes to completed
  IF NEW.status = 'completed' AND OLD.status != 'completed' THEN
    NEW.completed_at = now();
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for status transitions
CREATE TRIGGER validate_transaction_status
  BEFORE UPDATE OF status ON transactions
  FOR EACH ROW
  EXECUTE FUNCTION validate_transaction_status_transition();

-- Create function to validate transaction amounts against milestone
CREATE OR REPLACE FUNCTION validate_transaction_amount()
RETURNS TRIGGER AS $$
DECLARE
  milestone_amount numeric;
BEGIN
  -- If transaction is linked to a milestone, validate amount matches
  IF NEW.milestone_id IS NOT NULL THEN
    SELECT amount INTO milestone_amount
    FROM milestones
    WHERE id = NEW.milestone_id;
    
    IF NEW.amount != milestone_amount THEN
      RAISE EXCEPTION 'Transaction amount must match milestone amount';
    END IF;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for amount validation
CREATE TRIGGER validate_transaction_amount
  BEFORE INSERT OR UPDATE OF amount, milestone_id ON transactions
  FOR EACH ROW
  EXECUTE FUNCTION validate_transaction_amount();