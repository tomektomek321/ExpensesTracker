import React from 'react';
import './App.css';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './chakra/theme';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <div className="App">
      Works!
    </div>

    </ChakraProvider>
  );
}

export default App;
