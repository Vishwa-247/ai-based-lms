
import { useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from 'react-router-dom';
import { syncUserProfile } from "@/utils/auth/profileSync";

export const useSignIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const signIn = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      
      // For demo purposes, we'll accept any credentials
      // This simulates a successful login without requiring a real Supabase connection
      const demoUser = {
        id: 'demo-user-id-123',
        email: email || 'demo@example.com',
        user_metadata: {
          full_name: 'Demo User',
          avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=demo'
        }
      };
      
      // Wait a moment to simulate network request
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Store the demo user in localStorage to persist across page refreshes
      localStorage.setItem('supabase.auth.token', JSON.stringify({
        currentSession: {
          access_token: 'demo-access-token',
          refresh_token: 'demo-refresh-token',
          user: demoUser
        }
      }));
      
      toast({
        title: "Welcome back!",
        description: "You have successfully signed in."
      });
      
      navigate('/dashboard');
    } catch (error: any) {
      toast({
        title: "Error signing in",
        description: error.message,
        variant: "destructive"
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { signIn, isLoading };
};
