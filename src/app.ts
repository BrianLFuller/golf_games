import * as React from 'react';
import * as ReactNativeScript from 'react-nativescript';
import { FirebaseInitializer } from './services/firebase/initialize';
import { MainStack } from './components/navigation/MainStack';

// Controls react-nativescript log verbosity.
Object.defineProperty(global, '__DEV__', { value: false });

// Initialize Firebase and start the app
(async () => {
  try {
    await FirebaseInitializer.initialize();
    console.log('Starting application...');
    ReactNativeScript.start(React.createElement(MainStack, {}, null));
  } catch (error) {
    console.error('Failed to initialize app:', error);
    // Start with mock services in case of initialization failure
    ReactNativeScript.start(React.createElement(MainStack, {}, null));
  }
})();