import React, {useState} from 'react';
import './App.css';
import {ToDolist} from "./Components/ToDolist";
import {v1} from "uuid";

export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {
    let [tasks, setTasks] = useState([
        { id: v1(), title: "HTML&CSS", isDone: true },
        { id: v1(), title: "JS", isDone: true },
        { id: v1(), title: "ReactJS", isDone: false },
        { id: v1(), title: "Rest API", isDone: false },
        { id: v1(), title: "GraphQL", isDone: false }
    ])

    function removeTask(id: string) {
        let filteredTasks = tasks.filter(task => task.id !== id)
        setTasks(filteredTasks)
    }

    function addTask (title: string) {
        let newTask = {id: v1(),
            title: title,
            isDone: false}
        let newTasks = [newTask, ...tasks]
        setTasks(newTasks)
    }

    let [filter, setFilter] = useState<FilterValuesType>('all')

    let tasksForTodoList = tasks

        if (filter==='active') {
            tasksForTodoList = tasks.filter(task => task.isDone === false)
        }

    if (filter==='completed') {
        tasksForTodoList = tasks.filter(task => task.isDone === true)
    }
    
    function changeFilter(value: FilterValuesType) {
        setFilter(value)
    }

    return (
        <div className="App">
            <ToDolist
                title = {'What to learn'}
                tasks = {tasksForTodoList}
                removeTask = {removeTask}
                changeFilter = {changeFilter}
                addTask={addTask}

            />
        </div>
    );
}

export default App;
