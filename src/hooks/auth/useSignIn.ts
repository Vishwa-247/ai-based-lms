
import { useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from 'react-router-dom';

export const useSignIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const signIn = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      
      // For demo purposes, we'll accept any credentials
      // This simulates a successful login without requiring a real Supabase connection
      const username = email.split('@')[0];
      const demoUser = {
        id: `demo-user-id-${Math.random().toString(36).substring(2, 9)}`,
        email: email || 'demo@example.com',
        user_metadata: {
          full_name: username || 'Demo User',
          avatar_url: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username || 'demo'}`
        }
      };
      
      // Wait a moment to simulate network request
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Store the demo user in localStorage to persist across page refreshes
      localStorage.setItem('supabase.auth.token', JSON.stringify({
        currentSession: {
          access_token: `demo-access-token-${Math.random().toString(36).substring(2, 9)}`,
          refresh_token: `demo-refresh-token-${Math.random().toString(36).substring(2, 9)}`,
          user: demoUser
        }
      }));
      
      toast({
        title: `Welcome to StudyMate, ${demoUser.user_metadata.full_name}!`,
        description: "You have successfully signed in. Explore courses and mock interviews!"
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
