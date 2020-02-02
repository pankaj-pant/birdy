import React, { Component } from 'react';
import './App.css';
import DB from './db'
import AppNavbar from './components/AppNavbar'
import ObservationList from './components/ObservationList'
import ObservationForm from './components/ObservationForm'


class App extends Component {
  state = {
    db: new DB('bird-watch'),
    observations: {}
  }

  async componentDidMount(){  
    const observations = await this.state.db.getAllObservations()

    this.setState({
      observations
    })
  }


  handleSave = async (observation) => {
  let { id } = await this.state.db.createObservation(observation)

  const {observations} = this.state

  this.setState({
    observations: {
      ...observations,
      [id]: observation
    }
  })
}

render() {
  return (
    <div className="App">
      <AppNavbar />
      <ObservationForm observations={this.state.observations} onSave={this.handleSave} />
      <ObservationList observations={this.state.observations}/>
    </div>
  );
}
  
}

export default App;
