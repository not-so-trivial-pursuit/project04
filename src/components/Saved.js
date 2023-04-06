// Saved.js

import { Link, useNavigate } from 'react-router-dom'
import icon from '../assets/icon.png'
import { useMain } from './Main';


const Saved = ({children}) => {
    const {savedGames} = useMain();

    const navigate = useNavigate();

    

    return (
        <aside>
            <h4>Choose from one of the saved games!</h4>

            <ul>
                {
                    savedGames.map((indivGame)=>{
                        console.log(indivGame);
                        return <li key={indivGame.id}>
                            <Link to={`/indivSavedGames/${indivGame.id}`}>
                                <span className='savedIcon'>
                                    <img
                                        src={icon}
                                        alt={`Quiz icon linking to ${indivGame.title.userTitle}`}
                                        onClick={() => navigate(`/${indivGame.id}`)} />
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