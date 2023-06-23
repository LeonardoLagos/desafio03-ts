import {
  ChakraProvider
} from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom';
import {  AppContextProvider } from './components/AppContext';
import { Layout } from './components/Layout';
import MainRoutes from './routes';
import { QueryLocalStorage, createLocalStorage } from './services/storage';
import { UserContextProvider } from './components/UserContext';

function App() {

  !QueryLocalStorage('diobank') && createLocalStorage()

  return (
    <BrowserRouter>
      <AppContextProvider>
        <UserContextProvider>
        <ChakraProvider>
          <Layout>
            < MainRoutes />
          </Layout>
        </ChakraProvider>
        </UserContextProvider>
      </AppContextProvider>
    </BrowserRouter>
  );
}

export default App;
