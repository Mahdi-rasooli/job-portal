import { createContext, useEffect, useState } from "react";
import { jobsData } from "../assets/assets";
import axios from 'axios'
import { toast } from 'react-toastify'

export const AppContext = createContext()

export const AppcontextProvider = (props) => {

    const backendUrl = `http://localhost:5000`

    const [companyToken , setCompanyToken] = useState(null)
    const [companyData , setCompanyData] = useState(null)

    const [jobs , setJobs] = useState([])

    const fetchJobs = () => {
        setJobs(jobsData)
    }

    const fetchCompanyData = async () => {
        
        try {
            
            const { data } = await axios.get(backendUrl + '/api/company/company' , { headers : {token : companyToken}})
            
            if (data.success) {
                setCompanyData(data.company)
            }

            else{
                toast.error(data.message)
            }
            

        } catch (error) {            
           toast.error(error.message)
            
        }
    }

    useEffect(() => {

        fetchJobs()

        const storedToken = localStorage.getItem('companyToken')

        if (storedToken) {
            setCompanyToken(storedToken)
        }
    },[])

    useEffect(() => {
        if (companyToken) {
            fetchCompanyData()
        }
    },[companyToken])



    const value = {
        companyData, setCompanyData,
        companyToken, setCompanyToken,
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