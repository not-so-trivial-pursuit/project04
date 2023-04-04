// Saved.js

import IndivSavedGames from './IndivSavedGames';


const Saved = (props) => {
    
    return (
        <aside>
            <h4>Choose from one of the saved games!</h4>

            {props.savedGames.map((indivGame)=>{
                console.log(indivGame)
                return <IndivSavedGames 
                indivGame={indivGame}
                savedTitle={indivGame.title.userTitle}
                savedCat={indivGame.title.userCategory}
                savedQs={indivGame.title.userGenGame}
                />
            })}
            
        </aside>
    )
}

export default Saved;