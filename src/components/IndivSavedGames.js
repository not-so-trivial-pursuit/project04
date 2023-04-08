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
  // console.log(array);
  return array;
};

let selectedGame = [];
let selectedQuestions = []; 
let selectedCorrectAns = []; 
let selectedIncorrectAns = [];
let valueSet = false

const IndivSavedGames = () => {
  const [games, setGames] = useState([]);
  const [ ansArray, setAnsArray ] = useState([]);

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

  let singleGame = arr.filter((x) => {
    return x !== undefined;
  });



  if (singleGame.length >0 && !valueSet){
    selectedGame = singleGame[0].title.userGenGame;

    
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

let mySavedArray = () => {

    let myArray = [...selectedIncorrectAns];
        myArray.push(selectedCorrectAns);

    shuffleSaved(myArray);
    setAnsArray(myArray);
}
    mySavedArray();
   console.log(ansArray);
   
return (
    <section className="currentGame">
    <div className="wrapper background">
      <div className="currentGameContent">
        <ul>
          <h2>{singleGame.title}</h2>
          {selectedGame.map((trivia, i) => {
            // console.log(trivia)
            return (
              <SavedQuestion 
              triviaData ={trivia}
              triviaIndex = {i}
              question ={selectedQuestions[i]}
              correctAnswer={selectedCorrectAns[i]}
              // selectedIncorrectAns={selectedIncorrectAns}
            />
            );
          })}
        </ul>
      </div>
    </div>
  </section>
  );
};

export default IndivSavedGames;
