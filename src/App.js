import React, { useState, useEffect } from 'react'
import './App.css'
import DB from './db'
import AppNavbar from './components/AppNavbar'
import ObservationList from './components/ObservationList'
import ObservationForm from './components/ObservationForm'

const App = () => {
  const [state, setState] = useState({
    db: new DB('bird-watch'),
    observations: {}
  })

  useEffect(() => {
    const fetchData = async () => {
      const observations = await state.db.getAllObservations()
      setState({ ...state, observations })
    }
    fetchData()
  }, [])

  const handleSave = async observation => {
    let { id } = await state.db.createObservation(observation)
    /* console.log('ID', id) */

    const newObservation = await state.db.getObservation(id)

    setState({
      ...state,
      observations: {
        ...state.observations,
        [id]: newObservation
      }
    })

  }

  return (
    <div className="App">
      <AppNavbar />
      <ObservationForm observations={state.observations} onSave={handleSave} />
      <ObservationList observations={state.observations} />
    </div>
  )
}

export default App
