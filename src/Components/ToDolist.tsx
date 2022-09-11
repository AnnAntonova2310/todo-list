import React, {ChangeEvent, useState} from "react";
import {FilterValuesType} from "../App";

type TasksType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TasksType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
}

export function ToDolist(props: PropsType) {
    const [newTaskTitle, setNewTaskTitle]=useState('')
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>)=> {
        {setNewTaskTitle( e.currentTarget.value)}
    }
    const onKeyPressHandler =(e: React.KeyboardEvent<HTMLInputElement>)=> {
        if(e.charCode===13) {props.addTask(newTaskTitle)
            setNewTaskTitle('');
        }
    }
    const onClickHandler = ()=> {
        props.addTask(newTaskTitle)
        setNewTaskTitle('')
    }
    const onAllClickHandler =()=> { props.changeFilter('all')}
    const onActiveClickHandler =()=> { props.changeFilter('active')}
    const onCompletedClickHandler =()=> { props.changeFilter('completed')}
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={newTaskTitle}
                    onChange={onChangeHandler}
                    onKeyPress={onKeyPressHandler}
                />
                <button onClick={()=>{onClickHandler()}}>+</button>

            </div>
            <ul>
                {props.tasks.map((task) => {

                    const onRemoveHandler = () => {props.removeTask(task.id)}

                    return (
                        <li key={task.id}>
                            <input type={'checkbox'} checked={task.isDone}/>
                            <span>{task.title}</span>
                            <button onClick={(e) =>{onRemoveHandler()}}>
                                ✖️
                            </button>
                        </li>)
                })}

            </ul>
            <div>
                <button onClick={(e) => {onAllClickHandler()}}>All</button>
                <button onClick={(e) => {onActiveClickHandler()}}>Active</button>
                <button onClick={(e)=> {onCompletedClickHandler()}}>Completed</button>
            </div>
        </div>
    )

}