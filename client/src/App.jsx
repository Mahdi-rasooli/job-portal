import { useState } from 'react'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Home from './pages/Home'
import ApplyJob from './pages/ApplyJob'
import Applications from './pages/Applications'
import { AppcontextProvider } from './context/contextStore'
import LoginPopUp from './components/LoginPopUp'

function App() {

  const [showLogin, setShowLogin] = useState(false)
 

  return (
    <BrowserRouter>
      <>
        <AppcontextProvider>
          {showLogin ? <LoginPopUp setShowLogin={setShowLogin}/> : <></>}
            <div>
              <Routes>
                <Route path='/' element={<Home setShowLogin={setShowLogin}/>} />
                <Route path='/Apply-job/:id' element={<ApplyJob />} />
                <Route path='/Applications' element={<Applications />} />
              </Routes>
            </div>
        </AppcontextProvider>
      </>
    </BrowserRouter>
  )
}

export default App
