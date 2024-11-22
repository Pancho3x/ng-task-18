import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'angular-typeorm',
        appId: '1:648044451143:web:1be2c7fdc356b692ef6862',
        storageBucket: 'angular-typeorm.firebasestorage.app',
        apiKey: 'AIzaSyDW5CNZcGHgZO-ZVkSpi6SRAmNnX2Yk0eY',
        authDomain: 'angular-typeorm.firebaseapp.com',
        messagingSenderId: '648044451143',
      })
    ),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
};
