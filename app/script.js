import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';

function App() {

  const [status, setStatus] = useState('off');
  const [time, setTime] = useState(null);

  useEffect(() => {
    if (time === null) return;

    if (time === 0 && status === 'work') {
      setStatus('rest');
      setTime(20);
      playBell();
    } else if (time === 0 && status === 'rest') {
      setStatus('work');
      setTime(1200);
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
          <p>According to optometrists in order to save your eyes, you should follow the 20/20/20. It means you should to rest your eyes every 20 minutes for 20 seconds by looking more than 20 feet away.</p>
          <p>This app will help you track your time and inform you when it's time to rest.</p>
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
    setTime(1200);
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
      <h1>Protect your eyes</h1>
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
