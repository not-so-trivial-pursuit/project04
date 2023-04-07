// IndivSavedGames.js
import app from "./Firebase";
import { getDatabase, ref, onValue } from "firebase/database";
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

const shuffleSaved = (array) => {
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
    console.log(array);
    return array;
};


const IndivSavedGames = () => {
    
    const [games, setGames] = useState([]);
    
    const params = useParams();
    
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
            setGames(arrayOfGames);
        });
    }, []);
    
    
    
        let arr = games.map((i)=>{
            if (i.id === params.id) {
                return i;
            }
        })
    
        // array holding info of a single game
        let singleGame = arr.find(e => e != undefined)
        console.log(singleGame);

        let selectedGame = singleGame.title.userGenGame;
        console.log(selectedGame);

        // array of questions
        let selectedQuestions = selectedGame.map(i=>{
            return i.question
        })
        
        console.log(selectedQuestions);

        // array of correct answers
        let selectedCorrectAns = selectedGame.map((c)=>{
            return c.correct_answer
        })

        console.log(selectedCorrectAns);

        // array of incorrect answers
        let selectedIncorrectAns = selectedGame.map((c) => {
            let incorrAns = shuffleSaved(c.incorrect_answers)
            return incorrAns
        })

    console.log(selectedIncorrectAns);



    // call idMatch function in useEffect and dep. Array will be games state

    return (
        <div>
            <p>{selectedQuestions[0]}</p>
            <p>{selectedCorrectAns[0]}</p>
            <p>{selectedIncorrectAns[0]}</p>

        </div>
    )
}

export default IndivSavedGames;