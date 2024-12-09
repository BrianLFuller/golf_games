import { firebase } from '@nativescript/firebase-core';
import { Auth } from '@nativescript/firebase-auth';
import { firebaseConfig } from './firebase.config';

class FirebaseService {
  private static instance: FirebaseService;
  private _auth: Auth | null = null;

  private constructor() {}

  static getInstance(): FirebaseService {
    if (!FirebaseService.instance) {
      FirebaseService.instance = new FirebaseService();
    }
    return FirebaseService.instance;
  }

  async initialize(): Promise<void> {
    if (!firebase.apps.length) {
      await firebase.initializeApp(firebaseConfig);
    }
    this._auth = firebase.auth();
  }

  get auth(): Auth {
    if (!this._auth) {
      throw new Error('Firebase Auth not initialized');
    }
    return this._auth;
  }
}

export const firebaseService = FirebaseService.getInstance();