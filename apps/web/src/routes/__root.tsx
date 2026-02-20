import { Fragment } from 'react/jsx-runtime'
import { Menu } from '../components/Menu/Menu'
import threeBars from '../assets/icons8-cardápio-50.png'
import { Interface } from '../components/Interface/Interface'
import { Outlet, createRootRoute } from '@tanstack/react-router'
import { useRef } from 'react'
export const Route = createRootRoute({
  component: InterfaceLayOut,
  loader: async (): Promise<CookieListItem | null> => {
    const user = await cookieStore.get("username");
    return user;
  }
})

function InterfaceLayOut() {
  const hamburguerButtonRef = useRef<HTMLImageElement>(null);
  const usernameCookie = Route.useLoaderData();
  return (
    <Fragment>
      <div id="interface-wrapper" >
        <Interface usernameCookie={usernameCookie}/>
      </div>
      <div id="menu-wrapper">
        <Menu hamburguerButtonRef={hamburguerButtonRef}></Menu>
        <img id="hamburguer-button" ref={hamburguerButtonRef} src={threeBars} alt="" />
     </div>
      <Outlet />
    </Fragment>
  )
}
