// StrictMode is disabled because i'm using development api key
// and there's a request limit that is surpassed when it's on
import ReactDOM from "react-dom/client"
import './index.css'
import { Router, RouterProvider, createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen.ts'

const router = createRouter({ routeTree });
ReactDOM.createRoot(document.getElementById('root')!).render(  
    <RouterProvider router={router} />
)
