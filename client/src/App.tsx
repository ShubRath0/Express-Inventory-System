import { Route, Routes } from 'react-router-dom'
import MainPage from '@pages/MainPage'

function App() {
  return (
    // Here we will give each page a path and route to it
    <Routes>

      <Route path='/' element={<MainPage />}></Route>

    </Routes>
  )
}

export default App
