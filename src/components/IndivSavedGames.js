// IndivSavedGames.js
import app from "./Firebase";
import { getDatabase, ref, onValue } from "firebase/database";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import CurrentQuestion from "./CurrentQuestion";

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
let selectedTitle = "";
let shuffledArray = [] 
let selectedQuestions = []; 
let selectedCorrectAns = []; 
let selectedIncorrectAns = [];
let valueSet = false;



const IndivSavedGames = (props) => {

  // const [games, setGames] = useState([]);
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
      props.setGames(arrayOfGames);
    });
  }, []);

  let arr = props.games.map((i) => {
    if (i.id === params.id) {
      return i;
    }
  });

  let singleGame = arr.filter((x) => {
    return x !== undefined;
  });


  if (singleGame.length > 0 && !valueSet) {

    selectedTitle = singleGame[0].title.userTitle;

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

    shuffledArray = selectedGame.map((trivia) => {
        let myArray = [...trivia.incorrect_answers];
        myArray.push(trivia.correct_answer);
        return shuffleSaved(myArray);
      })

    valueSet = true;
  }

  return (
    <section className="currentGame">
      <div className="wrapper background">
        <div className="currentGameContent">
        <h2>{selectedTitle}</h2>
          <ul>
            {shuffledArray.map((trivia, i) => {
              return (
                <CurrentQuestion
                  triviaData={trivia}
                  triviaIndex={i}
                  correctAnswer={selectedCorrectAns[i]}
                  question={selectedQuestions[i]}
                  key = {i}
                />
              );
            })}
          </ul>
          <div className="gameEnd">
            <Link to="/gameResult">End Game</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IndivSavedGames;
