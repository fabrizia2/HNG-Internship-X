import { initializeApp } from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBze-j1stRO9S3LB0dsep489wrjmgXVo4A",
    authDomain: "image-gallery-d814c.firebaseapp.com",
    projectId: "image-gallery-d814c",
    storageBucket: "image-gallery-d814c.appspot.com",
    messagingSenderId: "642526960040",
    appId: "1:642526960040:web:824d6d96d8362011f6659d",
    measurementId: "G-C2VZNR46RP"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
