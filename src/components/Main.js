// Main.js
import axios from "axios";
import app from "./Firebase";
import { useState} from "react";
import { getDatabase, ref, push } from "firebase/database";

import Form from "./Form";
import CurrentGame from "./CurrentGame";

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

const Main = () => {
  const [trivia, setTrivia] = useState({ shuffledData: [], originalData: [] });
  const [numQuest, setNumQuest] = useState(10);
  const [questionCategory, setQuestionCategory] = useState(0);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);


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
  };

  const fetchData =  async () => {
     try {
      setLoading(true);
      await axios({
        url: "https://opentdb.com/api.php?",
        params: {
          amount: numQuest,
          category: questionCategory,
          type: "multiple",
        },
      }).then((apiData) => {
        setLoading(false);
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
      })
     }
     catch (error) {
      setLoading(false);
      console.error(error);
  }
  };
  return (
    <>
      <Form
        handleSubmit={handleSubmit}
        handleNumSelection={handleNumSelection}
        handleCatSelection={handleCatSelection}
        handleTitleInput={handleTitleInput}
        titleInput={title}
        loadingState = {loading}
      />

      <CurrentGame playerSelectTrivia={trivia} title={title} />      
    </>
    )
}

export default Main;

// add loading state
