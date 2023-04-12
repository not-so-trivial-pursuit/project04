// Saved.js
import app from "./Firebase";
import { getDatabase, ref, onValue } from "firebase/database";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import icon from "../assets/icon.png";

const Saved = (props) => {
  const navigate = useNavigate();
  const [savedGames, setSavedGames] = useState([]);

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
      setSavedGames(arrayOfGames);
    });
  }, []);

  // credits to: https://upmostly.com/tutorials/how-to-refresh-a-page-or-component-in-react
  function refreshPage() {
    window.location.reload(false);
  }

  return (
    <aside>
      <ul>
        {savedGames.map((indivGame) => {
          return (
            <li key={indivGame.id}>
              <Link onClick={refreshPage} to={`/individualSavedGame/${indivGame.id}`}>
                <span className="savedIcon">
                  <img
                    src={icon}
                    alt={`Quiz icon linking to ${indivGame.title.userTitle}`}
                    onClick={() =>
                      navigate(`/individualSavedGame/${indivGame.id}`)
                    }
                  />
                </span>
              </Link>

              <p className="savedTitle">{indivGame.title.userTitle}</p>
              <p className="savedCat">{indivGame.title.userCategory}</p>
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default Saved;
