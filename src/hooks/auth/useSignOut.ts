
import { useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const useSignOut = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const signOut = async () => {
    try {
      setIsLoading(true);
      
      // Call supabase signOut
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      toast({
        title: "Signed out",
        description: "You have been signed out successfully."
      });
      
      // Force navigation to home page
      window.location.href = "/";
    } catch (error: any) {
      toast({
        title: "Error signing out",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return { signOut, isLoading };
};
