import './App.css';
import { useState, useEffect } from 'react';
import Tarea from './components/task';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

const url = 'https://playground.4geeks.com/apis/fake/todos/user/tomasbeckmann'

function App() {

  const [task, setTask] = useState({})

  const [tasks, setTasks] = useState([])

  const handleChange = (event) => {
    setTask({ done: false, [event.target.name]: event.target.value })
  }

  const enterKeyPressed = (event) => {
    if (event.keyCode == 13) {
      setTasks([...tasks, task])
    }
  }

  useEffect(() => {
    fetch(url , {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(resp => {
        return resp.json()
      })
      .then(data => {
        console.log("data", data)
        setTasks(data)
      })
      .catch(error => {
        console.log(error);
      });
  }, [] )

  const updateTask = () => {
    fetch(url, {
      method: "PUT",
      body: JSON.stringify(tasks),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((resp) => {
        console.log("respuesta de la api",resp.ok)
        return resp.json();
      })

      .then((data )=> {
        console.log(data);
                           // mostrar mensaje pop up de exito (toast)
      })

      .catch((error) => {
        console.log(error);
      });
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
              <input type='text' placeholder='Add new Task' name='label' onChange={(e) => handleChange(e)} onKeyDown={(event) => enterKeyPressed(event)} />
            </li>
            {
              tasks.map((item, index) => {
                return (
                  <li key={index} > <Tarea texto={item.label} />
                    <FontAwesomeIcon icon={faTrashCan} onClick={() => setTasks(tasks.filter((toDo, Index2) => index != Index2))} />
                  </li>
                );
              })
            }
          </ul>
          <div className='tasknumber'> {tasks.length} Tasks left , keep it up !</div>
          <button onClick={() => updateTask()}>Save To-do's</button>
        </div>
      </div>
    </div>

  );
}

export default App;
