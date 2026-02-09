import { createFileRoute } from '@tanstack/react-router'
import { Login } from '../components/Entry/Login'
import * as React from 'react';
export const Route = createFileRoute('/login')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <React.Fragment>
        <Login></Login>
    </React.Fragment>
  )
}
