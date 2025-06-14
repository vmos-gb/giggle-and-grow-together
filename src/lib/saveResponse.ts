
import { supabase } from "@/integrations/supabase/client";

export async function saveResponse({
  userId,
  promptId,
  promptType,
  response,
}: {
  userId: string;
  promptId: number;
  promptType: "question" | "thisOrThat";
  response: string;
}) {
  const { error } = await supabase.from("responses_balance").insert([
    {
      user_id: userId,
      prompt_id: promptId,
      prompt_type: promptType,
      response,
    },
  ]);
  return { success: !error, error };
}
