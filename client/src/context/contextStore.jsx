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

    const [companyToken , setCompanyToken] = useState(null)
    const [companyData , setCompanyData] = useState(null)

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
        companyData,
        setCompanyData,
        companyToken,
        setCompanyToken,
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
