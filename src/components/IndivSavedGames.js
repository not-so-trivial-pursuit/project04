// IndivSavedGames.js
import app from "./Firebase";
import { getDatabase, ref, onValue } from "firebase/database";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import SavedQuestion from "./SavedQuestion";

const correctAnswer = (userChoice, correctAnswer) => {
  if (userChoice === correctAnswer) {
    console.log("correct!");
  } else {
    console.log("wrong!");
  }
};

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
  console.log(array);
  return array;
};

const IndivSavedGames = () => {
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

  let arr = games.map((i) => {
    if (i.id === params.id) {
      return i;
    }
  });

const [ selectedGameState, setSelectedGameState ] = useState([]);

const [ selectedQuestionsState, setSelectedQuestionsState ] = useState([]);

const [ selectedCorrectAnsState, setSelectedCorrectAnsState ] = useState([]);

const [ selectedIncorrectAnsState, setSelectedIncorrectAnsState ] = useState([])

  
  let singleGame = arr.filter((x) => {
    return x !== undefined;
  });
if(singleGame.length>0){

    let selectedGame = singleGame[0].title.userGenGame;
    
    console.log(selectedGame);
  
    let selectedQuestions = selectedGame.map((i) => {
      return i.question;
    });
    
  
    console.log(selectedQuestions);
  
    // array of correct answers
    let selectedCorrectAns = selectedGame.map((c) => {
      return c.correct_answer;
    });
    
    console.log(selectedCorrectAns);
  
    // array of incorrect answers
    let selectedIncorrectAns = selectedGame.map((c) => {
      let incorrAns = shuffleSaved(c.incorrect_answers);
      return incorrAns;
    });
    return(
    setSelectedGameState(selectedGame) &&
    setSelectedQuestionsState(selectedQuestions) &&
    setSelectedCorrectAnsState(selectedCorrectAns) &&
    setSelectedIncorrectAnsState(selectedIncorrectAns)
    )
}

  return (
    <SavedQuestion
      selectedGame={selectedGameState}
      selectedQuestions={selectedQuestionsState}
      selectedCorrectAns={selectedCorrectAnsState}
      selectedIncorrectAns={selectedIncorrectAnsState}
    />
  );
};

export default IndivSavedGames;
