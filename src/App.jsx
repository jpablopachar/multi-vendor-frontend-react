import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import Router from './router/Router'
import { getRoutes } from './router/routes'
import publicRoutes from './router/routes/PublicRoutes'
import { getCategories } from './store/reducers/homeReducer'

function App() {
  const [allRoutes, setAllRoutes] = useState([...publicRoutes])

  const dispatch = useDispatch()

  useEffect(() => {
    const routes = getRoutes()

    setAllRoutes([...allRoutes, routes])

    dispatch(getCategories())
  }, [])

  return (
    <>
      <Router allRoutes={allRoutes} />
    </>
  )
}

export default App
