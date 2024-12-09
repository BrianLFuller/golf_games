import { User } from '@nativescript/firebase-auth';
import { firebaseService } from './firebase.service';

export interface AuthError {
  code: string;
  message: string;
}

class AuthService {
  async signIn(email: string, password: string): Promise<void> {
    try {
      await firebaseService.auth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      throw {
        code: error.code || 'auth/unknown',
        message: error.message || 'An unknown error occurred'
      };
    }
  }

  async signOut(): Promise<void> {
    await firebaseService.auth.signOut();
  }

  getCurrentUser(): User | null {
    return firebaseService.auth.currentUser;
  }
}

export const authService = new AuthService();