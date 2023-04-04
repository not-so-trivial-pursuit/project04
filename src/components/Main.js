// Main.js
import axios from "axios";
import { useState, useEffect } from "react";
import Form from "./Form";
import app from "./Firebase";
import { getDatabase, ref, onValue, push } from "firebase/database";

const Main = () => {
  const [trivia, setTrivia] = useState([]);
  // const [ numQuest, setNumQuest ] = useState(10);
  // const [ questionCategory, setQuestionCategory ] = useState(0);
  const [title, setTitle] = useState("");
  const [savedGames, setSavedGames] = useState([]);
  console.log(trivia);

  const handleSubmit = (event, selectorNum, selectorCat, selectorTitle) => {
    event.preventDefault();

    // selectorNum !=="placeholder" ? setNumQuest(selectorNum) : setNumQuest(10);

    // selectorCat !=="placeholder" ? setQuestionCategory(selectorCat) : setQuestionCategory(0);

    setTitle(selectorTitle);

    newTriviaGame(selectorNum, selectorCat);

    const db = getDatabase(app);
    const dbRef = ref(db);
    // as a solution to the previous version of just trivia[0].category we added a function that would compare the first two indexes to ensure that it was not the random question game and if it was to reassign a new name
    // const categoryString = () =>{
    //     if (trivia[0].category == trivia[1].category){
    //         return trivia[0].category
    //     }else{
    //         return "Random Assortment of Questions"
    //     }
    // }

    const newGame = {
      userTitle: title,
      // we were not able to access the information from the onchange function but we notices that within the trivia array each object within the idexes held a value which coresponded with the value we were trying to access so we just used that instead...it might not be a catch all due to of use selects the random category option but its good for now
      // userCategory: categoryString(),
      userGenGame: trivia,
    };
    push(dbRef, newGame);
    // so this was working... until it didnt and the issue is that the push to firebase is a stepbehind the submit information, so basically the firebase is slow and doesnt have the most RECENT game saved but the previous one saved. we tried putting after use effect and also in use effect and also before the event.prevent default. our worry is that the most recent game wont be saved to public as it was created. it was somewhat working in the useeffect, until it gave us an error at trivia[0]. Unsure as to if this is the product of firebase being slow OR the logic of our code (and its order).

    // Second Issue: The API call does not seem to correspond with the user selection of category. This WAS working before; however, API is pulling the INCORRECT category upon user selection.
  };

  // 4 define a side effect which will run once on component mount (any subsequent updates to the db will be listened for via the firebase onValue module)
  useEffect(() => {
    // 5A use firebase modules to store our db and create a ref to it
    const db = getDatabase(app);
    const dbRef = ref(db);

    // 5B use the onValue module to listen for changes within out db whenever changes occur save the books in the bd into state aka call the state updater function
    // essentially eventlistener syntax we're listening to the db and every time we hear something we take the returned response and save it into state
    onValue(dbRef, (dbGames) => {
      // use the val method to parse the dbResponse into a comprehensive version of our db
      const dbObj = dbGames.val();
      console.log(dbObj);

                  // 6A our db stores our books within an object we want our books within an array so we can map through it 
                // 6B create an empty array 
      const arrayofGames = [];

    //   for(let key in dbObj){

    //   }
    },[]);
  });

  const newTriviaGame = (numQuest, questionCategory) => {
    axios({
      url: "https://opentdb.com/api.php",
      params: {
        amount: numQuest,
        category: questionCategory,
        type: "multiple",
      },
    }).then((apiData) => {
      setTrivia(apiData.data.results);
    });
  };

  // useEffect(()=>{
  //     axios({
  //         url: 'https://opentdb.com/api.php',
  //         params: {
  //             amount: numQuest,
  //             category: questionCategory,
  //             type: 'multiple'
  //         }

  //     }).then((apiData)=>{
  //         setTrivia(apiData.data.results)

  //     })

  // },[numQuest], [questionCategory] )

  return <Form handleSubmit={handleSubmit} />;
};

export default Main;
