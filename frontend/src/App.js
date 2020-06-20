import React, { useState } from 'react';
import './App.css';
import { FiArrowRight, FiLinkedin, FiGithub, FiMail } from 'react-icons/fi';

import logo from './assets/logo.png';

const hours = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const minutes = ['00', '05', 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];

function App() {
  const [resultHours, setResultHours] = useState([]);
  const [selectedHour, setSelectedHour] = useState('Hour');
  const [calculated, setCalculated] = useState(false);
  const [selectedAMPM, setSelectedAMPM] = useState('am');
  const [selectedMinutes, setSelectedMinutes] = useState('Minutes');
  const [selectedMode, setSelectedMode] = useState('wake up');

  function handleSelectedMode(event) {
    const mode = event.target.value;
    setSelectedMode(mode);
  }

  function handleSelectedHour(event) {
    const hour = event.target.value;
    setSelectedHour(hour);
  }

  function handleSelectedMinutes(event) {
    const minutes = event.target.value;
    setSelectedMinutes(minutes);
  }

  function handleSelectedAMPM(event) {
    const ampm = event.target.value;
    setSelectedAMPM(ampm);
  }

  function InvalidHourAndMinutes() {
    return (selectedHour === 'Hour' || selectedMinutes === 'Minutes');
  }

  function handleCalculateHours() {
    if (InvalidHourAndMinutes()) {
      return;
    }

    let hours = [];
    let totalMinutes = (selectedHour * 60 + Number(selectedMinutes));

    let hour, minutes, ampm;
    const cycles = [285, 90, 90, 90];

    for (let i = 0; i < 4; i++) {
      totalMinutes += (selectedMode === 'wake up') ? -cycles[i]: cycles[i];

      if (totalMinutes < 0) {
        totalMinutes += 720;
        ampm = (selectedAMPM === 'am') ? 'pm':'am';
      }

      if (totalMinutes > 720) {
        totalMinutes -= 720;
        ampm = (selectedAMPM === 'am') ? 'pm':'am';
      }

      hour = Math.floor(totalMinutes / 60);
      minutes = totalMinutes % 60;
      ampm = (ampm) ? ampm : selectedAMPM;

      if (hour === 0) {
        hour = 12;
      }

      hours.push(`${(hour < 10) ? '0' : ''}${hour}:${(minutes < 10) ? '0' : ''}${minutes} ${ampm}`);
    }
    
    if(selectedMode === 'wake up') {
      hours.reverse();
    }

    setResultHours(hours);

    setCalculated(true);
  }

  return (
    <>
      <div id="logo">
        <img alt="logo" src={logo}/>
        <p id="slogan">Sleeping well means growing healphy</p>
      </div>

      <div id="input">
        <p id="text">I want to...</p>

        <select value={selectedMode} onChange={handleSelectedMode} required>
          <option value="wake up">wake up at</option>
          <option value="go to bed">go to bed at</option>
        </select>

        <FiArrowRight color={'#F1F1F1'} size={24}/>
        
        <select id="hour" value={selectedHour} onChange={handleSelectedHour} required>
          <option value="0">Hour</option>
          { hours.map(hour => <option key={hour}>{hour}</option>) }
        </select>

        <p id="text">:</p>

        <select id="minutes" value={selectedMinutes} onChange={handleSelectedMinutes} required>
          <option value="-1">Minutes</option>
          { minutes.map(minute => <option key={minute}>{minute}</option>) }
        </select>

        <select id="ampm" value={selectedAMPM} onChange={handleSelectedAMPM}>
          <option value="am">am</option>
          <option value="pm">pm</option>
        </select>

        <button type="submit" onClick={handleCalculateHours}>Calculate</button>
      </div>

      { calculated ?
        <div id="message">
          <p>
            “Normally people take between<span id="highlighted">&nbsp;10 and 20 minutes&nbsp;</span>to fall   sleep.
          </p>
          <p>
            A good night's sleep consists of<span id="highlighted">&nbsp;5 or 6 complete sleep cycles</span>. These cycles last an average of<span id="highlighted">&nbsp;90<br/>minutes&nbsp;</span>and the ideal is to wake up between the end of one cycle and the beginning of another."
          </p>
           <p>
            Considering this, to have a <span id="highlighted">&nbsp;good night's sleep&nbsp;</span>you should<span id="highlighted">&nbsp;{(selectedMode === 'wake up') ? 'go to bed' : 'wake up'}&nbsp;</span>at any of these times:
           </p>
        </div>
        : <div id="message"><br/><br/><br/><br/><br/><br/></div>}

      <div id="output">
        { resultHours.map(result => <div id="result" key={result}>{result}</div>) }
      </div>

      <footer>
        <a href="https://www.linkedin.com/in/misael-augusto-b04073192/"><FiLinkedin size={40} style={{ marginLeft: 20 }}/></a>
        <div id="line"></div>
        <a href="https://mail.google.com/mail/u/0/?view=cm&fs=1&to=misael.costa@ccc.ufcg.edu.br&su=Feedback and Suggestions for Sleep Time&tf=1"><FiMail size={40} style={{ marginLeft: 20 }}/></a>
        <div id="line"></div>
        <a href="https://github.com/MisaelAugusto"><FiGithub size={40} style={{ marginLeft: 20 }}/></a>
      </footer>
    </>
  );
}

export default App;