// IndivSavedGames.js
import app from "./Firebase";
import { getDatabase, ref, onValue } from "firebase/database";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {Routes, Route, Link} from 'react-router-dom'
import axios from "axios";
import SavedQuestion from "./SavedQuestion";


let triviaData = {};

const shuffleSaved = (array) => {
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

let selectedGame = [];
let selectedUserChoice = {};
let selectedQuestions = [];
let selectedCorrectAns = [];
let selectedIncorrectAns = [];
let valueSet = false
let selectedCat = '';
let gameCategory = null;
let selectedNum = null;

const IndivSavedGames = () => {

  const [savedTrivia, setSavedTrivia] = useState({ shuffledData: [], originalData: [] });
  const [games, setGames] = useState([]);
  const params = useParams();

  useEffect(() => {
    const db = getDatabase(app);
    const dbRef = ref(db);

    onValue(dbRef, (dbGames) => {
      const dbObj = dbGames.val();

      const arrayOfGames = [];

      for (let key in dbObj) {
        const gameObj = {
          title: dbObj[key],
          id: key,
        };
        arrayOfGames.push(gameObj);
      }
      setGames(arrayOfGames);
    });
  }, []);

console.log(games);

let arr = games.map((i) => {
    if (i.id === params.id) {
      return i;
    }
  });

  let singleGame = arr.filter((x) => {
    return x !== undefined;
  });



  if (singleGame.length >0 && !valueSet){
    selectedGame = singleGame[0].title.userGenGame;
    selectedUserChoice = singleGame[0].title
    selectedCat = selectedUserChoice.userCategory;
    selectedNum = selectedUserChoice.userGenGame.length;

    selectedQuestions = selectedGame.map((i) => {
      return i.question;
    });


    selectedCorrectAns = selectedGame.map((c) => {
      return c.correct_answer;
    });

    selectedIncorrectAns = selectedGame.map((c) => {
      let incorrAns = shuffleSaved(c.incorrect_answers);
      return incorrAns;
    });

    valueSet = true
}

  const apiCat = [
    { "num": 0, "name": "Random Game" },
    { "num": 9, "name": "General Knowledge" },
    { "num": 10, "name": "Entertainment: Books" },
    { "num": 11, "name": "Entertainment: Film" },
    { "num": 12, "name": "Entertainment: Music" },
    { "num": 13, "name": "Entertainment: Musical & Theatre" },
    { "num": 14, "name": "Entertainment: Television" },
    { "num": 15, "name": "Entertainment: Video Games" },
    { "num": 16, "name": "Entertainment: Board games" },
    { "num": 17, "name": "Science & Nature" },
    { "num": 18, "name": "Science: Computers" },
    { "num": 19, "name": "Science: Mathematics" },
    { "num": 20, "name": "Mythology" },
    { "num": 21, "name": "Sports" },
    { "num": 22, "name": "Geography" },
    { "num": 23, "name": "History" },
    { "num": 24, "name": "Politics" },
    { "num": 25, "name": "Art" },
    { "num": 26, "name": "Celebrities" },
    { "num": 27, "name": "Animals" },
    { "num": 28, "name": "Vehicles" },
    { "num": 29, "name": "Entertainment: Comics" },
    { "num": 30, "name": "Science: Gadgets" },
    { "num": 31, "name": "Entertainment: Japanese Anime & Manga" },
    { "num": 32, "name": "Entertainment: Cartoon & Animation" },
  ]

  let catMatch = apiCat.map((i) => {
    if (i.name === selectedCat) {
      return i.num
    }
  })

  let gameCategory = catMatch.find(e => e != undefined)

  const fetchSavedData = () => {
    axios({
      url: "https://opentdb.com/api.php",
      params: {
        amount: selectedNum,
        category: gameCategory,
        type: "multiple",
      },
    }).then((apiData) => {
      const shuffledArray = apiData.data.results.map((trivia) => {
        let myArray = [...trivia.incorrect_answers];
        myArray.push(trivia.correct_answer);

        return shuffleSaved(myArray);
      });
      console.log(shuffledArray);
      console.log(apiData.data.results);
      triviaData = {
        shuffledData: shuffledArray,
        originalData: apiData.data.results,
      };
      setSavedTrivia(triviaData);
    }
  )}
  
  console.log(savedTrivia);

  useEffect(()=>{
    fetchSavedData();
  },[selectedGame])



  let answerBank = savedTrivia.originalData.map((correctAns) =>
    correctAns.correct_answer
  )
  
return (
    <section className="currentGame">
      <div className="wrapper background">
        <div className="currentGameContent">
          <ul>
            <h2>{selectedCat}</h2>
            {savedTrivia.shuffledData.map((trivia, i) => {
              console.log(trivia)
              return (
                <SavedQuestion
                  triviaData={trivia}
                  triviaIndex={i}
                  correctAnswer={answerBank[i]}
                  correctArray={answerBank}
                  question={savedTrivia.originalData[i].question}
                />
              );
            })}
          </ul>

          <Link to='/gameResult'>End Game</Link>
        </div>
      </div>
    </section>
  )
}

export default IndivSavedGames;
