import React, { useState } from 'react'
import {
  Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormText
} from 'reactstrap'
import './ObservationForm.css'

const ObservationForm = (props) => {
  /* State for form modal */
  const [isOpen, setIsOpen] = useState(false)
  /* State for user observation*/
  const [observation, setObservation] = useState({
    rarity: '',
    name: '',
    _attachments: null,
    note: '',
    timestamp: ''
  })

  /* Function for adding an image in to the observation  */
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

  /* Function for toggling the form modal */
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

  /* Handle save operator, also has a simple form validation if user forgets to fill in one of the required fields. */
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
    <div className='form' >
      <Button color="primary" onClick={toggle}>New Observation</Button>
      <Modal isOpen={isOpen} toggle={toggle} >
        <ModalHeader toggle={toggle}>Add New Observation</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="name">Name<span className='required' >*</span></Label>
              <Input type="text" name="name" id="name" placeholder="Name of bird" onChange={handleChange} />
            </FormGroup>
            <FormGroup>
              <Label for="raritySelect">Rarity<span className='required' >*</span></Label>
              <Input type="select" name="rarity" id="raritySelect" onChange={handleChange} >
                <option>--Select One--</option>
                <option>Common</option>
                <option>Rare</option>
                <option>Extremely Rare</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="notes">Notes<span className='required' >*</span></Label>
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