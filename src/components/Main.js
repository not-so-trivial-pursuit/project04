// Main.js
import axios from 'axios';
import app from './Firebase';
import { useState, useEffect, useContext, createContext } from 'react';
import { getDatabase, ref,  onValue, push } from 'firebase/database';
import Form from './Form';
import Saved from './Saved';
import CurrentGame from './CurrentGame';

// const MainContext = createContext();

const Main = () => {
// export function Main({children}){
    
    const [ trivia, setTrivia ] = useState([]);
    console.log(trivia)
    const [ numQuest, setNumQuest ] = useState(10);
    console.log(numQuest)
    const [ questionCategory, setQuestionCategory ] = useState(0);
    console.log(questionCategory)
    const [ title, setTitle ] = useState('');

    const [ savedGames, setSavedGames ] = useState([]);

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
        // <MainContext.Provider 
        // value ={{
        //     handleSubmit,
        //     handleNumSelection, 
        //     handleCatSelection,
        //     handleTitleInput,
        //     title,
        //     savedGames,
        //     trivia
        // }}
        // >
        // <Form/>
        // <Saved/> 
        // <CurrentGame/>
        // {/* {children} */}
        // </MainContext.Provider>
        <>
        <Form 
        handleSubmit={handleSubmit}
        handleNumSelection ={ handleNumSelection }
        handleCatSelection = { handleCatSelection}
        handleTitleInput = { handleTitleInput }  
        titleInput = {title} />

        <Saved 
        savedGames = {savedGames}/>

        <CurrentGame playerSelectTrivia = {trivia} />
    </>
    )
}

// export function useMain() {
//     return useContext(MainContext);
// }

export default Main;