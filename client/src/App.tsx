import { Route, Routes } from 'react-router-dom'
import AppPage from '@pages/MainPage'

function App() {
  return (
    // Here we will give each page a path and route to it
    <Routes>

      <Route path='/' element={<AppPage />}></Route>

    </Routes>
  )
}

export default App
