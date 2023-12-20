import './App.css';
import { useState } from 'react';
import Tarea from './components/task';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';


function App() {

  const [task, setTask] = useState({})

  const [tasks, setTasks] = useState([])

  const handleChange = (event) => {
    setTask({ ...task, [event.target.name]: event.target.value })
  }

  const enterKeyPressed = (event) => {
    if (event.keyCode == 13) {
      setTasks([...tasks,task])
    }
  }

  return (
    <div className='main-container'>
      <div className='header'>
        To-do List
      </div>
      <div className='form-container'>
        <div className='form-container2'>
          <ul>
            <li>
              <input type='text' placeholder='Add new Task' name='newTask' onChange={(e) => handleChange(e)} onKeyDown={(event) => enterKeyPressed(event)} />
            </li>
            {
              tasks.map(( item,index) => {
                return(
                  <li key={index} > <Tarea texto={item.newTask} /> 
                  <FontAwesomeIcon icon={faTrashCan} onClick={() => setTasks(tasks.filter(( toDo ,Index2) => index != Index2))} /> 
                  </li>
                );
              })
            }
          </ul>
          <div className='tasknumber'> {tasks.length} Tasks left , keep it up !</div>
        </div>
      </div>
    </div>

  );
}

export default App;
