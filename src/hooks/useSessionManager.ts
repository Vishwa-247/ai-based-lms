
import { useState, useEffect } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { syncUserProfile } from '@/utils/auth/profileSync';

export const useSessionManager = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    
    async function initializeAuth() {
      try {
        if (mounted) setIsLoading(true);
        
        // Clear any existing session and user data first
        if (mounted) {
          setSession(null);
          setUser(null);
        }
        
        // Get current session (but don't persist) - we want users to log in each time
        const { data: { session } } = await supabase.auth.getSession();
        
        if (mounted && session) {
          setSession(session);
          setUser(session?.user ?? null);
          
          // Sync user profile if session exists
          if (session?.user) {
            const { id, email, user_metadata } = session.user;
            const fullName = user_metadata?.full_name || '';
            
            if (id && email) {
              await syncUserProfile(id, fullName, email);
            }
          }
        } else {
          // Ensure we clear any existing session data
          await supabase.auth.signOut();
        }
      } catch (error) {
        console.error("Auth initialization error:", error);
      } finally {
        if (mounted) setIsLoading(false);
      }
    }
    
    // Initialize auth
    initializeAuth();
    
    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (mounted) {
          setSession(session);
          setUser(session?.user ?? null);
          
          // Sync user profile if session exists
          if (session?.user) {
            const { id, email, user_metadata } = session.user;
            const fullName = user_metadata?.full_name || '';
            
            if (id && email) {
              await syncUserProfile(id, fullName, email);
            }
          }

          // If the user signs out, clear session data
          if (event === 'SIGNED_OUT') {
            setSession(null);
            setUser(null);
          }
        }
      }
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  return { session, user, isLoading };
};
