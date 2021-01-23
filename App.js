import React, { useEffect } from 'react';

// Firebase
import { firebaseApp } from "./app/utils/firebase";

// Navigation
import Navigation from "./app/navigations/Navigation";

export default function App() {
  return (
    <Navigation />
  );
}
