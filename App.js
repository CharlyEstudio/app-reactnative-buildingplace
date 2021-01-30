import React, { useEffect } from 'react';
import { LogBox } from 'react-native';

// Firebase
import { firebaseApp } from "./app/utils/firebase";

// Navigation
import Navigation from "./app/navigations/Navigation";

LogBox.ignoreLogs(["Setting a timer", 'Animated: `useNativeDriver`']);

export default function App() {
  return (
    <Navigation />
  );
}
