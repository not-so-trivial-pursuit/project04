// CurrentGame.js
import { useState, useEffect } from "react";
import CurrentQuestion from "./CurrentQuestion";
import { Link } from "react-router-dom";
import Form from "./Form";
import axios from "axios";
import { getDatabase, ref, push } from "firebase/database";
import app from "./Firebase";

const correctAnswer = (userChoice, correctAnswer) => {
    if (userChoice === correctAnswer){
        console.log('correct!')
    } else {
        console.log('wrong!')
    }

}

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



const CurrentGame = (props) => {

  const [trivia, setTrivia] = useState({ shuffledData: [], originalData: [] });
  // const [numQuest, setNumQuest] = useState(10);
  // const [questionCategory, setQuestionCategory] = useState(0);
  // const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);





console.log(props.numQuest)
console.log(props.clickEvent)
console.log(props.questionCategory)
console.log(props.title);

  // const handleNumSelection = (e) => {
  //   setNumQuest(e.target.value);
  //   console.log('hello numSelection')
  // };

  // const handleCatSelection = (e) => {
  //   setQuestionCategory(e.target.value);
  //   console.log('hello catSelection')
  // };

  // const handleTitleInput = (e) => {
  //   setTitle(e.target.value);
  //   console.log('hello titleSelection')
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   fetchData();
  //   console.log('hello')
  // };

  const fetchData = () => {
      axios({
        url: "https://opentdb.com/api.php",
        params: {
          amount: props.numQuest,
          category: props.questionCategory,
          type: "multiple",
        },
      }).then((apiData) => {

        console.log(apiData);
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



        // We are pushing straight to firebase after our API call. We will need to (maybe) change this if we want to meet our stretch goal of allowing users to select whether they want to save game.

        const db = getDatabase(app);
        const dbRef = ref(db);

        const newGame = {
          userTitle: props.title,
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
  };

  if (props.clickEvent === true) {
    fetchData();
  }


    let answerBank = trivia.originalData.map((correctAns) => 
      correctAns.correct_answer
    )
  

      return (
        <>
        <section className="currentGame">
          <div className="wrapper background">
            <div className="currentGameContent">
              <ul>
                <h2>{props.title}</h2>
                {trivia.shuffledData.map((trivia, i) => {
                  return (

                    <CurrentQuestion 
                    triviaData ={trivia}
                    triviaIndex = {i}
                    correctAnswer = {answerBank[i]}
                    question = {trivia.originalData[i].question}
                    
                    />
                  );
                })}
              </ul>
            </div>
          </div>
        </section>
        {/* <section className="hidden">
            <Form
              handleSubmit={handleSubmit}
              handleNumSelection={handleNumSelection}
              handleCatSelection={handleCatSelection}
              handleTitleInput={handleTitleInput}
              titleInput={title}
              loadingState={loading}
            />
        </section> */}
        </>
      );


  }

export default CurrentGame;

// clean up code add in some error handling add in the change state for user selection
