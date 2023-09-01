import { useRef, useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faArrowDown} from '@fortawesome/free-solid-svg-icons'
import {faArrowUp} from '@fortawesome/free-solid-svg-icons'
import {faPlay} from '@fortawesome/free-solid-svg-icons'
import {faArrowsRotate} from '@fortawesome/free-solid-svg-icons'
import {faFreeCodeCamp, faLinkedin} from '@fortawesome/free-brands-svg-icons'

let sessionCount = null;
let breakCount = null;

function App() {
  
  const [sessionLength, setSession] = useState(1500000);
  const [breakLength, setBreak] = useState(300000);
  const [displaySession, setDisplaySession] = useState(25);
  const [displayBreak, setDisplayBreak] = useState(5);
  const alarm = useRef(null);

  let breakMinutes = Math.floor(breakLength/1000/60);
  let breakSeconds = Math.round(((breakLength/1000/60) - breakMinutes) * 60);
  let sessionMinutes = Math.floor(sessionLength/1000/60);
  let sessionSeconds = Math.round(((sessionLength/1000/60) - sessionMinutes) * 60);
  let sessionFormat = sessionMinutes.toString().padStart(2,'0')+':'+sessionSeconds.toString().padStart(2,'0');
  let breakFormat = breakMinutes.toString().padStart(2,'0')+':'+breakSeconds.toString().padStart(2,'0')
  

  
  
  const handleDuration = (e) => {
   
    if (e.currentTarget.id == 'break-decrement' && breakLength > 60000 && sessionCount == null && breakCount == null) {
      setDisplayBreak(displayBreak - 1);
      setBreak(breakLength - 60000);
      return;
    }
    if (e.currentTarget.id == 'break-increment' && breakLength < 3600000 && sessionCount == null && breakCount == null) {
      setDisplayBreak(displayBreak + 1);
      setBreak(breakLength + 60000);
      return;
    }
    if (e.currentTarget.id == 'session-decrement' && sessionLength > 60000 && sessionCount == null && breakCount == null) {
      setDisplaySession(displaySession - 1);
      setSession(sessionLength - 60000);
      return;
    }
    if (e.currentTarget.id == 'session-increment' && sessionLength < 3600000 && sessionCount == null && breakCount == null) {
      setDisplaySession(displaySession + 1);
      setSession(sessionLength + 60000);
      return;
    }
  }

  const handleStartStop = () => {
    if(sessionCount) {
      clearInterval(sessionCount);
      sessionCount = null;
      return;
    }
    if(breakCount) {
      clearInterval(breakCount);
      breakCount = null;
      return
    }
    if(sessionLength > 0) {
      sessionCount = setInterval(countSession, 1000);
      return;
    }
    if(sessionLength < 0) {
      breakCount = setInterval(countBreak, 1000);
      return;
    } 
  }

  const handleReset = () => {
    setSession(1500000);
    setBreak(300000);
    setDisplaySession(25);
    setDisplayBreak(5);
    clearInterval(sessionCount);
    sessionCount = null;
    clearInterval(breakCount);
    breakCount = null;
    alarm.current.pause();
    alarm.current.currentTime = 0;
  }

  const countSession = () => {
    setSession((prevsession) => {
      let newSession = prevsession - 1000;
      if (newSession <= 10000) {
        document.getElementById('time-left').classList.add('text-danger');
      }
      if(newSession < 0) {
        clearInterval(sessionCount);
        sessionCount = null;
        alarm.current.play();
        setBreak(displayBreak*60*1000);        
        document.getElementById('time-left').classList.remove('text-danger');
        breakCount = setInterval(countBreak, 1000);
        return newSession
      }
      return newSession;
    })
  }

  const countBreak = () => {
    setBreak((prevBreak) => {
      let newBreak = prevBreak - 1000;
      if (newBreak <= 10000) {
        document.getElementById('time-left').classList.add('text-danger');
      }
      if(newBreak < 0) {
        clearInterval(breakCount);
        breakCount == null;
        alarm.current.play();
        setSession(displaySession*60*1000);    
        document.getElementById('time-left').classList.remove('text-danger');
        sessionCount = setInterval(countSession, 1000);
        return newBreak;
      }
      return newBreak;
    })
  }

  return (
    <>
      <div className='container bg-dark py-3 text-white'>
        <div className='h1'>25 + 5 Clock</div>

        <div className='settings'>

          <div className='break-settings container'>
            <div className='h3' id='break-label'>Break Length</div>
            <div className='break-controls'>
            <button type='button' className='btn btn-success' id="break-increment" onClick={handleDuration}><FontAwesomeIcon icon={faArrowUp} /></button>
            <div className='h2' id='break-length'>{displayBreak}</div>
            <button type='break-increment' className='btn btn-danger' id="break-decrement" onClick={handleDuration}><FontAwesomeIcon icon={faArrowDown} /></button>
            </div>
          </div>

          <div className='session-settings container'>
              <div className='h3' id='session-label'>Session Length</div>
              <div className='session-controls'>
              <button type='button' className='btn btn-success' id="session-increment" onClick={handleDuration}><FontAwesomeIcon icon={faArrowUp} /></button>
              <div className='h2' id='session-length'>{displaySession}</div>
              <button type='session-increment' className='btn btn-danger' id="session-decrement" onClick={handleDuration}><FontAwesomeIcon icon={faArrowDown} /></button>
              </div>
          </div>

        </div>

        <div className='container-fluid border border-secondary rounded mt-5 mb-1 py-2'>

          <div className='timer'>
            <div className='h2' id='timer-label'>{sessionLength < 0 ? 'Break' : 'Session'}</div>
            <div className='h1' id='time-left'>{sessionLength < 0 ? breakFormat : sessionFormat}</div>
            <audio ref={alarm} id='beep' src='src/assets/alarm.mp3'></audio>
          </div>

          <div className='controls'>
            <button type='button' className='btn btn-primary mx-1 start-stop' id='start_stop' onClick={handleStartStop}><FontAwesomeIcon icon={faPlay} /></button>
            <button type='button' className='btn btn-warning mx-1' id='reset' onClick={handleReset}><FontAwesomeIcon icon={faArrowsRotate} /></button>
          </div> 
        </div>
      </div>
      <footer className='mt-5 py-2'>
        <div className='fw-bold text-white mx-1'>By Ahmad Osman</div>
        <div className='mx-1 my-0 h3 hover-effect'><a href="www.linkedin.com/in/ahmadosman-linked"><FontAwesomeIcon icon={faLinkedin} style={{color: "#ffffff",}} /></a></div>
        <div className='mx-1 my-0 h3 hover-effect'><a href="https://www.freecodecamp.org/fccd5aa6897-439f-4b3e-b4a9-c5bda7c2e055"><FontAwesomeIcon icon={faFreeCodeCamp} style={{color: "#ffffff",}} /></a></div>
      </footer>
    </>  
  )
}

export default App
