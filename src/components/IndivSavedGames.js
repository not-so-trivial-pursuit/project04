// IndivSavedGames.js

import icon from '../assets/icon.png'
import {useNavigate} from 'react-router-dom'

const IndivSavedGames = (props) => {

    const navigate = useNavigate();

    return (
        <div>
            <span className='savedIcon'>
                <img src={icon} alt="Quiz icon linking to saved game" onClick={() => navigate(`/${props.indivGame.id}`)} />
            </span>
            <p className='savedTitle'>{props.savedTitle}</p>
            <p className='savedCat'>{props.savedCat}</p>
        </div>
    )
}

export default IndivSavedGames;