import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import { Home } from './pages/Home'
import { Feed } from './pages/Feed'
import { NewConfession } from './pages/NewConfession'
import { Register } from './pages/Register'

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/nueva" element={<NewConfession />} />
          <Route path="/registro" element={<Register />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App
