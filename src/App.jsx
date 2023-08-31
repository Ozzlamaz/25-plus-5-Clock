import { useEffect, useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faArrowDown} from '@fortawesome/free-solid-svg-icons'
import {faArrowUp} from '@fortawesome/free-solid-svg-icons'
import {faPlay} from '@fortawesome/free-solid-svg-icons'
import {faPause} from '@fortawesome/free-solid-svg-icons'
import {faArrowsRotate} from '@fortawesome/free-solid-svg-icons'

function App() {
  
  const [sessionLength, setSession] = useState(1500000);
  const [breakLength, setBreak] = useState(300000);
  const [displaySession, setDisplaySession] = useState(25);
  const [displayBreak, setDisplayBreak] = useState(5);

  let sessionCount;
  let breakCount;
  let breakMinutes = Math.floor(breakLength/1000/60);
  let breakSeconds = Math.round(((breakLength/1000/60) - breakMinutes) * 60);
  let sessionMinutes = Math.floor(sessionLength/1000/60);
  let sessionSeconds = Math.round(((sessionLength/1000/60) - sessionMinutes) * 60);
 
  const handleDuration = (e) => {
   
    if (e.currentTarget.id == 'break-decrement' && breakLength > 60000) {
      setDisplayBreak(displayBreak - 1);
      setBreak(breakLength - 60000);
      return
    }
    if (e.currentTarget.id == 'break-increment' && breakLength < 3600000) {
      setDisplayBreak(displayBreak + 1);
      setBreak(breakLength + 60000);
      return
    }
    if (e.currentTarget.id == 'session-decrement' && sessionLength > 60000) {
      setDisplaySession(displaySession - 1);
      setSession(sessionLength - 60000);
      return
    }
    if (e.currentTarget.id == 'session-increment' && sessionLength < 3600000) {
      setDisplaySession(displaySession + 1);
      setSession(sessionLength + 60000);
      return
    }
  }

  const handleStart = (e) => {
      sessionCount = setInterval(countSession, 1000);
  }

  const countSession = () => {
    setSession((prevsession) => {
      let newSession = prevsession - 1000;
      if(newSession == 0) {
        clearInterval(sessionCount);
        setTimeout(() => {
          document.querySelectorAll('.timer').forEach(elem => elem.classList.toggle('d-none'));
          breakCount = setInterval(countBreak, 1000);
        },3000);
        return newSession
      }
      return newSession;
    })
  }

  const countBreak = () => {
    setBreak((prevBreak) => {
      let newBreak = prevBreak - 1000;
      if(newBreak == 0) {
        clearInterval(countBreak);
        return newBreak;
      }
      return newBreak;
    })
  }

  return (
      <div className='container bg-dark text-white py-3'>
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
            <div className='h2' id='timer-label'>Session</div>
            <div className='h1' id='time-left'>{sessionMinutes.toString().padStart(2,'0')}:{sessionSeconds.toString().padStart(2,'0')}</div>
          </div>

          <div className='timer d-none'>
            <div className='h2' id='timer-label'>Break</div>
            <div className='h1' id='time-left'>{breakMinutes.toString().padStart(2,'0')}:{breakSeconds.toString().padStart(2,'0')}</div>
          </div>

          <div className='play-controls'>
            <button type='button' className='btn btn-primary mx-1 controls' id='start_stop' onClick={handleStart}><FontAwesomeIcon icon={faPlay} /></button>
            <button type='button' className='btn btn-primary mx-1 d-none controls' id='pause'><FontAwesomeIcon icon={faPause} /></button>
            <button type='button' className='btn btn-warning mx-1 controls' id='reset'><FontAwesomeIcon icon={faArrowsRotate} /></button>
           </div> 
        </div>
        
      </div>
  )
}

export default App
