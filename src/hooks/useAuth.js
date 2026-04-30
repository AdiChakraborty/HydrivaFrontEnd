import { useState, useCallback, useMemo } from "react";
import { supabase } from "../lib/supabase";

export function useAuth() {
  const [user, setUser] = useState(null);
  const [session, setSessionState] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // set session and persist to local storage
  const setSession = useCallback((session) => {
    setSessionState(session);
    if (session) {
      localStorage.setItem("supabase.auth.token", JSON.stringify(session));
    } else {
      localStorage.removeItem("supabase.auth.token");
    }
  }, []);

  // 🔔 Load user session on app start
  const loadSession = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }
    console.log("Current session::", data);
    setSession(data?.session);
    setUser(data?.session?.user);
    setLoading(false);
  }, []);

  //handle auth state changes
  const handleAuthChange = useCallback((event, session) => {
    console.log("Auth event::", event, session);
    if (event === "PASSWORD_RECOVERY") {
      const origin = window.location.origin;
      const resetUrl = `${origin}/reset-password`;
      if (window.location.href !== resetUrl) {
        window.location.href = resetUrl;
      }
    } else {
      setSession(session);
      setUser(session?.user ?? null);
    }
  }, []);

  // ✍️ Sign up
  const signUp = useCallback(async (email, password, redirectTo) => {
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signUp(
      { email, password },
      redirectTo ? { emailRedirectTo: redirectTo } : undefined,
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

    setSession(data?.session);
    setUser(data?.session?.user);
    setLoading(false);
    return true;
  }, []);

  //forgot password
  const sendPasswordResetLink = useCallback(async (email, redirectTo) => {
    setLoading(true);
    setError(null);
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: redirectTo,
    });
    if (error) {
      setError(error.message);
      setLoading(false);
      return false;
    }
    setLoading(false);
    return true;
  }, []);

  // reset password (after user clicks the link in email)
  const resetPassword = useCallback(async (password) => {
    setLoading(true);
    setError(null);
    const { data, error } = await supabase.auth.updateUser({ password });
    if (error) {
      setError(error.message);
      setLoading(false);
      return false;
    }
    setLoading(false);
    return true;
  }, []);

  //sign in with mobile and otp
  const signInWithOtp = useCallback(async (countryCode, phone) => {
    setLoading(true);
    setError(null);

    const { data, error } = await supabase.auth.signInWithOtp({
      phone: countryCode + phone,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return false;
    }

    setSession(data?.session);
    setUser(data?.session?.user);
    setLoading(false);
    return true;
  }, []);

  //verify mobile otp
  const verifyOtp = useCallback(async (countryCode, phone, token) => {
    setLoading(true);
    setError(null);

    const { data, error } = await supabase.auth.verifyOtp({
      phone: countryCode + phone,
      token,
      type: "sms",
    });
    if (error) {
      setError(error.message);
      setLoading(false);
      return false;
    }
    console.log("OTP verification successful::", data);
    setSession(data?.session);
    setUser(data?.session?.user);
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
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = "/";
  }, []);

  // 🔐 Access token (for backend API calls)
  const accessToken = useMemo(() => {
    if (session) {
      return session.access_token;
    }
    return null;
  }, [session]);

  // 👑 Role helpers
  const isAdmin = user?.user_metadata?.role === "admin";
  const isAuthenticated = !!user;

  return {
    loadSession,
    handleAuthChange,

    user,
    session,
    accessToken,
    loading,
    error,

    isAuthenticated,
    isAdmin,

    signUp,
    signIn,
    signOut,
    sendPasswordResetLink,
    resetPassword,
    signInWithOtp,
    verifyOtp,
  };
}
