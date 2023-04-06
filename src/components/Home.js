
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
          <Link to="/form"> Create a game</Link>
          </div>
        </div>
        <div className="homeRight">
        <h2>Scroll to select from saved games!</h2>
        <div className="saved">
            <Saved/>
        </div>
        </div>
      </div>
    </section>
  );
};

export default Home;