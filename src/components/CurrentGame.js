// CurrentGame.js
import { useState, useEffect } from "react";
import CurrentQuestion from "./CurrentQuestion";
import { Link } from "react-router-dom";

const correctAnswer = (userChoice, correctAnswer) => {
    if (userChoice === correctAnswer){
        console.log('correct!')
    } else {
        console.log('wrong!')
    }

}

const CurrentGame = (props) => {

  if (props.playerSelectTrivia.originalData.length < 0 || props.playerSelectTrivia.originalData === undefined) {
    return null;
  }

  let answerBank = props.playerSelectTrivia.originalData.map((correctAns) => 
    correctAns.correct_answer
  )

  return (
    <section className="currentGame">
      <div className="wrapper background">
        <div className="currentGameContent">
          <ul>
            <h2>{props.title}</h2>
            {props.playerSelectTrivia.shuffledData.map((trivia, i) => {
              return (
                <CurrentQuestion 
                triviaData ={trivia}
                triviaIndex = {i}
                correctAnswer = {answerBank[i]}
                question = {props.playerSelectTrivia.originalData[i].question}
                
                />
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
};
export default CurrentGame;

// clean up code add in some error handling add in the change state for user selection
