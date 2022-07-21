import React, {useRef} from 'react'
import {Link} from 'react-router-dom'

import '../css/Header.css'

function Header() {
    const homeRef = useRef()
    const workoutRef = useRef()
    const forumRef = useRef()
    return (
        <div className="mainContainer">
            <div className="tab home"><Link to="/" ref={homeRef} onMouseEnter={() =>
                {
                    homeRef.current.style.color = "#87cefa"
                    homeRef.current.style.borderBottom = "3px solid #87cefa"
                    homeRef.current.style.paddingBottom = "10px"
                }
            } onMouseLeave={() =>
                {   
                    homeRef.current.style.color = "white"
                    homeRef.current.style.borderBottom = "none"
                }
            }>Home</Link>
            </div>
            <div className="tab workouts"><Link to="/workouts" ref={workoutRef} onMouseEnter={() =>
                {
                    workoutRef.current.style.color = "#87cefa"
                    workoutRef.current.style.borderBottom = "3px solid #87cefa"
                    workoutRef.current.style.paddingBottom = "10px"
                }
            } onMouseLeave={() =>
                {   
                    workoutRef.current.style.color = "white"
                    workoutRef.current.style.borderBottom = "none"
                }
            }>Workouts</Link>
            </div>
            <div className="tab forums"><a href="" ref={forumRef} onMouseEnter={() =>
                {
                    forumRef.current.style.color = "#87cefa"
                    forumRef.current.style.borderBottom = "3px solid #87cefa"
                    forumRef.current.style.paddingBottom = "10px"
                }
            } onMouseLeave={() =>
                {   
                    forumRef.current.style.color = "white"
                    forumRef.current.style.borderBottom = "none"
                }
            }>Forums</a>
            </div>
        </div>
    )
}

export default Header