import React from "react";
import {filterType} from "./App";

type TasksType={
    id: number
    title: string
    isDone: boolean
}

type PropsTodoType ={
    title: string
    tasks: Array<TasksType>
    removeTasks:(id: number)=> void
    changeFilter:(value: filterType)=>void
}
export const Todolist = (props: PropsTodoType)=>{
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {props.tasks.map((el)=> {
                    return(
                    <li key={el.id}>
                        <input type="checkbox" checked={el.isDone}/>
                        <span>{el.title}</span>
                        <button onClick={()=>{props.removeTasks(el.id)}}> ✖️</button>
                    </li>
                    )
                })}
            </ul>
            <div>
                <button onClick={()=>props.changeFilter('all')}>All</button>
                <button onClick={()=>props.changeFilter('active')}>Active</button>
                <button onClick={()=>props.changeFilter('completed')}>Completed</button>
            </div>
        </div>
    );
}