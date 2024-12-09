import { Auth } from '@nativescript/firebase-auth';
import { Analytics } from '@nativescript/firebase-analytics';
import { Database } from '@nativescript/firebase-database';

export interface FirebaseServices {
  auth: Auth;
  database: Database;
  analytics: Analytics;
}

export interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId: string;
}