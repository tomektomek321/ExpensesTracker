import React from 'react';
import './App.css';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './chakra/theme';
import { Navbar } from './components/navbar/Navbar';
import { RecoilRoot } from 'recoil';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import MyCategories from './pages/MyCategories';
import MySubscriptions from './pages/MySubscriptions';

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <ChakraProvider theme={theme}>
          <div className="App">
            <Navbar />
            <Routes>
              <Route index element={<Home />} />
              <Route path="categories" element={<MyCategories />} />
              <Route path="subsciptions" element={<MySubscriptions />} />
            </Routes>
          </div>
        </ChakraProvider>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
