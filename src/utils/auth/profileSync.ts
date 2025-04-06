
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const syncUserProfile = async (
  userId: string,
  fullName: string,
  email: string,
  toastHandler?: ReturnType<typeof useToast>["toast"]
) => {
  try {
    console.log("Syncing user profile:", { userId, fullName });
    
    const { error } = await supabase
      .from('users')
      .upsert({
        id: userId,
        name: fullName,
        email: email
      }, {
        onConflict: 'id'
      });
    
    if (error) {
      console.error("Error syncing user profile:", error);
      throw error;
    }
  } catch (error: any) {
    console.error("Error syncing user profile:", error.message);
    if (toastHandler) {
      toastHandler({
        title: "Profile sync error",
        description: error.message,
        variant: "destructive"
      });
    }
  }
};
