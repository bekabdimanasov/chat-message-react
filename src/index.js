import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';

// Initialize Firebase
firebase.initializeApp({
  apiKey: 'AIzaSyDQWSpAcj7bGDcBPh-2Api047ddXte1VUI',
  authDomain: 'chat-react-5960e.firebaseapp.com',
  projectId: 'chat-react-5960e',
  storageBucket: 'chat-react-5960e.appspot.com',
  messagingSenderId: '983279073524',
  appId: '1:983279073524:web:85da7b2c5aed6bc639c6a1',
  measurementId: 'G-NQZQPC25M4',
});

export const Context = React.createContext(null);

const auth = firebase.auth();
const firestore = firebase.firestore();

ReactDOM.render(
  <Context.Provider
    value={{
      firebase,
      auth,
      firestore,
    }}>
    <App />
  </Context.Provider>,
  document.getElementById('root'),
);
