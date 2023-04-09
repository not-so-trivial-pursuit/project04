// CurrentQuestion.js
import { useState } from "react";
import { Link } from "react-router-dom";

const CurrentQuestion = (props) => {
  const [clickState, setClickState] = useState([false, false, false, false]);
  const [hasClicked, setHasClicked] = useState(false);

  const handleClick = (clickedIndex) => {
    const nextArray = clickState.map((state, nextArrIndex) => {
      if (nextArrIndex === clickedIndex) {
        return true;
      } else {
        return false;
      }
    });

    setClickState(nextArray);
    setHasClicked(true);
  };

  return (
    <li>
      <form className={props.triviaIndex}>
        <fieldset>
          <legend>
            {props.question
              .replace(/&quot;/g, '"')
              .replace(/&#039;/g, "'")
              .replace(/&rsquo;/g, "'")}
          </legend>
          <div className="answers">
            <div className="q1">
              <input
                type="radio"
                name="question"
                onClick={() => {
                  handleClick(0);
                }}
                className={
                  (props.triviaData[0] === props.correctAnswer
                    ? "correct"
                    : "") +
                  (clickState[0] === true ? " clicked" : "") +
                  (hasClicked ? " hasClicked" : "")
                }
              />
              <label htmlFor="">{props.triviaData[0]}</label>
            </div>

            <div className="q2">
              <input
                type="radio"
                name="question"
                onClick={() => {
                  handleClick(1);
                }}
                className={
                  (props.triviaData[1] === props.correctAnswer
                    ? "correct"
                    : "") +
                  (clickState[1] === true ? " clicked" : "") +
                  (hasClicked ? " hasClicked" : "")
                }
              />
              <label htmlFor="">{props.triviaData[1]}</label>
            </div>

            <div className="q3">
              <input
                type="radio"
                name="question"
                onClick={() => {
                  handleClick(2);
                }}
                className={
                  (props.triviaData[2] === props.correctAnswer
                    ? "correct"
                    : "") +
                  (clickState[2] === true ? " clicked" : "") +
                  (hasClicked ? " hasClicked" : "")
                }
              />
              <label htmlFor="">{props.triviaData[2]}</label>
            </div>

            <div className="q4">
              <input
                type="radio"
                name="question"
                onClick={() => {
                  handleClick(3);
                }}
                className={
                  (props.triviaData[3] === props.correctAnswer
                    ? "correct"
                    : "") +
                  (clickState[3] === true ? " clicked" : "") +
                  (hasClicked ? " hasClicked" : "")
                }
              />
              <label htmlFor="">{props.triviaData[3]}</label>
            </div>
          </div>
        </fieldset>
        <div className="gameEnd">
          <Link to="/gameResult">End Game</Link>
        </div>
      </form>
    </li>
  );
};

export default CurrentQuestion;
