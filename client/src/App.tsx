import React from 'react';
import './App.css';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './chakra/theme';
import { Navbar } from './components/navbar/Navbar';
import { RecoilRoot } from 'recoil';

function App() {
  return (
    <RecoilRoot>
      <ChakraProvider theme={theme}>
        <div className="App">
          <Navbar />
        </div>
      </ChakraProvider>
    </RecoilRoot>
  );
}

export default App;
