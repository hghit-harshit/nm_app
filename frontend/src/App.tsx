import { Route, Routes } from 'react-router-dom'
import MainPage from './pages/MainPage'
import Assignment1 from './pages/Assignment1'
import Assignment2 from './pages/Assignment2'
import Assignment3 from './pages/Assignment3'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/assignment1" element={<Assignment1 />} />
      <Route path="/assignment2" element={<Assignment2 />} />
      <Route path="/assignment3" element={<Assignment3 />} />
    </Routes>
  )                                                
}

export default App
