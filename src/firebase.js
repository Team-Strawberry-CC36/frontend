// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyC5E7SpeO2qZy4LWZ39lOb8rWcyC6J6U0w',
  authDomain: 'japuri-cc36.firebaseapp.com',
  projectId: 'japuri-cc36',
  storageBucket: 'japuri-cc36.firebasestorage.app',
  messagingSenderId: '79348319174',
  appId: '1:79348319174:web:42ac285f208186f5c5a8c7',
  measurementId: 'G-CW8KW4DQWH',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
