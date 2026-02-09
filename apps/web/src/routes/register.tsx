import { createFileRoute } from '@tanstack/react-router';
import * as React from 'react';
import { Register } from '../components/Entry/Register';
export const Route = createFileRoute('/register')({
  component: RouteComponent,
});

function RouteComponent() {
  return <React.Fragment>
    <Register></Register>
  </React.Fragment>
}
