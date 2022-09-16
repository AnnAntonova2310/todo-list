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
    changeTaskStatus: (id: string, isDone: boolean) => void
    filter: any

}

export function ToDolist(props: PropsType) {
    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [error, setError]=useState<string|null>(null)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        {
            setNewTaskTitle(e.currentTarget.value)
        }
    }

   const addTaskHandler = () => {
       if (newTaskTitle.trim() !== '') {
           props.addTask(newTaskTitle.trim())
           setNewTaskTitle('')
       } else {
           setError('Title is required')
       }
   }

    const onKeyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.charCode === 13) {
            addTaskHandler()
        }
    }

    const onAllClickHandler = () => {
        props.changeFilter('all')
    }
    const onActiveClickHandler = () => {
        props.changeFilter('active')
    }
    const onCompletedClickHandler = () => {
        props.changeFilter('completed')
    }


    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={newTaskTitle}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
                       className={error ? 'error' : ''}
                />
                <button onClick={addTaskHandler}>+</button>
                {error && <div className='error-message'> {error} </div> }

            </div>
            <ul>
                {props.tasks.map((task) => {

                    const onRemoveHandler = () => {
                        props.removeTask(task.id)
                    }
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked
                        props.changeTaskStatus(task.id, newIsDoneValue)
                    }


                    return (
                        <li key={task.id} className={task.isDone ?'is-done':''}>
                            <input type={'checkbox'} checked={task.isDone} onChange={(e) => onChangeHandler(e)}/>
                            <span>{task.title}</span>
                            <button onClick={onRemoveHandler}>X</button>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button className={props.filter==='all'?'active-filter':''}
                    onClick={(e) => {onAllClickHandler()
                }}>All
                </button>
                <button className={props.filter==='active'?'active-filter':''}
                    onClick={(e) => {onActiveClickHandler()
                }}>Active
                </button>
                <button className={props.filter==='completed'?'active-filter':''}
                    onClick={(e) => {onCompletedClickHandler()
                }}>Completed
                </button>
            </div>
        </div>
    )

}