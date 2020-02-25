import React, { useState } from 'react'
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, Input, Label
} from 'reactstrap'
import './ObservationList.css'
import defaultImg from '../assets/no-image.jpeg'

/* Default observations array */
const initialData = [
  { rarity: 'Common',
    name: 'Canada Goose',
    img: 'https://www.vaasa.fi/uploads/2020/01/9615c237-luontosivut.jpg',
    note: 'Spotted in Vaasa',
    timestamp: '2019-02-01T14:24:52.683Z',
    _attachments: null },
  { rarity: 'Common',
    name: 'Common Pheasant',
    img: 'https://www.vaasa.fi/uploads/2019/12/74f1a255-luontosivut.jpg',
    note: 'Spotted in Tammisaari',
    timestamp: '2020-01-02T13:52:02.265Z',
    _attachments: null
  },
  { rarity: 'Rare',
    name: 'White-tailed eagle',
    img: 'http://www.luontoportti.com/suomi/images/6868.jpg',
    note: 'Spotted in Kotka',
    'timestamp': '2020-01-25T18:58:10.679Z',
    _attachments: null
  },
  { rarity: 'Common',
    name: 'Eurasian Oystercatcher',
    img: 'https://www.hbw.com/sites/default/files/styles/ibc_1k/public/ibc/p/1434_strandskata_haematopus_ostralegus_paarp_halland_20100503_1_1200.jpg?itok=GWr1z0ma',
    note: 'Spotted in Helsinki',
    timestamp: '2020-01-28T19:17:47.327Z',
    _attachments: null
  }
]

const ObservationList = (props) => {
  const observations = Object.values(props.observations)
  const [filter, setFilter] = useState('newest')

  /* Function for sorting observation array by timestamp */
  const sortObservationsByTime = (array) => array.slice().sort((a, b) => {
    let date1 = new Date(a.timestamp)
    let date2 = new Date(b.timestamp)
    return date2 - date1
  })

  /* Function for sorting observation array by name */
  const sortObservationsByName = (array) => array.slice().sort((a, b) => {
    let nameA = a.name.toLowerCase()
    let nameB = b.name.toLowerCase()
    if (nameA < nameB)
      return -1
    if (nameA > nameB)
      return 1
    return 0
  })

  const result = (array) => array.map(o =>
    <Card key={o.timestamp} className='card'>
      <CardBody>
        <CardTitle>Name: {o.name}</CardTitle>
        {/* Conditional image rendering - if image was provided by user or not */}
        {o._attachments === null ?
          <CardImg
            className='card-image'
            src={o.img ? o.img : defaultImg} alt="no image provided"
          />
          :
          <CardImg
            className='card-image'
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
      <div>
        <Label for="filterSelect">Sort Observations By:</Label>
        <Input type="select" name="Filter" id="filterSelect" onChange={handleFilterChange} className='input'>
          <option value="newest">Most recent</option>
          <option value="name">Name</option>
        </Input>
        {/* Conditional rendering of observations array - default array provided if no user observations exist! */}
        {observations.length === 0 ?
          <>
            <div className='sample-data'>Info: Sample data displayed below. Once user adds own data, only user data will displayed!</div>
            <div className='observation-list'>
              {filter === 'newest' ? result(sortObservationsByTime(initialData)) : result(sortObservationsByName(initialData))}
            </div>
          </>
          :
          <div className='observation-list'>
            {filter === 'newest' ? result(sortObservationsByTime(observations)) : result(sortObservationsByName(observations))}
          </div>
        }
      </div>
    </div>
  )
}

export default ObservationList