import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';

function App() {

  const [status, setStatus] = useState('off');
  const [time, setTime] = useState(null);
  const [session, setSession] = useState(1);

  console.log(session);
  useEffect(() => {
    if (time === null) return;

    if (time === 0 && status === 'work') {
      setStatus('rest');
      playBell();
      setSession(session + 1);
      
      if(Number.isInteger(session / 4)) {
        setTime(1800);
      } else {
        setTime(300);
      }

    } else if (time === 0 && status === 'rest') {
      setStatus('work');
      setTime(1500);
      playBell();
    }

    const intervalId = setInterval(() => {
      setTime(time - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [time]);


  const formatTime = () => {

    let minutes = Math.floor((time / 60) % 60);
    let seconds = Math.floor(time % 60);

    if (minutes <= 9) {
      minutes = `0${minutes}`
    }

    if (seconds <= 9) {
      seconds = `0${seconds}`
    }

    if (minutes != 0 || seconds != 0) {
      return `${minutes}:${seconds}`
    }
  };

  const renderImage = () => {
    if (status === 'rest') {
      return <img src="./images/rest.png" />
    } else if (status === 'work') {
      return <img src="./images/work.png" />
    }
  };

  const renderDescription = () => {
    if (status === 'off') {
      return (
        <div>
          <p>The Pomodoro Technique is a productivity system that helps you take the right number of breaks while still getting your work done. Traditionally, it breaks up your day into 25-minute focus sessions followed by five-minute breaks. It's the perfect length of time for soaking up knowledge and getting things done—without burning out.</p>
          <p>A dedicated Pomodoro app removes the need to divide up your day manually—instead, it tells you exactly when to work and when to take a short break.</p>
        </div>
      )
    }
  };

  const renderButton = () => {
    if (status === 'off') {
      return <button className="btn"
        onClick={
          () => runTimer()}>
        Start</button>
    } else {
      return <button className="btn" onClick={() => stopTimer()}>Stop</button>
    }
  };

  const runTimer = () => {
    setTime(1500);
    setStatus('work');
  };

  const stopTimer = () => {
    setStatus('off');
    setTime(null);
  };

  const closeApp = () => {
    window.close();
  };

  const playBell = () => {
    const audioElement = new Audio('./sounds/bell.wav');
    audioElement.play();
  };

  return (
    <div>
      <h1>Pomodoro Timer</h1>
      {renderDescription()}
      {renderImage()}
      <div className="timer">
        {formatTime()}
      </div>
      {renderButton()}
      <button className="btn btn-close" onClick={() => closeApp()}>X</button>
    </div>
  );
};

render(<App />, document.querySelector('#app'));
