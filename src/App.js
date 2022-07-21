import './App.css'
import Header from './components/Header'
import WorkoutSideBar from './components/WorkoutSideBar'
import WorkoutDisplay from './components/WorkoutDisplay'
import {Route, Routes} from 'react-router-dom'
import React, {useState} from 'react'
import {Outlet} from 'react-router-dom'
export const WorkoutContext = React.createContext(["", () => ""])


function App() {
  const [workoutURL, setWorkoutURL] = useState("")
  return (
      <div className="App">
        <div className="headerGrid">
          <Header />
        </div>
            <Routes>
            <Route path="/workouts/*" element={<React.Fragment>
              <div className="workoutDisplay">
                <Routes>
                  <Route path="/:workout/*" element={<WorkoutDisplay name={workoutURL}/>}>
                  </Route>
                </Routes>
              <Outlet/>
              </div>
              <div className="workoutSideGrid">
                <WorkoutContext.Provider value={[workoutURL, setWorkoutURL]}>
                  <WorkoutSideBar />
                </WorkoutContext.Provider>
              </div>
            </React.Fragment>}>
            </Route>
            </Routes>
      </div>
  );
}

export default App;
