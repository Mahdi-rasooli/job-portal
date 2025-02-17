import { createContext, useEffect, useState } from "react";
import { jobsData } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext()

export const AppcontextProvider = (props) => {

    const backendUrl = `http://localhost:5000`

    const [searchFilter, setSearchFilter] = useState({
        title: '',
        location: ''
    })

    const [isSearching, setIsSearching] = useState(false)

    const [jobs, setJobs] = useState([])

    const [userToken, setUserToken] = useState(null);
    const [userData, setUserData] = useState([]);

    const fetchJobs = async () => {
        setJobs(jobsData)

        const storedToken = localStorage.getItem('userToken')

        if (storedToken) {
            setUserToken(storedToken)
        }
    }

    useEffect(() => {
        fetchJobs()
    }, [])


    const fetchUserData = async () => {

        try {
            const response = await axios.get('http://localhost:5000/api/user/getuser-data', { headers: { token: userToken } });

            if (response.data.success) {
                setUserData(response.data.userData)
            }
            else {
                toast.error(response.data.message)
            }

        } catch (error) {
            toast.error('Network Error')
        }
    }

    useEffect(() => {
        if (userToken) {
            fetchUserData()
        }
    }, [userToken])
    

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
