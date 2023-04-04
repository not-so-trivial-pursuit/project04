// Main.js
import axios from 'axios';
import { useState, useEffect } from 'react';
import Form from './Form';
import app from './Firebase';
import { getDatabase, ref,  onValue, push } from 'firebase/database';



const Main = () => {
    
    const [ trivia, setTrivia ] = useState([]);
    const [ numQuest, setNumQuest ] = useState(10);
    const [ questionCategory, setQuestionCategory ] = useState(0);
    const [ title, setTitle ] = useState('');
    const [ categoryString, setCategoryString ] = useState('');
    


    const handleSubmit = (event, selectorNum, selectorCat, catString, selectorTitle ) => {
        event.preventDefault();
        
        selectorNum !=="placeholder" ? setNumQuest(selectorNum) : setNumQuest(10);
        
        selectorCat !=="placeholder" ? setQuestionCategory(selectorCat) : setQuestionCategory(0);
        setCategoryString(catString);
        setTitle(selectorTitle);

        const db = getDatabase(app);
        const dbRef = ref(db);
        const newGame = { 
            userTitle: title,
            userCategory: categoryString,
            userGenGame: trivia,
        }
        push(dbRef, newGame)

}



    useEffect(()=>{

        axios({
            url: 'https://opentdb.com/api.php',
            params: {
                amount: numQuest,
                category: questionCategory,
                type: 'multiple'
            }
            
        }).then((apiData)=>{
            setTrivia(apiData.data.results)
            
        })

    }, [numQuest],[questionCategory])

    console.log(trivia);

    return (
        <Form 
        handleSubmit={handleSubmit}  />
    )
}

export default Main;