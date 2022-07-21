import React, {useState, useEffect} from 'react'
import '../css/WorkoutInfo.css'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarDays, faCalendarCheck, faCalendarPlus, faRepeat, faCrown, faDumbbell, faPenSquare, faCalendarMinus} from '@fortawesome/free-solid-svg-icons'
function WorkoutInfo({value}) {
    const [sets, setSets] = useState("")
    const [reps, setReps] = useState("")
    const [pr, setPR] = useState("")
    const [editing, setEditing] = useState(false)
    const [active, setActive] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)
    useEffect(() => {
        if (isSubmitted) {
            axios.post('http://localhost:5000/workoutData', {
                date: `${('0'+(value.getMonth()+1)).slice(-2)}-${('0'+value.getDate()).slice(-2)}-${value.getFullYear()}`,
                activeVal: active,
                sets: sets,
                reps: reps,
                pr: pr
            }).then((res) => {
                console.log(res)
                setIsSubmitted(false)
            })
        }
        console.log(isDeleting)
        if (isDeleting) {
            axios.delete('http://localhost:5000/workoutData', {
                headers: {
                  Authorization: "Test token"
                },
                data: {
                    date: `${('0'+(value.getMonth()+1)).slice(-2)}-${('0'+value.getDate()).slice(-2)}-${value.getFullYear()}`
                }
              }).then((res) => {
                    setIsDeleting(false)
                    setActive(false)
                }
              )
        }
    }, [isSubmitted, isDeleting])

    useEffect(() => {
        axios.get('http://localhost:5000/workoutData', {
            params: {
              date: `${('0'+(value.getMonth()+1)).slice(-2)}-${('0'+value.getDate()).slice(-2)}-${value.getFullYear()}`
            }
          }).then((res) => {
            if (res.data !== "") {
                console.log(editing)
                setActive(res.data.activeVal)
                setSets(res.data.sets)
                setReps(res.data.reps)
                setPR(res.data.pr)
            }
        })
    }, [])

    useEffect(() => {
            if (editing) {
                setSets("")
                setReps("")
                setPR("")
            }
        }, [editing])
    
    const onSubmit = () => {
        setActive(true)
        setIsSubmitted(true)
        setEditing(false)
    }

    const onAdd = () => {
        setEditing(true)
    }

    const onEdit = () => {
        setEditing(true)
    }

    const onDelete = () => {
        setIsDeleting(true)
    }

    const onSetChange = (e) => {
        setSets(e.target.value)
    }

    const onRepChange = (e) => {
        setReps(e.target.value)
    }
    const onPRChange = (e) => {
        setPR(e.target.value)
    }
    let infoDisplay = null
    if (!active && !editing) {
        infoDisplay = <React.Fragment>
            <div className="infoContainer">
                <div className="titleDesign">
                    <div>
                        <FontAwesomeIcon icon={faCalendarDays} size="2xl"/>
                    </div>
                <div className="date">{`${('0'+(value.getMonth()+1)).slice(-2)}-${('0'+value.getDate()).slice(-2)}-${value.getFullYear()}`}</div>
                </div>
                <div className="noEntryText" color="white">No Entry Data</div>
                <div className="addEntry">
                    <button onClick={onAdd}>
                        <div className="addButton">
                            <div>
                                Add Entry
                            </div>
                            <div>
                                <FontAwesomeIcon icon={faCalendarPlus} size="xl"/>
                            </div>
                        </div>
                    </button>
                </div>
            </div>
        </React.Fragment>
    }
    else if (editing) {
        infoDisplay = 
        <React.Fragment>
            <div className="infoContainer">
                <div className="titleDesign">
                    <div>
                        <FontAwesomeIcon icon={faCalendarDays} size="2xl"/>
                    </div>
                <div className="date">{`${('0'+(value.getMonth()+1)).slice(-2)}-${('0'+value.getDate()).slice(-2)}-${value.getFullYear()}`}</div>
                </div>
            <div className="entry sets">
                <div>
                    <form>
                        <input className="input sets" type="text" placeholder="Number of Sets" autoComplete="off" id="lname" name="lname" onChange={onSetChange} value={sets}/>
                    </form>
                </div>
            </div>
            <div className="entry reps">
                    <form>
                        <input className="input reps" type="text" placeholder="Number of Reps" autoComplete="off" id="lname" name="lname" onChange={onRepChange} value={reps}/>
                    </form>
            </div>
            <div className="entry max">
                    <form>
                        <input className="input pr" type="text" placeholder="PR Weight" autoComplete="off" id="lname" name="lname" onChange={onPRChange} value={pr}/>
                    </form>
            </div>
            <div className="submitChanges">
                <button onClick={onSubmit}>
                    <div className="buttonInfo">
                        <div>
                            Submit Changes
                        </div>
                        <div>
                            <FontAwesomeIcon icon={faCalendarCheck} size="xl"/>
                        </div>
                    </div>
                </button>
            </div>
            </div>
        </React.Fragment>
    } else if (active && !editing) {
        infoDisplay = 
        <React.Fragment>
            <div className="enteredContainer">
                <div className="titleEntered">
                    <div>
                        <FontAwesomeIcon icon={faCalendarDays} size="2xl"/>
                    </div>
                    <div>
                        {`${('0'+(value.getMonth()+1)).slice(-2)}-${('0'+value.getDate()).slice(-2)}-${value.getFullYear()}`}
                    </div>
                    </div>
                <div className="entered sets2">
                    <div>
                        <FontAwesomeIcon icon={faDumbbell} size="2x"/>
                    </div>
                    <div>{sets} Sets</div>
                </div>
                <div className="entered reps2">
                    <div className="repSymbol">
                        <FontAwesomeIcon icon={faRepeat} size="2x"/>
                    </div>
                    <div>{reps} Reps</div>
                </div>
                <div className="entered max2">
                    <div>
                        <FontAwesomeIcon icon={faCrown} size="2x"/>
                    </div>
                    <div>PR:  {pr} lbs</div>
                </div>
                <div className="editChanges">
                    <button onClick={onEdit}>
                        <div className="editButtonEntries">
                            <div>
                                Edit Entry
                            </div>
                            <div>
                                <FontAwesomeIcon icon={faPenSquare} size="xl"/>
                            </div>
                        </div>
                    </button>
                </div>
                <div className="deleteEntry">
                    <button onClick={onDelete}>
                        <div className="deleteButtonEntries">
                            <div>
                                Delete Entry
                            </div>
                            <div>
                                <FontAwesomeIcon icon={faCalendarMinus} size="xl"/>
                            </div>
                        </div>
                    </button>
                </div>
            </div>
        </React.Fragment>
    }
    return (
        <React.Fragment>
        {infoDisplay}
        </React.Fragment>
    )
}

export default WorkoutInfo