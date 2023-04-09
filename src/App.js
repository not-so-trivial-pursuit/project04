import './index.scss';
import Nav from './components/Nav';
import Main from './components/Main' 
import Form from './components/Form';
import Saved from './components/Saved';
import IndivSavedGames from './components/IndivSavedGames';
import GameResult from './components/GameResult';
import CurrentGame from './components/CurrentGame'
import Home from './components/Home';
import Footer from './components/Footer';
import Error from './components/Error';

import {Routes, Route} from 'react-router-dom'

function App() {
  return (
    <div className="App">
    <Nav />
      <Routes>
        <Route path='/' element = {<Home />} />
        {/* <Route path='/form' element = {<Form />} /> */}
        <Route path='/saved' element = {<Saved />} />
        <Route path='/individualSavedGame/:id' element = {<IndivSavedGames />} />
        <Route path='/newGame' element = {<CurrentGame />} />
        <Route path='/gameResult' element = {<GameResult />} />
        <Route path='*' element = {<Error />} />
      </Routes>
    <Main />
    <Footer/>
    </div>

  );
}

export default App;