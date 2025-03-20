import React, {createContext, useContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Create Theme Context
const ThemeContext = createContext<any>(null);

// ThemeProvider Component
export const ThemeProvider = ({children}: {children: React.ReactNode}) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Load saved theme
  useEffect(() => {
    const loadTheme = async () => {
      const savedTheme = await AsyncStorage.getItem('theme');
      if (savedTheme) {
        setIsDarkMode(savedTheme === 'dark');
      }
    };
    loadTheme();
  }, []);

  // Toggle Theme and Save it
  const toggleTheme = async () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    await AsyncStorage.setItem('theme', newMode ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{isDarkMode, toggleTheme}}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook to use Theme
export const useTheme = () => useContext(ThemeContext);
