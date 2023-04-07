const SavedQuestion = (props) => {


    console.log(props.selectedGame);
    console.log(props.selectedQuestions);
    console.log(props.selectedCorrectAns);
    console.log(props.selectedIncorrectAns);

    return(
        <ul>
            <li>
                {props.selectedQuestions.map((q)=>{
                    return q
                })}
            </li>
            <li>
                {props.selectedCorrectAns.map((c)=>{
                    return c
                })}
            </li>
            <li>
                {props.selectedIncorrectAns.map((i)=>{
                    return i
                })}
            </li>
        </ul>
    )
}

export default SavedQuestion;