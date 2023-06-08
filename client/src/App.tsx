import React from 'react';
import './App.css';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './chakra/theme';
import { Navbar } from './components/navbar/Navbar';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <div className="App">
        <Navbar />
      </div>
    </ChakraProvider>
  );
}

export default App;
