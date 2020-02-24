import React, { useState } from 'react'
import {
  Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormText
} from 'reactstrap'

const ObservationForm = (props) => {
  const [isOpen, setIsOpen] = useState(false)
  const [observation, setObservation] = useState({
    rarity: '',
    name: '',
    _attachments: null,
    note: '',
    timestamp: ''
  })

  const handleFiles = (event) => {
    const file = event.target.files[0]

    setObservation({
      ...observation,
      _attachments: {
        filename: {
          content_type: file.type,
          data: file
        }
      }
    })
  }

  const toggle = () => {
    setIsOpen(!isOpen)
    setObservation({
      rarity: '',
      name: '',
      _attachments: null,
      note: '',
      timestamp: new Date()
    })
  }

  const handleChange = (event) => {
    setObservation({ ...observation, [event.target.name]: event.target.value })
  }

  const handleSave = async (event) => {
    event.preventDefault()
    if(observation.rarity === '--Select One--' || observation.rarity === '' || observation.name === '' || observation.not === ''){
      alert('Please enter all fields')
    } else {
      await props.onSave(observation)
      toggle()
    }
  }

  return (
    <div style={{ margin: '1rem 2rem' }}>
      <Button color="primary" onClick={toggle}>New Observation</Button>
      <Modal isOpen={isOpen} toggle={toggle} >
        <ModalHeader toggle={toggle}>Add New Observation</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="name">Name<span style={{ color: 'red' }}>*</span></Label>
              <Input type="text" name="name" id="name" placeholder="Name of bird" onChange={handleChange} />
            </FormGroup>
            <FormGroup>
              <Label for="raritySelect">Rarity<span style={{ color: 'red' }}>*</span></Label>
              <Input type="select" name="rarity" id="raritySelect" onChange={handleChange} >
                <option>--Select One--</option>
                <option>Common</option>
                <option>Rare</option>
                <option>Extremely Rare</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="notes">Notes<span style={{ color: 'red' }}>*</span></Label>
              <Input type="textarea" name="note" id="notes" placeholder="Spotted in Helsinki" onChange={handleChange} />
            </FormGroup>
            <FormGroup>
              <Label for="exampleFile">Attach an Image (optional)</Label>
              <Input type="file" name="file" id="exampleFile" onChange={handleFiles} />
              <FormText color="muted">
                                If you took a picture, you can attach it here.
              </FormText>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={handleSave}>Submit</Button>{' '}
          <Button color="danger" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  )
}

export default ObservationForm