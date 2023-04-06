// CurrentGame.js
import { useState, useEffect, useMemo } from 'react';



const CurrentGame = (props) => {

    const [ userSelection, setUserSelection ] = useState('')
    const [ selectedValue, setSelectedValue ] = useState('')

    const [ question0, setQuestion0 ] = useState(false)
    const [ question1, setQuestion1 ] = useState(false)
    const [ question2, setQuestion2 ] = useState(false)
    const [ question3, setQuestion3 ] = useState(false)

    const handleClick0 = (e) => {
        setQuestion0(e.target.value)
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        setUserSelection(selectedValue)

        console.log(selectedValue)
    }

    const handleSelection = (e) => {
        setSelectedValue(e.target.value)
    }

    const shuffle = (array) => {
        let currentIndex = array.length, randomIndex;
    
        while (currentIndex != 0) {
    
            randomIndex = Math.floor(Math.random()*currentIndex);
            currentIndex--;
    
            [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
        }
        return array;
    }
    
    
    // const shuffledArray = props.playerSelectTrivia.map((trivia) => {

    //     let myArray = [...trivia.incorrect_answers];
    //     myArray.push(trivia.correct_answer);
    
    //     return ( shuffle(myArray) )
    
    // })
    
    return(
        <section>
            <div className="wrapper">
                <ul>
                    {
                        props.playerSelectTrivia.shuffledData.map((trivia, i) => {

                            return( 
                                <li>
                                    <form onSubmit={handleSubmit}>
                                        <fieldset onChange={handleSelection}>
                                            <legend>
                                            {
                                            props.playerSelectTrivia.originalData[i].question.replace(/&quot;/g, '\"').replace(/&#039;/g, '\'').replace(/&rsquo;/g, '\'')
                                            } 
                                            </legend>

                                            <div>
                                                <input type="radio"  name='question' value={trivia[0]}  />
                                                <label htmlFor="">{trivia[0]}</label>
                                            </div>

                                            <div>
                                                <input type="radio" name='question' value={trivia[1]}/>
                                                <label htmlFor="">{trivia[1]}</label>
                                            </div>
                                            <div>
                                                <input type="radio" name='question' value={trivia[2]}/>
                                                <label htmlFor="">{trivia[2]}</label>
                                            </div>
                                            <div>
                                                <input type="radio" name='question' value={trivia[3]}/><label htmlFor="">{trivia[3]}</label>
                                            </div>
                                        </fieldset>

                                        <button>Submit</button>
                                    </form>
                                </li>
                                )
                            }  
                        )
                    }

                </ul>
            </div>
        </section>
    
    )
}
export default CurrentGame;
