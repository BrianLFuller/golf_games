import { useState, useCallback } from 'react';
import { authService, AuthError } from '../services/auth/auth.service';

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AuthError | null>(null);

  const signIn = useCallback(async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      await authService.signIn(email, password);
    } catch (err) {
      setError(err as AuthError);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    signIn,
    currentUser: authService.getCurrentUser()
  };
};