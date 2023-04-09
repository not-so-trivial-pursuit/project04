import { useState, useEffect } from "react";


const correctAnswer = (userChoice, correctAnswer) => {
  if (userChoice === correctAnswer) {
    console.log('correct!')
  } else {
    console.log('wrong!')
  }

}

const SavedQuestion = (props) => {
    
    const [ clickState, setClickState ] = useState([false, false, false, false]);
    const [ hasClicked, setHasClicked ] = useState(false);
    const [ correct, setCorrect ] = useState(false)

    console.log(props.correctArray);


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
        console.log(clickedIndexNum);

        // another if to tie this to other states
        if (props.triviaData[clickedIndexNum] === props.correctAnswer){
          setCorrect(true);
        } else {
          setCorrect(false)
        }

        setHasClicked(true)

      };

//   className = {
//     (clickState[0] === true ? 'clicked' : '') +
//     (hasClicked === true ? ' hasClicked' : '') +
//     (props.triviaData[0] === props.correctAnswer ? " correct" : '')
// }> { props.triviaData[0] }

  // <label
  //   htmlFor="one"
  //   onClick={() => { handleClick(0) }}
  //   className={
  //     (clickState[0] === true ? 'clicked' : '') +
  //     (hasClicked === true ? ' hasClicked' : '') +
  //     ((hasClicked === true && clickState[0] === true && props.triviaData[0] === props.correctAnswer) ? ' correct' : '')
  //   }>{props.triviaData[0]}</label>

  
    return (
      <>
        <li>
          <form
          className={props.triviaIndex}>

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
                    id="one"
                    name="question"
                    onClick={()=>{handleClick(0)}}
                    
                  />
                <label 
                htmlFor="one" 
                onClick={() => { handleClick(0) }} 
                  className={
                    (clickState[0] === true ? 'clicked' : '') +
                    (hasClicked === true ? ' hasClicked' : '') +
                    (correct === true ? " correct" : '')
                  }>{props.triviaData[0]}</label>
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
                    (clickState[0] === true ? 'clicked' : '') +
                    (hasClicked === true ? ' hasClicked' : '') +
                    (correct === true ? " correct" : '')
                  }>{props.triviaData[1]}</label>
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
                    (clickState[0] === true ? 'clicked' : '') +
                    (hasClicked === true ? ' hasClicked' : '') +
                    (correct === true ? " correct" : '')
                  }>{props.triviaData[2]}</label>
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
                    (clickState[0] === true ? 'clicked' : '') +
                    (hasClicked === true ? ' hasClicked' : '') +
                    (correct === true ? " correct" : '')
                  }>{props.triviaData[3]}</label>
                </div>
              </div>
            </fieldset>

          </form>
        </li>

      </>
    )
}


export default SavedQuestion;