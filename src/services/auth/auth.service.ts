import { User } from '@nativescript/firebase-auth';
import { FirebaseInitializer } from '../firebase/initialize';

export interface AuthError {
  code: string;
  message: string;
}

class AuthService {
  async signIn(email: string, password: string): Promise<void> {
    try {
      const { auth } = FirebaseInitializer.getInstance();
      await auth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      throw {
        code: error.code || 'auth/unknown',
        message: error.message || 'An unknown error occurred'
      };
    }
  }

  async signOut(): Promise<void> {
    const { auth } = FirebaseInitializer.getInstance();
    await auth.signOut();
  }

  getCurrentUser(): User | null {
    const { auth } = FirebaseInitializer.getInstance();
    return auth.currentUser;
  }
}

export const authService = new AuthService();