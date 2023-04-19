import './index.scss';
import Nav from './components/Nav';
import Form from './components/Form';
import IndivSavedGames from './components/IndivSavedGames';
import GameResult from './components/GameResult';
import CurrentGame from './components/CurrentGame'
import Home from './components/Home';
import Footer from './components/Footer';
import Error from './components/Error';

import axios from "axios";
import { getDatabase, ref, push } from "firebase/database";
import app from "./components/Firebase";

import {Routes, Route} from 'react-router-dom'
import { useState } from "react";



const shuffle = (array) => {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
};

let triviaData = {};



function App() {

  const [numQuest, setNumQuest] = useState(null);
  const [questionCategory, setQuestionCategory] = useState(null);
  const [title, setTitle] = useState("");
  const [clickEvent, setClickEvent] = useState(false)

  const [trivia, setTrivia] = useState({ shuffledData: [], originalData: [] });
  const [loading, setLoading] = useState(false);

  const validateInput = ([ numQuest, questionCategory, title]) => {
    if (numQuest == null || questionCategory == null|| !title.trim()){
      return false;
    } else {
    return true
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const validInput = validateInput([ numQuest, questionCategory, title])

    if (!validInput) {
      // alert('please enter all fields')
      return null
    } 
      fetchData();
      setClickEvent(true);
  };

  const fetchData = () => {
      setLoading(true);
      axios({
      url: "https://opentdb.com/api.php",
      params: {
        amount: numQuest,
        category: questionCategory,
        type: "multiple",
      },
    }).then((apiData) => {
      const shuffledArray = apiData.data.results.map((trivia) => {
        let myArray = [...trivia.incorrect_answers];
        myArray.push(trivia.correct_answer);

        return shuffle(myArray);
      });

      triviaData = {
        shuffledData: shuffledArray,
        originalData: apiData.data.results,
      };

      setTrivia(triviaData);

      if (trivia) {
        setLoading(false);
      }

      const db = getDatabase(app);
      const dbRef = ref(db);

      const newGame = {
        userTitle: title,
        userCategory:
          apiData.data.results[0].category ===
            apiData.data.results[1].category &&
            apiData.data.results[0].category ===
            apiData.data.results[2].category &&
            apiData.data.results[0].category === apiData.data.results[3].category
            ? apiData.data.results[0].category
            : "Random Questions",

        userGenGame: apiData.data.results,
      };
      push(dbRef, newGame);
      } 
    )

    setNumQuest(null)
    setQuestionCategory(null)
  }

  const handleClick = () => {
    setTitle("")
  }

  return (
    <div className="App">
    <Nav handleClick={handleClick} setTitle={setTitle}/>
      <Routes>
        <Route path='/' element = {<Home />} />
        <Route path='/form' element={<Form 
          title={title}
          setTitle={setTitle}
          numQuest={numQuest}
          setNumQuest={setNumQuest}
          questionCategory={questionCategory}
          setQuestionCategory={setQuestionCategory}
          clickEvent={clickEvent}
          setClickEvent={setClickEvent}
          trivia={trivia}
          setTrivia={setTrivia}
          fetchData={fetchData}
          handleSubmit={handleSubmit}
          />}/>
          

        <Route path='/newGame' element={<CurrentGame 
          title={title}
          setTitle={setTitle}
          numQuest={numQuest}
          questionCategory={questionCategory}
          clickEvent={clickEvent}
          trivia={trivia}
          loading = {loading}
          />} />

        <Route path='/individualSavedGame/:id' element = {<IndivSavedGames />} />
        <Route path='/gameResult' element = {<GameResult />} />
        <Route path='/*' element = {<Error />} />
      </Routes>
    <Footer/>
    </div>

  );
}

export default App;