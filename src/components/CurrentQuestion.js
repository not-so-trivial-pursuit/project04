// CurrentQuestion.js
import { useState } from "react";

const CurrentQuestion = (props) => {
    
    const [ clickState, setClickState ] = useState([false, false, false, false]);
    const [ hasClicked, setHasClicked ] = useState(false)
    const [ correct, setCorrect ] = useState(false)

      const handleClick = (clickedIndex) => {

        const nextArray = clickState.map((state, nextArrIndex)=>{
            if ( nextArrIndex === clickedIndex) {
                return true
            } else {
                return false;
            }
        })

        setClickState(nextArray)

        let clickedIndexNum = nextArray.indexOf(true);

        if (props.triviaData[clickedIndexNum] === props.correctAnswer){
          setCorrect(true);
        } else {
          setCorrect(false)
        }
        
        setHasClicked(true)
      };

      // To help decode the html encoding credits to: https://tertiumnon.medium.com/js-how-to-decode-html-entities-8ea807a140e5
      function decodeText(text) {
        const textArea = document.createElement('textarea');
        textArea.innerHTML = text;
        return textArea.value;
    }

    return (
        <li key={`${props.correctAnswer}`}>
            <form
            className={props.triviaIndex}>

              <fieldset>
                <legend>
                  {decodeText(props.question)
                    }
                </legend>

                <div className="answers">
                  <div className="q1">
                    <input
                      type="radio"
                      id="one"
                      name="question"
                      onClick={()=>{handleClick(0)}}
                      
                    />
                  <label 
                    htmlFor="one" 
                    onClick={() => { handleClick(0) }} 
                      className={
                        (hasClicked && props.triviaData[0] === props.correctAnswer ? ' correct' : '') +
                        
                        (clickState[0] && props.triviaData[0] !== props.correctAnswer ? ' incorrect' : '') + 
                        (props.triviaData[0] === props.correctAnswer && correct === true ? " correct" : '') 
                      }>{decodeText(props.triviaData[0])}
                    </label>
                </div>

                <div className="q2">
                    <input
                    type="radio"
                    id="two"
                    name="question"       
                    onClick={()=>{handleClick(1)}}
                    />
                    <label htmlFor="two" onClick={() => { handleClick(1) }} 
                      className={
                        (hasClicked && props.triviaData[1] === props.correctAnswer ? ' correct' : '') + 
                        (clickState[1] && props.triviaData[1] !== props.correctAnswer ? ' incorrect' : '') + 
                        (props.triviaData[1] === props.correctAnswer && correct === true ? " correct" : '') 
                      }>{decodeText(props.triviaData[1])}
                    </label>
                </div>

                <div className="q3">
                  <input
                    type="radio"
                    id="three"
                    name="question"        
                    onClick={()=>{handleClick(2)}}      
                      
                  />
                  <label 
                    htmlFor="three" 
                    onClick={() => { handleClick(2) }} 
                      className={
                        (hasClicked && props.triviaData[2] === props.correctAnswer ? ' correct' : '') +
                        (clickState[2] && props.triviaData[2] !== props.correctAnswer ? ' incorrect' : '') + 
                        (props.triviaData[2] === props.correctAnswer && correct === true ? " correct" : '') 
                      }>{decodeText(props.triviaData[2])}
                  </label>
                </div>

                <div className="q4">
                  <input
                    type="radio"
                    id="four"
                    name="question"
                    onClick={()=>{handleClick(3)}}
                    
                  />

                  <label htmlFor="four" onClick={() => { handleClick(3) }} 
                    className={
                      (hasClicked && props.triviaData[3] === props.correctAnswer ? ' correct' : '') +
                      (clickState[3] && props.triviaData[3] !== props.correctAnswer ? ' incorrect' : '') + 
                      (props.triviaData[3] === props.correctAnswer && correct === true ? " correct" : '')
                      
                    }>{decodeText(props.triviaData[3])}
                  </label>
                </div>
                </div>
              </fieldset>
            </form>
          </li>
    )
}

export default CurrentQuestion;
