import * as React from 'react'
import { Menu } from '../components/Menu/Menu'
import threeBars from '../assets/icons8-cardápio-50.png'
import { Interface } from '../components/Interface/Interface'
import { Outlet, createRootRoute } from '@tanstack/react-router'
export const Route = createRootRoute({
  component: InterfaceLayOut,
})

function InterfaceLayOut() {
  return (
    <React.Fragment>
      <div id="interface-wrapper">
        <Interface />
      </div>
      <div id="menu-wrapper">
        <Menu></Menu>
        <img id="hamburguer-button" src={threeBars} alt="" />
     </div>
      <Outlet />
    </React.Fragment>
  )
}
