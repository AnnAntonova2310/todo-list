import React, {ChangeEvent,KeyboardEvent, useState} from "react";
import {filterType} from "./App";

type TasksType={
    id: string
    title: string
    isDone: boolean
}

type PropsTodoType ={
    title: string
    tasks: Array<TasksType>
    removeTasks:(id: string)=> void
    changeFilter:(value: filterType)=>void
    addTask: (title: string)=> void
}
export const Todolist = (props: PropsTodoType)=>{
    const [newTasks, setNewTasks] = useState('')
    const addTask=()=>{
        {props.addTask(newTasks)}
        setNewTasks('')
    }
    const onChangeHandler=(event: ChangeEvent<HTMLInputElement>)=>{
        setNewTasks(event.currentTarget.value);
    }
    const onKeyPressHandler=(event: KeyboardEvent<HTMLInputElement>)=>{
        if(event.key === 'Enter') {
            addTask()
        }
    }
    const onAllClickHandler=()=>props.changeFilter('all')
    const onActiveClickHandler=()=>props.changeFilter('active')
    const onCompletedClickHandler=()=>props.changeFilter('completed')

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={newTasks} onChange={onChangeHandler} onKeyPress={onKeyPressHandler}/>
                <button onClick={addTask}>+</button>
            </div>
            <ul>
                {props.tasks.map((el)=> {
                    const onClickHandler=()=> props.removeTasks(el.id)
                    return(
                    <li key={el.id}>
                        <input type="checkbox" checked={el.isDone}/>
                        <span>{el.title}</span>
                        <button onClick={onClickHandler}> ✖️</button>
                    </li>
                    )
                })}
            </ul>
            <div>
                <button onClick={onAllClickHandler}>All</button>
                <button onClick={onActiveClickHandler}>Active</button>
                <button onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    );
}