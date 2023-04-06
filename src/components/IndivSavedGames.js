// IndivSavedGames.js
import app from "./Firebase";
import { getDatabase, ref, onValue, push } from "firebase/database";
import { get } from "firebase/database";
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

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

        let singleGame = arr.find(e => e != undefined)
        console.log(singleGame);




    // call idMatch function in useEffect and dep. Array will be games state

    return (
        <div>
            <h5>hello</h5>

        </div>
    )
}

export default IndivSavedGames;