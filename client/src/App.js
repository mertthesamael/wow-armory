import { QueryClient, QueryClientProvider } from 'react-query';
import './App.scss';
import Home from './pages/Home/Home';
import { DateContextWrapper } from './store/context';
import {Routes, Route} from "react-router-dom"
import CharPage from './pages/CharPage/CharPage';
function App() {

    const client = new QueryClient

  return (
    <DateContextWrapper>
      
      <QueryClientProvider client={client}>

      <div className="App">

        <Routes>
          

          <Route path='/' element={<Home />}/>
        <Route path='/character' element={<CharPage/>}/>


        </Routes>
      </div>

      </QueryClientProvider>
      
    </DateContextWrapper>
  );
}

export default App;
