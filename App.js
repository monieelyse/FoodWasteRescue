// App.js
import React from 'react';
import CreateAlertScreen from './src/screens/CreateAlertScreen';

// We’re passing a dummy navigation prop so submitAlert can call goBack()
export default function App() {
  return <CreateAlertScreen navigation={{ goBack: () => {} }} />;
}
