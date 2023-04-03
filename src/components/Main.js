// Main.js
import axios from 'axios';
import { useState, useEffect } from 'react';
import Form from './Form';



const Main = () => {
    
    const [ trivia, setTrivia ] = useState([]);
    const [ numQuest, setNumQuest ] = useState(10);
    const [ questionCategory, setQuestionCategory ] = useState(0);

    const handleChange = (event, selectorNum, selectorCat ) => {
        event.preventDefault();
        
        selectorNum !=="placeholder" ? setNumQuest(selectorNum) : setNumQuest(10);

        setQuestionCategory(selectorCat)
        // selectorCat !=="placeholder" ? setCategory(selectorCat) : 

    }


    useEffect(()=>{

        axios({
            url: 'https://opentdb.com/api.php',
            params: {
                amount: numQuest,
                category: questionCategory
            }
            
        }).then((apiData)=>{
            // console.log(apiData.data.results)
            setTrivia(apiData.data.results)
        })

    }, [numQuest],[questionCategory])



    return (
        <Form handleChange={handleChange}/>
    )
}

export default Main;