import React, { useState } from 'react'
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, Input, Label
} from 'reactstrap'
import '../ObservationList.css'
import defaultImg from '../assets/no-image.jpeg'
import SampleList from './SampleList'


const ObservationList = (props) => {
  const observations = Object.values(props.observations)
  const [filter, setFilter] = useState('newest')

  /* console.log(observations) */

  let sortedObservationsByTime = observations.slice().sort((a, b) => {
    let date1 = new Date(a.timestamp)
    let date2 = new Date(b.timestamp)
    return date2 - date1
  })

  const resultByTime = sortedObservationsByTime.map(o =>
    <Card key={o.timestamp} style={{ height: '24rem', width: '24rem', margin: '1rem auto', minWidth:'10rem' }}>
      <CardBody>
        <CardTitle>Name: {o.name}</CardTitle>
        {o._attachments === null ?
          <CardImg
            style={{ maxHeight: '12em', maxWidth: '15em', margin: 'auto', objectFit: 'scale-down' }}
            src={defaultImg} alt="no image provided"
          />
          :
          <CardImg
            style={{ maxHeight: '12em', maxWidth: '15em', margin: 'auto', objectFit: 'scale-down' }}
            src={`data:image/jpg;image/png;base64, ${o._attachments.filename.data}`} alt={o.name}
          />
        }
        <CardText>Rarity: {o.rarity}</CardText>
        <CardText>Observed on: {new Date(o.timestamp).toUTCString()}</CardText>
        <CardText>Note: {o.note}</CardText>
      </CardBody>
    </Card>
  )

  let sortedObservationsByName = observations.slice().sort((a, b) => {
    let nameA = a.name.toLowerCase()
    let nameB = b.name.toLowerCase()
    if (nameA < nameB)
      return -1
    if (nameA > nameB)
      return 1
    return 0
  })

  const resultByName = sortedObservationsByName.map(o =>
    <Card key={o.timestamp} style={{ height: '24rem', width: '24rem', margin: '1rem auto', minWidth:'10rem' }}>
      <CardBody>
        <CardTitle>Name: {o.name}</CardTitle>
        {o._attachments === null ?
          <CardImg
            style={{ maxHeight: '12em', maxWidth: '15em', margin: 'auto', objectFit: 'scale-down' }}
            src={defaultImg} alt="no image provided"
          />
          :
          <CardImg
            style={{ maxHeight: '12em', maxWidth: '15em', margin: 'auto', objectFit: 'scale-down' }}
            src={`data:image/jpg;image/png;base64, ${o._attachments.filename.data}`} alt={o.name}
          />
        }
        <CardText>Rarity: {o.rarity}</CardText>
        <CardText>Observed on: {new Date(o.timestamp).toUTCString()}</CardText>
        <CardText>Note: {o.note}</CardText>
      </CardBody>
    </Card>
  )

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  return(
    <div>
      {observations.length === 0 ?
        <SampleList />
        :
        <div>
          <Label for="filterSelect">Sort Observations By:</Label>
          <Input type="select" name="Filter" id="filterSelect" onChange={handleFilterChange} style={{ maxWidth: '50rem', margin: 'auto' }}>
            <option value="newest">Most recent</option>
            <option value="name">Name</option>
          </Input>
          <div className='observation-list'>
            {filter === 'newest' ? resultByTime : resultByName}
          </div>
        </div>
      }
    </div>
  )
}

export default ObservationList