// Form.js
import { Link } from "react-router-dom";


const shuffle = (array) => {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
};

let triviaData = {};

const Form = (props) => {


  const handleNumSelection = (e) => {
    props.setNumQuest(e.target.value);
  };

  const handleCatSelection = (e) => {
    props.setQuestionCategory(e.target.value);
  };

  const handleTitleInput = (e) => {
    props.setTitle(e.target.value);
  };


  return (
    <>

    <section className="form">
      <div className="wrapper circle">
        <div className="formContent">
        <h2>Create your very own Trivia Game!</h2>

        <form action="">
          <div className="categorySelect">
            <label htmlFor="category">Choose your preferred category</label>
            <select
              name=""
              id="category"
              onChange={handleCatSelection}
              required
            >
              <option value="Placeholder" disabled selected >
                Category
              </option>
              <option value="0">Random Game</option>
              <option value="9">General Knowledge</option>
              <option value="10">Books</option>
              <option value="11">Film</option>
              <option value="12">Music</option>
              <option value="13">Musical & Theatre</option>
              <option value="14">Television</option>
              <option value="15">Video Games</option>
              <option value="16">Board games</option>
              <option value="17">Science & Nature</option>
              <option value="18">Computers</option>
              <option value="19">Mathematics</option>
              <option value="20">Mythology</option>
              <option value="21">Sports</option>
              <option value="22">Geography</option>
              <option value="23">History</option>
              <option value="24">Politics</option>
              <option value="25">Art</option>
              <option value="26">Celebrities</option>
              <option value="27">Animals</option>
              <option value="28">Vehicles</option>
              <option value="29">Comics</option>
              <option value="30">Gadgets</option>
              <option value="31">Japanese Anime & Manga</option>
              <option value="32">Cartoon & Animation</option>
            </select>
          </div>

          <div className="numberSelect">
            <label htmlFor="numbers">Choose the desired number of questions</label>
            <select
              name=""
              id="numbers"
              onChange={handleNumSelection}
              required
            >
              <option value="Placeholder" disabled required selected>
                Number
              </option>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
              <option value="25">25</option>
              <option value="30">30</option>
            </select>
          </div>

          <label htmlFor="gameTitle" className="sr-only">
            Give your Game a title!
          </label>
          <input
            type="text"
            id="gameTitle"
            pattern="^[a-zA-Z]+$"
            // onKeyUp="(textonly prevent(e){
            //   let result = new valuePrevent('^[a-zA-Z]+$').test(e.value)
            //   return result;
            //   })"
            required
            onChange={handleTitleInput}
            value={props.title}
            className ="nameGame"
            placeholder="Name the game"
          />

              <button type="submit" onClick={(e) => { props.handleSubmit(e) }}>
                <Link to='/newGame'>
              Game On
            </Link>
          </button>
        </form>
        </div>
      </div>
    </section>


    </>
  );
};

export default Form;
