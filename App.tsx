import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigation from './src/navigation/StackNavigation';
import {ThemeProvider} from './src/Themes/ThemeContext';
const App = () => {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <StackNavigation></StackNavigation>
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;
