
-- Table to keep track of which prompts users have answered
CREATE TABLE public.responses_balance (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  prompt_id INTEGER NOT NULL,
  prompt_type TEXT NOT NULL CHECK (prompt_type IN ('question', 'thisOrThat')),
  answered_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  response TEXT
);

-- If you want to ensure user_id matches users in auth.users:
-- (But you CANNOT join from the client to auth.users, so for profile data consider a separate public.profiles table.)

-- Enable row level security (so users can only access their own data)
ALTER TABLE public.responses_balance ENABLE ROW LEVEL SECURITY;

-- Allow users to view their own responses
CREATE POLICY "Users can view their own responses"
  ON public.responses_balance
  FOR SELECT
  USING (auth.uid() = user_id);

-- Allow users to insert responses
CREATE POLICY "Users can insert their own responses"
  ON public.responses_balance
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Allow users to update their own responses
CREATE POLICY "Users can update their own responses"
  ON public.responses_balance
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Allow users to delete their own responses (optional)
CREATE POLICY "Users can delete their own responses"
  ON public.responses_balance
  FOR DELETE
  USING (auth.uid() = user_id);
