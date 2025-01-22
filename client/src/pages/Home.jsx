import React from 'react'
import Navbar from '../components/Navbar'
import Header from '../components/Header'
import JobList from '../components/JobList'
import AppDownload from '../components/AppDownload'

const Home = ({setShowLogin}) => {
  return (
    <div>
        <Navbar setShowLogin={setShowLogin}/>
        <Header />
        <JobList />
        <AppDownload />
    </div>
  )
}

export default Home