// CurrentGame.js
import CurrentQuestion from "./CurrentQuestion";
import axios from "axios";
import { getDatabase, ref, push } from "firebase/database";
import app from "./Firebase";



const CurrentGame = (props) => {

console.log(props.trivia);
console.log(props.title)
console.log(props.trivia.shuffledData);
console.log(props.trivia.originalData)
console.log(props.numQuest);
console.log(props.questionCategory);

    let answerBank = props.trivia.originalData.map((correctAns) => 
      correctAns.correct_answer
    )
  

      return (
        <>
        <section className="currentGame">
          <div className="wrapper background">
            <div className="currentGameContent">
              <ul>
                <h2>{props.title}</h2>
                {props.trivia.shuffledData.map((trivia, i) => {
                  return (

                    <CurrentQuestion 
                    triviaData ={trivia}
                    triviaIndex = {i}
                    correctAnswer = {answerBank[i]}
                    question = {props.trivia.originalData[i].question}
                    
                    />
                  );
                })}
              </ul>
            </div>
          </div>
        </section>
        </>
      );


  }

export default CurrentGame;

// clean up code add in some error handling add in the change state for user selection
