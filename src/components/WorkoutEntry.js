import React, {useContext} from 'react'
import {WorkoutContext} from '../App.js'
function WorkoutEntry(props) {
    const [workoutURL, workoutURLSetter] = useContext(WorkoutContext)
    const clickedOn = () => {
        props.setIndex(props.index)
        workoutURLSetter(props.workout)
    }


    return (
    <div key = {props.index} className={props.className} onClick= {clickedOn} style = {{
        backgroundColor: props.selectedIndex !== props.index ? "white" : "#00FFFF",
        color: props.selectedIndex !== props.index  ? "black" : "white"
    }}>
        {props.workout}
    </div>
    )
}

export default WorkoutEntry