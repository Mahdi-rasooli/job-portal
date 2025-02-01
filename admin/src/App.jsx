import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Dashbord from './pages/Dashbord'
import ManageJobs from './pages/ManageJobs'
import ViewApplications from './pages/ViewApplications'
import AddJobs from './pages/AddJobs'


function App() {

  return (
    <>
      <BrowserRouter>
        <>
            <div>
              <Routes>
                <Route path='/dashbord' element={<Dashbord />}>
                   <Route path='manage-job' element={<ManageJobs />}/>
                   <Route path='view-application' element={<ViewApplications />}/>
                   <Route path='add-job' element={<AddJobs />}/>
                </Route>
              </Routes>
            </div>
        </>
      </BrowserRouter>
    </>
  )
}

export default App
