// CurrentGame.js
import { useState } from "react";
import { Link } from "react-router-dom";


const CurrentGame = (props) => {
  const [userSelection, setUserSelection] = useState("");
  const [selectedValue, setSelectedValue] = useState("");

  const [question0, setQuestion0] = useState(false);
  const [question1, setQuestion1] = useState(false);
  const [question2, setQuestion2] = useState(false);
  const [question3, setQuestion3] = useState(false);

  const handleClick0 = (e) => {
    setQuestion0(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUserSelection(selectedValue);

    console.log(selectedValue);
  };

  const handleSelection = (e) => {
    setSelectedValue(e.target.value);
  };

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


  return (
    <section className="currentGame">
      <div className="wrapper background">
        <div className="currentGameContent">
          <ul>
            <h2>{props.title}</h2>
            {props.playerSelectTrivia.shuffledData.map((trivia, i) => {
              return (
                <li>
                  <form onSubmit={handleSubmit}>
                    <fieldset onChange={handleSelection}>
                      <legend>
                        {props.playerSelectTrivia.originalData[i].question
                          .replace(/&quot;/g, '"')
                          .replace(/&#039;/g, "'")
                          .replace(/&rsquo;/g, "'")}
                      </legend>
                      <div className="answers">
                        <div className="q1">
                          <input
                            type="radio"
                            name="question"
                            value={trivia[0]}
                          />
                          <label htmlFor="">{trivia[0]}</label>
                        </div>

                        <div className="q2">
                          <input
                            type="radio"
                            name="question"
                            value={trivia[1]}
                          />
                          <label htmlFor="">{trivia[1]}</label>
                        </div>

                        <div className="q3">
                          <input
                            type="radio"
                            name="question"
                            value={trivia[2]}
                          />
                          <label htmlFor="">{trivia[2]}</label>
                        </div>

                        <div className="q4">
                          <input
                            type="radio"
                            name="question"
                            value={trivia[3]}
                          />
                          <label htmlFor="">{trivia[3]}</label>
                        </div>
                      </div>
                    </fieldset>

                    <button>
                            Submit
                    </button>
                  </form>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
};
export default CurrentGame;


// clean up code add in some error handleing add in the change state for user selection 