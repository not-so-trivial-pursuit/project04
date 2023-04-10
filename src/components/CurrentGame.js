// CurrentGame.js
import CurrentQuestion from "./CurrentQuestion";


const CurrentGame = (props) => {

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

