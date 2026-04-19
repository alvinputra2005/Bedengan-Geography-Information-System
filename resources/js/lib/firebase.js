import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyBZCfYYpLe54Qj7Yx_Mio745B3HifpN_sY',
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'bedengan-gis.firebaseapp.com',
    databaseURL:
        import.meta.env.VITE_FIREBASE_DATABASE_URL || 'https://bedengan-gis-default-rtdb.firebaseio.com',
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'bedengan-gis',
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'bedengan-gis.firebasestorage.app',
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '1080746754923',
    appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:1080746754923:web:979b4dc8da9a1ff748c22e',
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || 'G-SR0MSBP6CG',
};

const app = initializeApp(firebaseConfig);

export const realtimeDb = getDatabase(app);
