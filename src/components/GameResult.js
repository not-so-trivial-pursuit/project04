import { Link } from "react-router-dom"


const GameResult = () => {
    return(
        <section className="gameResult">
            <div className="wrapper flexResult">
                <div className="gameResultContent">
                    <h2>Great Game!</h2>
                    {/* here is where we would display user score */}
                    <Link to="/" className="homeLink">Home</Link>
                    <Link to="/form">Create a Game</Link>
                </div>
            </div>
        </section>
    )
}

export default GameResult;
