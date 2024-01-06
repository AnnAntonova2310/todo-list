import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";

export type filterType = 'all' | 'active' | 'completed'
type TodolistsType = {
    id: string
    title: string
    filter: filterType
}


function App() {

    let todolistID1 =v1()
    let todolistID2 =v1()

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState({
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false}
        ]
    })

    function removeTodolist(id: string){
        setTodolists(todolists.filter(tl=> tl.id!==id))
        delete tasks[id]
        setTasks({...tasks})
    }

    function changeFilter(value: filterType, todolistId: string) {
        let todolist = todolists.find(tl => tl.id === todolistId)
        if (todolist) {
            todolist.filter = value
            setTodolists([...todolists])
        }
    }

    function removeTasks(id: string, todolistId: string) {
        let todolistTasks = tasks[todolistId]
        tasks[todolistId] = todolistTasks.filter(el => el.id !== id)
        setTasks({...tasks})
    }

    function addTask(title: string, todolistId: string) {
        let task = {id: v1(), title: title, isDone: false};
        let todolistTasks = tasks[todolistId]
        let newTasks = [task, ...todolistTasks];
        tasks[todolistId] = newTasks;
        setTasks({...tasks})
    }

    function changeTaskStatus(id: string, isDone: boolean, todolistId: string) {
        let todolistTasks = tasks[todolistId]
        let task = todolistTasks.find(t => t.id === id)
        if (task) {
            task.isDone = isDone;
            setTasks({...tasks})
        }
    }


    return (
        <div className={'App'}>
            {todolists.map(tl => {
                let taskForToDoList = tasks[tl.id];

                if (tl.filter === 'active') {
                    taskForToDoList = tasks[tl.id].filter(el => el.isDone === false)
                }
                if (tl.filter === 'completed') {
                    taskForToDoList = tasks[tl.id].filter(el => el.isDone === true)
                }
                return < Todolist
                    key={tl.id}
                    id={tl.id}
                    title={tl.title}
                    tasks={taskForToDoList}
                    removeTasks={removeTasks}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeTaskStatus={changeTaskStatus}
                    filter={tl.filter}
                    removeTodolist={removeTodolist}
                />
            })}
        </div>
    )
}


export default App;
