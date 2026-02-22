import { Route, Routes } from 'react-router-dom'
import AppPage from '@pages/MainPage'
import TestPage from './pages/TestPage'

function App() {
  return (
    // Here we will give each page a path and route to it
    <Routes>

      <Route path='/' element={<AppPage />}></Route>
      <Route path="/test" element={<TestPage />}></Route>

    </Routes>
  )
}

export default App
