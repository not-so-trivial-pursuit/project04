import './index.scss';
import Nav from './components/Nav';
import Main from './components/Main';
import Home from './components/Home';
import Footer from './components/Footer';
import Error from './components/Error';

import {Routes, Route, Link } from 'react-router-dom'


function App() {
  return (
    <div className="App">
    <Nav />
    <Main />

      <Routes>
        <Route path='/' element = {<Home />} />
        <Route path='/main' element = {<Main />} />
        <Route path='/footer' element = {<Footer/>} />
        <Route path='*' element = {<Error />} />
      </Routes>
    </div>

  );
}

export default App;
