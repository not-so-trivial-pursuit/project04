import { Link } from "react-router-dom";
import Saved from "./Saved";

const Home = () => {
  return (
    <section className="home">
      <div className="wrapper flexHome">

        <div className="homeLeft">
          <h1>
            Customizable Trivia Games for <span>fun with friends</span>
          </h1>
          <div className="links">
          <Link to="/game"> Create a game</Link>
          {/* <Link to="/saved"> Saved Games </Link> */}
          </div>
        </div>

        <div className="saved">
          {/* <Saved/> */}
        </div>
      </div>
    </section>
  );
};

export default Home;
