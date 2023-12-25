import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";

export type filterType = 'all' | 'active' | 'completed'



function App() {
    let [tasks, setTasks] = useState([
        { id: v1(), title: "HTML&CSS", isDone: true },
        { id: v1(), title: "JS", isDone: true },
        { id: v1(), title: "ReactJS", isDone: false },
        { id: v1(), title: "Rest API", isDone: false },
        { id: v1(), title: "GraphQL", isDone: false }
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
    function removeTasks(id: string){
        tasks = tasks.filter(el=>el.id!==id)
        setTasks(tasks)
    }
    function addTask(title: string) {
        let task = {id: v1(), title: title, isDone: false};
        let newTasks = [task, ...tasks];
        setTasks(newTasks)
    }

    function changeTaskStatus(id: string, isDone: boolean){
        let task = tasks.find(t=> t.id === id)
        if(task) {
            task.isDone = isDone;
            setTasks([...tasks])
        }
    }


    return (
        <div className={'App'}>
            < Todolist title={'What to learn'}
                       tasks={taskForToDoList}
                       removeTasks={removeTasks}
                       changeFilter={changeFilter}
                       addTask={addTask}
                       changeTaskStatus = {changeTaskStatus}
                       filter={filter}
            />
        </div>
    )
}



export default App;
