import { firebaseService } from '../services/firebase.service';

export const firebaseConfig = {
  apiKey: "AIzaSyDdgiEj-xHxPVpR8aAy8IdkDVqFCGQaW0o",
  authDomain: "golf-games-f0dfd.firebaseapp.com",
  projectId: "golf-games-f0dfd",
  storageBucket: "golf-games-f0dfd.firebasestorage.app",
  messagingSenderId: "771272895445",
  appId: "1:771272895445:web:a6e0e98830eb1db698ab5c",
  measurementId: "G-0W6NBLRDN3"
};

export const initializeFirebase = async () => {
  try {
    await firebaseService.initialize(firebaseConfig);
    return firebaseService;
  } catch (error) {
    console.error('Firebase initialization error:', error);
    throw error;
  }
};