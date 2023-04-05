import { Link } from "react-router-dom";

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
          {/* <Link to="/saved"> Saved Games </Link> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
