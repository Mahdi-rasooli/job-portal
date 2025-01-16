import React from 'react'
import Navbar from '../components/Navbar'
import Header from '../components/Header'

const Home = ({setShowLogin}) => {
  return (
    <div>
        <Navbar setShowLogin={setShowLogin}/>
        <Header />
    </div>
  )
}

export default Home