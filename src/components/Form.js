// Form.js
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import CurrentGame from "./CurrentGame";

const Form = (props) => {
  // ERROR HANDLING
  // currently users are able to submit the form without making any selections. Please revisit!!!
  const [numQuest, setNumQuest] = useState(10);
  const [questionCategory, setQuestionCategory] = useState(0);
  const [title, setTitle] = useState("");
  const [clickEvent, setClickEvent] = useState(false)

  console.log(numQuest)
  console.log(clickEvent)
  console.log(questionCategory)
  console.log(title);

  const handleNumSelection = (e) => {
    setNumQuest(e.target.value);
    console.log('hello numSelection')
  };

  const handleCatSelection = (e) => {
    setQuestionCategory(e.target.value);
    console.log('hello catSelection')
  };

  const handleTitleInput = (e) => {
    setTitle(e.target.value);
    console.log('hello titleSelection')
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // fetchData();
    setClickEvent(true);
    console.log('hello')
  };

  return (
    <>
    <section className="hidden">
      <CurrentGame 
          title={title}
          numQuest={numQuest}
          questionCategory={questionCategory}
          clickEvent={clickEvent}

      />      
    </section>


    <section className="form">
      <div className="wrapper circle">
        <div className="formContent">
        <h2>Create your very own Trivia Game!</h2>

        <form
          action=""
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <div className="categorySelect">
            <label htmlFor="category">Choose your preferred category</label>
            <select
              name=""
              id="category"
              onChange={handleCatSelection}
              required
            >
              {/* ***** Fix selected Error when refering to defaultValue or Value in console log  ****** */}
              <option value="Placeholder" disabled selected>
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
              <option value="Placeholder" disabled selected>
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
            required
            onChange={handleTitleInput}
            value={title}
            className ="nameGame"
            placeholder="Name the game"
          />

          <button>
            {/* {props.loading === true ? <>Loading..</> : <>Game On</>} */}
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

// need to add the loading animation for the api call!
// on submit clear all fields in the form
// other error handling 
// when user enters a number on title of the game, a logo is rendered to the page