import Navigation from './components/common/Navigation'
import { Route, Routes } from 'react-router-dom'
import Admin from './pages/Admin'
import Home from './pages/Home'
import Post from './pages/Post'

function App() {

  return (
    <div className="min-h-screen bg-background w-screen">
      <Navigation/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/posts/:id" element={<Post />} />
      </Routes>
    </div>
  )
}

export default App
