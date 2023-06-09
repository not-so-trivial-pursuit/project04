// CurrentGame.js
import CurrentQuestion from "./CurrentQuestion";
import { Link } from "react-router-dom";

const CurrentGame = (props) => {

  const handleClick = () => {
    props.setTitle("")
  }

    let answerBank = props.trivia.originalData.map((correctAns) => 
      correctAns.correct_answer
    )
      return (
        <>
        {
        props.loading === true ? <div className='loading'><h2>something fun is on its way!</h2></div> :
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
                    key = {i}
                    />
                  );
                })}
              </ul>
                <div className="gameEnd">
                  <Link onClick={handleClick} to="/gameResult">End Game</Link>
                </div>
            </div>
          </div>
        </section>
        }
        </>
      );


  }

export default CurrentGame;

