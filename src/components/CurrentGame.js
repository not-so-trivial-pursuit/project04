// CurrentGame.js
import { useState, useEffect } from 'react';



const CurrentGame = (props) => {

    const [ userSelection, setUserSelection ] = useState(null)

    const handleClick = (e) => {
        setUserSelection(e.target.value)
    }


    return(
        <section>
            <div className="wrapper">
                <ul>
                    {
                        props.playerSelectTrivia.map((trivia) => {
                            let myArray = [...trivia.incorrect_answers];
                            myArray.push(trivia.correct_answer)
                    
                            const shuffle = (array) => {
                                let currentIndex = array.length, randomIndex;
                    
                                while (currentIndex != 0) {
                    
                                    randomIndex = Math.floor(Math.random()*currentIndex);
                                    currentIndex--;
                    
                                    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
                                }
                                return array;
                            }
                            shuffle(myArray)
                            
                            return( 
                                <li>
                                    <form>
                                        <legend>
                                        {
                                        trivia.question.replace(/&quot;/g, '\"').replace(/&#039;/g, '\'')
                                        } 
                                        </legend>

                                        <div>
                                            <input type="radio" />
                                            <label htmlFor=""></label>{myArray[0]}
                                        </div>

                                        <div>
                                            <input type="radio" />
                                            <label htmlFor=""></label>{myArray[1]}
                                        </div>
                                        <div>
                                            <input type="radio" />
                                            <label htmlFor=""></label>{myArray[2]}
                                        </div>
                                        <div>
                                            <input type="radio" /><label htmlFor=""></label>{myArray[3]}
                                        </div>
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
