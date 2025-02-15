import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import ApplyJob from './pages/ApplyJob'
import Applications from './pages/Applications'
import { AppcontextProvider } from './context/contextStore'
import LoginPopUp from './components/LoginPopUp'
import RecruiterLogin from './components/RecruiterLogin'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify';
import Authentication from './pages/Authentication'

function App() {

  const [showLogin, setShowLogin] = useState(false)

  const [showRecruiterLogin, setShowRecruiterLogin] = useState(false)


  return (
    <BrowserRouter>
      <>
        <AppcontextProvider>
        
          <div>
            {/*showRecruiterLogin ? <RecruiterLogin setShowRecruiterLogin={setShowRecruiterLogin} /> : <></>*/}
            <ToastContainer />
            <Routes>
              <Route path='/' element={<Home setShowRecruiterLogin={setShowRecruiterLogin} showRecruiterLogin={showRecruiterLogin} />} />
              <Route path='/Apply-job/:id' element={<ApplyJob />} />
              <Route path='/Applications' element={<Applications />} />
              <Route path='/Authentication' element={<Authentication />} />
            </Routes>
          </div>
        </AppcontextProvider>
      </>
    </BrowserRouter>
  )
}

export default App
