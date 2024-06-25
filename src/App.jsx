import React, { useState, useEffect } from "react";
import patternDesktop from "./assets/images/pattern-divider-desktop.svg";
import patternMobile from "./assets/images/pattern-divider-mobile.svg";
import dice from "./assets/images/icon-dice.svg";
import axios from "axios";

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`https://api.adviceslip.com/advice`);
      setData(response.data.slip);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <main>
        <div className="advice-card">
          {loading ? (
            <h1 className="head-card">
              ADVICE&nbsp;&nbsp;#&nbsp;
              <span className="id-card">
                <span className="loading-dot">.</span>
                <span className="loading-dot">.</span>
                <span className="loading-dot">.</span>
              </span>
            </h1>
          ) : (
            <h1 className="head-card">
              ADVICE&nbsp;&nbsp;#&nbsp;
              <span className="id-card">{data?.id}</span>
            </h1>
          )}

          {loading ? (
            <p className="description-card loading">
              <span className="loading-letter">L</span>
              <span className="loading-letter">o</span>
              <span className="loading-letter">a</span>
              <span className="loading-letter">d</span>
              <span className="loading-letter">i</span>
              <span className="loading-letter">n</span>
              <span className="loading-letter">g</span>
            </p>
          ) : error ? (
            <p className="description-card error">{error.message}</p>
          ) : (
            <p className="description-card">&ldquo;{data?.advice}&rdquo;</p>
          )}

          <img
          className="pattern"
            src={patternDesktop}
            srcSet={`${patternMobile} 375w, ${patternDesktop}`}
            sizes="(max-width: 375px) 375px, (min-width: 376px) 100vw "
            alt="pattern"
          />
          <img
            className="button-card"
            src={dice}
            alt="dice"
            onClick={fetchData}
          />
        </div>
      </main>
  
      <footer>
        <p className="attribution">
          Challenge by{" "}
          <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">
            Frontend Mentor
          </a>
          . Coded by{" "}
          <a href="mailto:chaithawat.contact@gmail.com">Chaithawat Pinsuwan</a>.
        </p>
      </footer>
    </>
  );
}

export default App;
