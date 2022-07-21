import React, {useState, useRef, useEffect, useContext} from 'react'
import {useNavigate} from 'react-router-dom'
import '../css/WorkoutSideBar.css'
import WorkoutEntry from './WorkoutEntry'
import {WorkoutContext} from '../App.js'

function WorkoutSideBar() {
const navigate = useNavigate()
let workouts = ["Bench Press", "Squats", "Deadlifts", "Pull-Ups", "Overhead Press"]
const refWorkoutSearch = useRef()
const refWorkoutContainer = useRef()
const [showWorkoutSearch, setShowWorkoutSearch] = useState(false)
const [shownWorkouts, setShownWorkouts] = useState(workouts)
const [clickedIndex, setClickedIndex] = useState(null)

const [workoutURL, workoutURLSetter] = useContext(WorkoutContext)

useEffect(() => {
    let clickOutside = function(event) {
        if (showWorkoutSearch && refWorkoutContainer.current && !refWorkoutContainer.current.contains(event.target)) {
            setShowWorkoutSearch(false)
        }
    }
    document.addEventListener("mousedown", clickOutside)
    return () => {
        document.removeEventListener("mousedown", clickOutside)
    }
}, [showWorkoutSearch])

useEffect(() => {
    console.log("Im run")
    navigate(`${workoutURL.replaceAll(" ","").toLowerCase()}`, { replace: true })
    }
    , [workoutURL])

let showSearchElems = ""
    if (!showWorkoutSearch) {
        showSearchElems = <div className="searchContainNoClick">
            <input type="text" placeholder="Search Workouts" onClick = {() =>
                {
                    setShowWorkoutSearch(true)
                }
            }>
            </input>
        </div>
    } else {
        let workoutDivs = shownWorkouts.map((elem, i) => {
        let className = `workoutDiv elem${shownWorkouts.length-1-i}`
            return <WorkoutEntry key={i} index={i} className={className} workout={elem} setIndex={setClickedIndex}
            selectedIndex={clickedIndex}/>
        })
        showSearchElems = <div className="searchContainClick" ref={refWorkoutContainer}>
            <input type="text" ref={refWorkoutSearch} placeholder="Search Workouts" 
                onChange={() => {
                    let typedVal = refWorkoutSearch.current.value
                    let workoutsToShow = workouts.filter(workout => workout.toLowerCase().startsWith(typedVal.toLowerCase()))
                    setShownWorkouts(workoutsToShow)
                }
            }>
            </input>
            {workoutDivs}
        </div>
    }
    return (
        <div className="workoutSideContainer">
            {showSearchElems}
        </div>
    )
}

export default WorkoutSideBar