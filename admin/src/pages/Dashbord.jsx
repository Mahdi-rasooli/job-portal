import React from 'react'
import { Outlet } from 'react-router-dom'

const Dashbord = () => {
    return (
        <div>
            Dashbord
            <Outlet />
        </div>
    )
}

export default Dashbord