import React, {useState, useEffect} from 'react'
import '../css/WorkoutDisplay.css'
import DisplayLink from './DisplayLink'
import Calendar from 'react-calendar'
import ProgressGraph from './ProgressGraph'
import '../css/Calendar.css';
import WorkoutInfo from './WorkoutInfo'
import {Route, Routes, useNavigate} from 'react-router-dom'
function WorkoutDisplay(props) {
    const [value, onChange] = useState(new Date())
    const [navDate, setNavDate] = useState(false)
    const [clickedDisplay, setClickedDisplay] = useState("")
    let nav = useNavigate()

    useEffect(() => {
        if (clickedDisplay === "calendarLink" && navDate) {
            nav(`calendar/day/${value.getDate()}-${value.getMonth()+1}-${value.getFullYear()}`)
        } 
    }, [value])
    console.log('0'+value.getDate())
    return <div className="workoutDisplayContainer">
            <div className="workoutTitle">
                <h1>{props.name}</h1>
            </div>

            <div className="displayLinks">
                <DisplayLink className="calendarLink" linkName="Calendar" setDisplay={setClickedDisplay} display={clickedDisplay} workout={props.name}/> 
                <DisplayLink className="graphLink" linkName="Progress Graph" setDisplay={setClickedDisplay} display={clickedDisplay} workout={props.name}/>
            </div>
            <Routes>
            <Route path="calendar" element={<div className="workoutCalendar">
                <Calendar onChange={onChange} value={value} onClickDay={() => setNavDate(true)} className="react-calendar"/>
            </div>
            }>
            </Route>
            <Route path={`calendar/day/${value.getDate()}-${value.getMonth()+1}-${value.getFullYear()}`} element={<WorkoutInfo value={value}></WorkoutInfo>}>
            </Route>
            <Route path="progressgraph" element={<div>
                <ProgressGraph/>
            </div>
            }>
            </Route>
            </Routes>
            
        </div>
}

export default WorkoutDisplay