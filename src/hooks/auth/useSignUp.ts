
import { useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from 'react-router-dom';
import { syncUserProfile } from "@/utils/auth/profileSync";

export const useSignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const signUp = async (email: string, password: string, fullName: string) => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            role: 'user',
          }
        }
      });
      
      if (error) throw error;
      
      // If sign up is successful and we have a user, sync with our users table
      if (data?.user) {
        await syncUserProfile(data.user.id, fullName, email, toast);
      }
      
      toast({
        title: "Account created!",
        description: "Check your email for the confirmation link."
      });
      
      // Redirect to dashboard if email confirmation is not required
      if (data?.session) {
        navigate('/dashboard');
      }
    } catch (error: any) {
      toast({
        title: "Error creating account",
        description: error.message,
        variant: "destructive"
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { signUp, isLoading };
};
