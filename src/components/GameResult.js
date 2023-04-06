import { Link } from 'react-router-dom'

const GameResult = () => {
    return (
        <section className="gameResult">
            <div className="wrapper circleResult">
                <div className="gameResultContent">
                    <h2>Great Game</h2>

                    {/* here is where wer would display user score */}

                    <Link to='/'>Home</Link>
                    <Link to='/form'>Create a Game</Link>

                </div>
            </div>
        </section>
    )
}