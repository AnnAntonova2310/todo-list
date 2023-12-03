import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";

export type filterType = 'all' | 'active' | 'completed'
function App() {
    let [tasks, setTasks] = useState([
        { id: 1, title: "HTML&CSS", isDone: true },
        { id: 2, title: "JS", isDone: true },
        { id: 3, title: "ReactJS", isDone: false },
        { id: 4, title: "Rest API", isDone: false },
        { id: 5, title: "GraphQL", isDone: false }
    ])

    let [filter, setFilter] = useState<filterType>('all')
    let taskForToDoList = tasks;

    if(filter==='active') {
        taskForToDoList = tasks.filter(el=> el.isDone===false)
    }
    if(filter==='completed') {
        taskForToDoList = tasks.filter(el=> el.isDone===true)
    }

    function changeFilter(value: filterType){
        setFilter(value)
    }

    function removeTasks(id: number){
        tasks = tasks.filter(el=>el.id!==id)
        setTasks(tasks)
    }

    return (
        <div className={'App'}>
            < Todolist title={'What to learn'}
                       tasks={taskForToDoList}
                       removeTasks={removeTasks}
                       changeFilter={changeFilter}
            />
        </div>
    )
}



export default App;
