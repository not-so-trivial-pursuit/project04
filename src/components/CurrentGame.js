// CurrentGame.js
import { useState, useEffect } from 'react';

const CurrentGame = (props) => {
    return(
        <section>
            <div className="wrapper">
                <ul>
                    {props.playerSelectTrivia.map((trivia) => {
                        return(
                            <li>
                            <form>
                                <legend>
                                   {trivia.question.replace(/&quot;/g, '\"').replace(/&#039;/g, '\'')} 
                                </legend>
                                <div><input type="radio" /><label htmlFor=""></label></div>
                                <div><input type="radio" /><label htmlFor=""></label></div>
                                <div><input type="radio" /><label htmlFor=""></label></div>
                                <div><input type="radio" /><label htmlFor=""></label></div>
                            </form>
                            </li>
                        )
                    }  
                    )}
                </ul>
            </div>
        </section>
    
    )
}
export default CurrentGame;
