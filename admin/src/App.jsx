import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Dashbord from './pages/Dashbord'
import ManageJobs from './pages/ManageJobs'
import ViewApplications from './pages/ViewApplications'
import AddJobs from './pages/AddJobs'
import 'quill/dist/quill.snow.css'
import { AppContext , AppcontextProvider} from './context/contextStore'
import RecruterLogin from './pages/RecruiterLogin'
import { useState } from 'react'
import { ToastContainer } from 'react-toastify'
import { useContext } from 'react'


function App() {

  const { companyToken } = useContext(AppContext)
  

  const [showRecruiterLogin, setShowRecruiterLogin] = useState(false)

  return (
    <>
      <BrowserRouter>
        <>
            <div>
              <ToastContainer />
              <Routes>
                <Route path="/" element={<RecruterLogin setShowRecruiterLogin={setShowRecruiterLogin} />} />
                {companyToken ? <>
                  <Route path='/dashbord' element={<Dashbord />}>
                    <Route path='manage-job' element={<ManageJobs />} />
                    <Route path='view-application' element={<ViewApplications />} />
                    <Route path='add-job' element={<AddJobs />} />
                  </Route>
                </> : null}
              </Routes>
            </div>
        </>
      </BrowserRouter>
    </>
  )
}

export default App
