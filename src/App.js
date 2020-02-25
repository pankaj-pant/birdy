import React, { useState, useEffect } from 'react'
import './App.css'
import DB from './db'
import AppNavbar from './components/AppNavbar'
import ObservationList from './components/ObservationList'
import ObservationForm from './components/ObservationForm'

const App = () => {
  /* Setting up a new instance of bird-watch PouchDB database, and observations */
  const [state, setState] = useState({
    db: new DB('bird-watch'),
    observations: {}
  })

  /* Fetching all observations from PouchDB and setting it to state */
  useEffect(() => {
    const fetchData = async () => {
      const observations = await state.db.getAllObservations()
      setState({ ...state, observations })
    }
    fetchData()
  }, [])

  /* Handle save operation when user submits a new observation */
  const handleSave = async observation => {
    /* Extracting auto generated id from the observation  */
    let { id } = await state.db.createObservation(observation)

    /* Fetching the new observation (now containing image as a base64 string, if image was provided) from PouchDB and then saving it to state */
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
