// Main.js
import axios from "axios";
import app from "./Firebase";
import { useState, useEffect, useContext, createContext } from "react";
import { getDatabase, ref, onValue, push } from "firebase/database";


const MainContext = createContext();

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

export function Main({children}) {

  const [trivia, setTrivia] = useState({ shuffledData: [], originalData: [] });
  console.log(trivia)
  const [numQuest, setNumQuest] = useState(10);
  const [questionCategory, setQuestionCategory] = useState(0);
  const [title, setTitle] = useState("");
  const [savedGames, setSavedGames] = useState([]);
  const [showCurrentGame, setShowCurrentGame] = useState(false)
 
  const handleNumSelection = (e) => {
    setNumQuest(e.target.value);
  };

  const handleCatSelection = (e) => {
    setQuestionCategory(e.target.value);
  };

  const handleTitleInput = (e) => {
    setTitle(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
    setShowCurrentGame(true);
  };

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

      setSavedGames(arrayOfGames);
    });
  }, []);

  //   for(let key in dbObj){

  const fetchData = () => {
    axios({
      url: "https://opentdb.com/api.php",
      params: {
        amount: numQuest,
        category: questionCategory,
        type: "multiple",
      },
    }).then((apiData) => {
      // console.log(apiData)
      console.log(apiData.data.results)

      const shuffledArray = apiData.data.results.map((trivia) => {
        let myArray = [...trivia.incorrect_answers];
        myArray.push(trivia.correct_answer);

        return shuffle(myArray);
      });

      triviaData = {
        shuffledData: shuffledArray,
        originalData: apiData.data.results,
      };

      // console.log(triviaData);
      setTrivia(triviaData);

      // console.log(trivia);

      // setTrivia(apiData.data.results)
      // console.log(apiData.data.results)

      // We are pushing straight to firebase after our API call. We will need to (maybe) change this if we want to meet our stretch goal of allowing users to select whether they want to save game.

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
    });
  };

  return (
       <MainContext.Provider 
        value ={{
            handleSubmit,
            handleNumSelection, 
            handleCatSelection,
            handleTitleInput,
            title,
            savedGames,
            trivia,
            showCurrentGame
        }}
        >
          {children}
        </MainContext.Provider>
  );
};


export function useMain() {
    return useContext(MainContext);
}