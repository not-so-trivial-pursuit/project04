import './index.scss';
import Nav from './components/Nav';
import {Main} from './components/Main' 
import Saved from './components/Saved';
import IndivSavedGames from './components/IndivSavedGames';
import NavigateTo from './components/NavigateTo';
import Home from './components/Home';
import Footer from './components/Footer';
import Error from './components/Error';

import {Routes, Route} from 'react-router-dom'

function App() {
  return (
    <div className="App">
    <Nav />
    {/* <Home /> */}
    <Main >
      <Routes>
        <Route path='/' element = {<Home />} />
        <Route path='/game' element = {<NavigateTo />} />
        <Route path='/saved' element = {<Saved />} />
        <Route path='/individualSavedGame' element = {<IndivSavedGames />} />
        <Route path='/footer' element = {<Footer/>} />
        <Route path='*' element = {<Error />} />
      </Routes>
    </Main>
    <Footer/>
    </div>

  );
}

export default App;
