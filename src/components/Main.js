// Main.js
import axios from 'axios';
import { useState, useEffect } from 'react';
import Form from './Form';



const Main = () => {
    
    const [ trivia, setTrivia ] = useState([]);
    const [ numQuest, setNumQuest ] = useState(10);
    const [ questionCategory, setQuestionCategory ] = useState(0);
    const [ title, setTitle ] = useState('');

    const handleSubmit = (event, selectorNum, selectorCat, selectorTitle ) => {
        event.preventDefault();
        
        selectorNum !=="placeholder" ? setNumQuest(selectorNum) : setNumQuest(10);
        
        selectorCat !=="placeholder" ? setQuestionCategory(selectorCat) : setQuestionCategory(0);

        setTitle(selectorTitle);
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