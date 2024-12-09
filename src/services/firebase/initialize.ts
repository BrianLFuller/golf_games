import { firebase } from '@nativescript/firebase-core';
import { getAuth } from '@nativescript/firebase-auth';
import { getDatabase } from '@nativescript/firebase-database';
import { getAnalytics } from '@nativescript/firebase-analytics';
import { firebaseConfig } from './config';
import type { FirebaseServices } from './types';

export class FirebaseInitializer {
  private static instance: FirebaseServices | null = null;
  private static initializationPromise: Promise<FirebaseServices> | null = null;

  static async initialize(): Promise<FirebaseServices> {
    if (this.instance) {
      return this.instance;
    }

    if (this.initializationPromise) {
      return this.initializationPromise;
    }

    this.initializationPromise = (async () => {
      try {
        if (!firebase.apps.length) {
          const app = await firebase.initializeApp(firebaseConfig);
          const auth = getAuth(app);
          const database = getDatabase(app);
          const analytics = getAnalytics(app);

          this.instance = { auth, database, analytics };
          console.log('Firebase services initialized successfully');
        } else {
          const app = firebase.app();
          this.instance = {
            auth: getAuth(app),
            database: getDatabase(app),
            analytics: getAnalytics(app)
          };
        }
        
        return this.instance;
      } catch (error) {
        console.error('Firebase initialization failed:', error);
        this.instance = this.createMockServices();
        return this.instance;
      } finally {
        this.initializationPromise = null;
      }
    })();

    return this.initializationPromise;
  }

  static getInstance(): FirebaseServices {
    if (!this.instance) {
      throw new Error('Firebase services not initialized. Call initialize() first.');
    }
    return this.instance;
  }

  private static createMockServices(): FirebaseServices {
    console.warn('Using mock Firebase services for development/preview');
    return {
      auth: {
        currentUser: null,
        signInWithEmailAndPassword: async () => ({ user: null }),
        signOut: async () => {}
      } as any,
      database: {
        ref: () => ({
          set: async () => {},
          push: () => ({ key: 'mock-key' }),
          get: async () => ({ exists: () => false, val: () => null })
        })
      } as any,
      analytics: {
        logEvent: async () => {}
      } as any
    };
  }
}