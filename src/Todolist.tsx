import React, {ChangeEvent,KeyboardEvent, useState} from "react";
import {filterType} from "./App";

type TasksType={
    id: string
    title: string
    isDone: boolean
}

type PropsTodoType ={
    id: string
    title: string
    tasks: Array<TasksType>
    removeTasks:(id: string, todolistId: string)=> void
    changeFilter:(value: filterType, todolistId: string)=>void
    addTask: (title: string, todolistId: string)=> void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string)=>void
    filter: filterType
    removeTodolist: (id: string)=> void
}
export const Todolist = (props: PropsTodoType)=>{

    console.log(props.tasks)
    const [newTasks, setNewTasks] = useState('')
    const [error, setError] = useState<string | null>(null)
    const addTask=()=>{
        if(newTasks.trim() !== ''){
            props.addTask(newTasks.trim(), props.id)
            setNewTasks('')
        } else {
            setError('Title is required')
        }
    }
    const onChangeHandler=(event: ChangeEvent<HTMLInputElement>)=>{
        setNewTasks(event.currentTarget.value);
    }
    const onKeyPressHandler=(event: KeyboardEvent<HTMLInputElement>)=>{
        setError(null)
        if(event.key === 'Enter') {
            addTask()
        }
    }
    const onAllClickHandler=()=>props.changeFilter('all', props.id)
    const onActiveClickHandler=()=>props.changeFilter('active', props.id)
    const onCompletedClickHandler=()=>props.changeFilter('completed', props.id)

    return (
        <div>
            <h3>
                {props.title}
            <button onClick={()=>props.removeTodolist(props.id)}>X</button>
            </h3>
            <div>
                <input value={newTasks}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
                       className={error ? 'error' : ''}/>
                <button onClick={addTask}>+</button>
               {error && <div  className = 'error-message'>{error}</div>}
            </div>
            <ul>
                {props.tasks.map((el)=> {
                    const onClickHandler=()=> props.removeTasks(el.id, props.id)
                    const onChangeHandler=(e: ChangeEvent<HTMLInputElement>)=> {
                        let newIsDoneValue = e.currentTarget.checked
                        props.changeTaskStatus(el.id, newIsDoneValue, props.id)
                    }
                    return(
                    <li key={el.id} className={el.isDone ? 'is-done' : ''}>
                        <input type="checkbox" checked={el.isDone} onChange={onChangeHandler}/>
                        <span>{el.title}</span>
                        <button onClick={onClickHandler}> ✖️</button>
                    </li>
                    )
                })}
            </ul>
            <div>
                <button className={props.filter === 'all' ? 'active-filter' : ''} onClick={onAllClickHandler}>All</button>
                <button className={props.filter === 'active' ? 'active-filter' : ''} onClick={onActiveClickHandler}>Active</button>
                <button className={props.filter === 'completed' ? 'active-filter' : ''} onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    );
}