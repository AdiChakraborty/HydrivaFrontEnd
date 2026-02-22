import { useEffect, useState, useCallback } from "react";
import { supabase } from "../lib/supabase";

export function useAuth() {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🔄 Load session on app start
  useEffect(() => {
    console.log("hello from load")
    const loadSession = async () => {
      const { data, error } = await supabase.auth.getSession();

      console.log("load session", data)

      if (error) {
        setError(error.message);
      } else {
        setSession(data.session);
        setUser(data.session?.user ?? null);
      }

      setLoading(false);
    };

    loadSession();

    // 🔔 Listen to auth state changes
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  // ✍️ Sign up
  const signUp = useCallback(async (email, password, redirectTo) => {
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signUp(
      { email, password },
      redirectTo ? { emailRedirectTo: redirectTo } : undefined
    );

    if (error) {
      setError(error.message);
    }

    setLoading(false);
    return !error;
  }, []);

  // 🔑 Sign in
  const signIn = useCallback(async (email, password) => {
    setLoading(true);
    setError(null);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return false;
    }

    setSession(data.session);
    setUser(data.user);
    setLoading(false);
    return true;
  }, []);

  // 🚪 Logout
  const signOut = useCallback(async () => {
    setLoading(true);
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setLoading(false);
  }, []);

  // 🔐 Access token (for backend API calls)
  const getAccessToken = useCallback(async () => {
    const { data } = await supabase.auth.getSession();
    return data.session?.access_token ?? null;
  }, []);

  // 👑 Role helpers
  const isAdmin = user?.user_metadata?.role === "admin";
  const isAuthenticated = !!user;

  return {
    user,
    session,
    loading,
    error,

    isAuthenticated,
    isAdmin,

    signUp,
    signIn,
    signOut,
    getAccessToken,
  };
}