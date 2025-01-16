import React from 'react'
import Navbar from '../components/Navbar'
import Header from '../components/Header'
import JobList from '../components/JobList'

const Home = ({setShowLogin}) => {
  return (
    <div>
        <Navbar setShowLogin={setShowLogin}/>
        <Header />
        <JobList />
    </div>
  )
}

export default Home