
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import WebTheme from "./themes/web-theme"
import ErrorPage from "./pages/error-page"
import Home from "./pages/home"
import DrawPlot from "./pages/draw-plot"
import AddPole from "./pages/add-pole"


function App() {

  const router = createBrowserRouter([

    {
      element: <WebTheme />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: <Home/>
        },
        {
          path: "/draw-plot",
          element: <DrawPlot/>
        },
        {
          path: "/add-pole",
          element: <AddPole/>
        },
      ]
    },
  ]);

  return (
    <>
    <RouterProvider router={router} />
    </>
  )
}

export default App
