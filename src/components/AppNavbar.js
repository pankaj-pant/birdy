import React from 'react'
import {
  Navbar,
  NavbarBrand,
  NavLink
} from 'reactstrap'

const AppNavbar = () => {
  return (
    <Navbar color="light" light expand="md">
      <NavbarBrand href="/">Bird Watching App</NavbarBrand>
      <NavLink href="https://github.com/pankaj-pant/birdy#bird-watching-application" target="_blank" className="ml-auto">
            Help?
      </NavLink>
    </Navbar>
  )
}

export default AppNavbar
