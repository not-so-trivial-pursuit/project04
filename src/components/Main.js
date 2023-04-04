// Main.js
import axios from 'axios';
import app from './Firebase';
import { useState, useEffect } from 'react';
import { getDatabase, ref,  onValue, push } from 'firebase/database';
import IndivSavedGames from './IndivSavedGames';
import Form from './Form';
import Saved from './Saved';



const Main = () => {
    
    const [ trivia, setTrivia ] = useState([]);
    const [ numQuest, setNumQuest ] = useState(10);
    const [ questionCategory, setQuestionCategory ] = useState(0);
    const [ title, setTitle ] = useState('');

    const [ savedGames, setSavedGames ] = useState([]);
    console.log(savedGames)

    const handleNumSelection = (e) => {
        setNumQuest(e.target.value)
    }

    const handleCatSelection = (e) => {
        setQuestionCategory(e.target.value)
    }

    const handleTitleInput = (e) => {
        setTitle(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchData();
    }

    useEffect(()=>{

        const db = getDatabase(app);
        const dbRef = ref(db);

        onValue(dbRef, (dbGames) => {
            const dbObj = dbGames.val();

            const arrayOfGames = [];

            for (let key in dbObj) {
                const gameObj = {
                    title: dbObj[key],
                    id: key
                }

                arrayOfGames.push(gameObj);
            }

            setSavedGames(arrayOfGames);
            
        })

    }, [] )

    //   for(let key in dbObj){

    const fetchData = ()=>{

        axios({
            url: 'https://opentdb.com/api.php',
            params: {
                amount: numQuest,
                category: questionCategory,
                type: 'multiple'
            }
            
        }).then((apiData)=>{
            setTrivia(apiData.data.results)
            console.log(apiData.data.results)

            // We are pushing straight to firebase after our API call. We will need to (maybe) change this if we want to meet our stretch goal of allowing users to select whether they want to save game. 
            
            const db = getDatabase(app);
            const dbRef = ref(db);

            const newGame = { 
                userTitle: title,
                userCategory: 
                    (apiData.data.results[0].category === apiData.data.results[1].category && apiData.data.results[0].category === apiData.data.results[2].category && apiData.data.results[0].category === apiData.data.results[3].category ? apiData.data.results[0].category: 'Random Questions'),

                userGenGame: apiData.data.results,
            }

            push(dbRef, newGame);
            
        })

    }

    return (
        <>
            <Form 
            handleSubmit={handleSubmit}
            handleNumSelection ={ handleNumSelection }
            handleCatSelection = { handleCatSelection}
            handleTitleInput = { handleTitleInput }  
            titleInput = {title} />

            < Saved
            savedGames = {savedGames}/>
        </>
    )
}

export default Main;
