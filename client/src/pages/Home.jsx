import React from 'react'
import Navbar from '../components/Navbar'
import Header from '../components/Header'
import JobList from '../components/JobList'
import AppDownload from '../components/AppDownload'
import Footer from '../components/Footer'

const Home = ({setShowRecruiterLogin}) => {
  return (
    <div>
        <Navbar setShowRecruiterLogin={setShowRecruiterLogin}/>
        <Header />
        <JobList />
        <AppDownload />
        <Footer />
    </div>
  )
}

export default Home