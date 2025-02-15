import { createContext, useEffect, useState } from "react";
import { jobsData } from "../assets/assets";

export const AppContext = createContext()

export const AppcontextProvider = (props) => {

    const backendUrl = `http://localhost:5000`

    const [searchFilter,setSearchFilter] = useState({
        title: '',
        location: ''
    })

    const [isSearching,setIsSearching] = useState(false)

    const [jobs, setJobs] = useState([])

    const [userToken , setUserToken] = useState(null);
    const [userData , setUserData] = useState([]);

    const fetchJobs = async() => {
        setJobs(jobsData)
    }

    useEffect(() => {
        fetchJobs()
    },[])

    const value = {
        searchFilter,
        setSearchFilter,
        isSearching,
        setIsSearching,
        jobs,
        setJobs,
        userData,
        setUserData,
        userToken,
        setUserToken,
        backendUrl
    }

    return (
        <>
         <AppContext.Provider value={value}>
            {props.children}
         </AppContext.Provider>
        </>
    )
}
