import React from 'react'
import {
  Navbar,
  NavbarBrand,

} from 'reactstrap'

const AppNavbar = () => {
  return (
    <Navbar color="light" light expand="md">
      <NavbarBrand href="/">Bird Watching App</NavbarBrand>
    </Navbar>
  )
}

export default AppNavbar
