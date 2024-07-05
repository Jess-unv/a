import React, { createContext, useEffect, useState } from 'react';
import { authApp, firestoreApp } from '../config/firebase';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [globalMsg, setGlobalMsg] = useState('');

  const register = async (email, password) => {
    try {
      const userCredential = await authApp.createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;
      await firestoreApp.collection('users').doc(user.uid).set({
        email: user.email,
        role: 'user',
      });
    } catch (error) {
      setGlobalMsg(error.message);
    }
  };

  const login = async (email, password) => {
    try {
      await authApp.signInWithEmailAndPassword(email, password);
    } catch (error) {
      setGlobalMsg(error.message);
    }
  };

  const logout = async () => {
    try {
      await authApp.signOut();
    } catch (error) {
      setGlobalMsg(error.message);
    }
  };

  const bidAuction = async (auctionId) => {
    const bidAmount = 20; 
  
    try {
      if (!currentUser) {
        throw new Error('Please login first');
      }
  
      const db = firestoreApp.collection('auctions');
      const auctionSnapshot = await db.doc(auctionId).get();
  
      if (!auctionSnapshot.exists) {
        throw new Error('Auction not found');
      }
  
      const auctionData = auctionSnapshot.data();
      const currentTime = new Date();
  
      if (auctionData.endTime && currentTime > auctionData.endTime.toDate()) {
        throw new Error('The auction has already ended.');
      }
  
      const currentPrice = auctionData.curPrice || 0;
      const newPrice = parseFloat(currentPrice) + parseFloat(bidAmount);
  
      await db.doc(auctionId).update({
        curPrice: newPrice,
        curWinner: currentUser.email,
        bidHistory: firebase.firestore.FieldValue.arrayUnion({
          user: currentUser.email,
          bid: newPrice,
          time: firebase.firestore.Timestamp.now(),
        }),
      });
    } catch (error) {
      setGlobalMsg(error.message);
    }
  };
  

  const endAuction = async (auctionId) => {
    try {
      await firestoreApp.collection('auctions').doc(auctionId).delete();
    } catch (error) {
      setGlobalMsg(error.message);
    }
  };

  useEffect(() => {
    const unsubscribe = authApp.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setGlobalMsg('');
    }, 5000);

    return () => clearTimeout(timeout);
  }, [globalMsg]);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        register,
        login,
        logout,
        bidAuction,
        endAuction,
        globalMsg,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};
