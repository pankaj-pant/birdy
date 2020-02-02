import React, { useState } from 'react'
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, Input, Label
} from 'reactstrap'
import '../ObservationList.css'

const SampleList = () => {
  const observations = [
    { rarity: 'Common',
      name: 'Canada Goose',
      img: 'https://www.vaasa.fi/uploads/2020/01/9615c237-luontosivut.jpg',
      note: 'Spotted in Vaasa',
      timestamp: '2019-02-01T14:24:52.683Z' },
    { rarity: 'Common',
      name: 'Common Pheasant',
      img: 'https://www.vaasa.fi/uploads/2019/12/74f1a255-luontosivut.jpg',
      note: 'Spotted in Tammisaari',
      timestamp: '2020-01-02T13:52:02.265Z'
    },
    { rarity: 'Rare',
      name: 'White-tailed eagle',
      img: 'http://www.luontoportti.com/suomi/images/6868.jpg',
      note: 'Spotted in Kotka',
      'timestamp': '2020-01-25T18:58:10.679Z'
    },
    { rarity: 'Common',
      name: 'Eurasian Oystercatcher',
      img: 'https://www.hbw.com/sites/default/files/styles/ibc_1k/public/ibc/p/1434_strandskata_haematopus_ostralegus_paarp_halland_20100503_1_1200.jpg?itok=GWr1z0ma',
      note: 'Spotted in Helsinki',
      timestamp: '2020-01-28T19:17:47.327Z'
    }
  ]

  const [filter, setFilter] = useState('newest')

  let sortedObservationsByTime = observations.slice().sort((a, b) => {
    let date1 = new Date(a.timestamp)
    let date2 = new Date(b.timestamp)
    return date2 - date1
  })


  const resultByTime = sortedObservationsByTime.map(o =>
    <Card key={o.timestamp} style={{ height: '24rem', width: '24rem', margin: '1rem auto', minWidth:'10rem' }}>
      <CardBody>
        <CardTitle>Name: {o.name}</CardTitle>
        <CardImg
          style={{ maxHeight: '12em', maxWidth: '15em', margin: 'auto', objectFit: 'scale-down' }}
          src={o.img} alt={o.name}
        />
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
        <CardImg
          style={{ maxHeight: '12em', maxWidth: '15em', margin: 'auto', objectFit: 'scale-down' }}
          src={o.img} alt={o.name}
        />
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
      <Label for="filterSelect">Sort Observations By:</Label>
      <Input type="select" name="Filter" id="filterSelect" onChange={handleFilterChange} style={{ maxWidth: '50rem', margin: 'auto' }}>
        <option value="newest">Most recent</option>
        <option value="name">Name</option>
      </Input>
      <div style={{ marginTop: '1rem', color: 'red' }}>Info: Sample data displayed below. Once user adds own data, only user data will displayed!</div>
      <div className='observation-list'>
        {filter === 'newest' ? resultByTime : resultByName}
      </div>
    </div>
  )
}

export default SampleList