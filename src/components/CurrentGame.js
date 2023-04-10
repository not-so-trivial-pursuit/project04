// CurrentGame.js
import CurrentQuestion from "./CurrentQuestion";
import { Link } from "react-router-dom";

const CurrentGame = (props) => {

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
export default CurrentGame;


