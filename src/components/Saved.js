// Saved.js
import app from "./Firebase";
import { getDatabase, ref, onValue, push } from "firebase/database";
import { useState, useEffect } from "react";
import { Link, useNavigate, Routes, Route } from 'react-router-dom'
import icon from '../assets/icon.png'
import IndivSavedGames from "./IndivSavedGames";



const Saved = () => {
    
    const navigate = useNavigate();
    
    const [savedGames, setSavedGames] = useState([]);

    // Questions:
    // console.log(props.savedGames.originalData);
    // Answers:
    // console.log(props.savedGames.shuffledData);
    // Array of game objects from firebase:
    console.log(savedGames);




    useEffect(() => {
        const db = getDatabase(app);
        const dbRef = ref(db);

        onValue(dbRef, (dbGames) => {
            const dbObj = dbGames.val();

            const arrayOfGames = [];
            

            for (let key in dbObj) {
                const gameObj = {
                    title: dbObj[key],
                    id: key,
                };
                arrayOfGames.push(gameObj);
                
            }
            setSavedGames(arrayOfGames);
        });
    }, []);

    

    return (
        
        <aside>
            <h4>Choose from one of the saved games!</h4>

            <ul>
                {
                    savedGames.map((indivGame)=>{

                        return <li key={indivGame.id}>
                                
                            <Link to={`/individualSavedGame/${indivGame.id}`}>
                                        <span className='savedIcon'>
                                            <img
                                                src={icon}
                                                alt={`Quiz icon linking to ${indivGame.title.userTitle}`}
                                        onClick={() => navigate(`/individualSavedGame/${indivGame.id}`)} />
                                        </span>
                                    </Link>
                                
                            <p className='savedTitle'>{indivGame.title.userTitle}</p>
                            <p className='savedCat'>{indivGame.title.userCategory}</p>
                        </li>

                    })
                }
            </ul>
        </aside>


        
    )
}


export default Saved;