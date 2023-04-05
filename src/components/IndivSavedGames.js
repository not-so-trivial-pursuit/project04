// IndivSavedGames.js


const IndivSavedGames = (props) => {


    console.log(props);



    return (
        <div>
            {props.savedGames.map((singleGame)=>{
                console.log(singleGame);
                const savedQues = Object.keys(singleGame.title.userGenGame);
                console.log(savedQues);
                return savedQues[0].question
                })
            }
        </div>
    )
}

export default IndivSavedGames;