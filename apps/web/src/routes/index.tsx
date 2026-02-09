import { createFileRoute, Outlet } from '@tanstack/react-router'
import { Home } from '../components/Home/Home'
export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div id="home-flex-container">
      <Home></Home>
      <Outlet></Outlet>

    </div>
  )
}
