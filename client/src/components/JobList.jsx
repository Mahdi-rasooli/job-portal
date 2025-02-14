import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/contextStore'
import { assets, JobCategories, JobLocations, jobsData } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import JobCard from './jobCard'
import axios from 'axios'
import { toast } from 'react-toastify'

const JobList = () => {

    const { searchFilter, setSearchFilter, isSearching } = useContext(AppContext)

    const { backendUrl, setJobs } = useContext(AppContext)

    const [data, setData] = useState([])

    const [showFilter, setShowFilter] = useState(true)

    const [currentPage, setCurrentPage] = useState(1)

    const [selectedCategories, setSelectedCategories] = useState([])

    const [selectedLocation, setSelectedLocation] = useState([])

    const [filteredJobs, setFilteredJobs] = useState(data)
    
    

    const navigate = useNavigate()

    const fetchJobsData = async () => {

        try {
            const response = await axios.get(backendUrl + '/api/jobs/')

            if (response.data.success) {
                setData(response.data.jobs)
            }
            else {
                console.log('Failed to fetch data');
            }

        } catch (error) {
            toast.error('Network Error')
        }
    }
    
    
    useEffect(() => {
        fetchJobsData()
    }, [])

    const handleChangeCatergory = (category) => {
        setSelectedCategories(
            prev => prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
        )
    }

    const handleChangeLocation = (location) => {
        setSelectedLocation(
            prev => prev.includes(location) ? prev.filter(c => c !== location) : [...prev, location]
        )
    }

    useEffect(() => {

        const mathcesCategory = job => selectedCategories.length === 0 || selectedCategories.includes(job.category)

        const mathcesLocation = job => selectedLocation.length === 0 || selectedLocation.includes(job.location)

        const mathcesTitle = job => searchFilter.title === "" || job.title.toLowerCase().includes(searchFilter.title.toLowerCase())

        const mathcesLocationSearch = job => searchFilter.location === "" || job.title.toLowerCase().includes(searchFilter.location.toLowerCase())

        const newfilteredJobs = data.slice().reverse().filter(
            job => mathcesCategory(job) && mathcesLocation(job) && mathcesTitle(job) && mathcesLocationSearch(job)
        )

        setFilteredJobs(newfilteredJobs)
        setCurrentPage(1)
    }, [data, selectedCategories, selectedLocation, searchFilter])

    //console.log(filteredJobs)

    return (
        <div className='container 2xl:px-20 flex flex-col lg:flex-row mx-auto max-lg:space-y-8 py-8'>
            <div className='bg-white w-full lg:w-1/4 px-4'>
                {
                    isSearching && (searchFilter.title !== '' || searchFilter.location !== '')
                        ? <>
                            <h3 className='text-lg mb-4 font-medium'>Cuurent Search</h3>
                            <div className='flex mb-5'>
                                <div className='mb-4 text-gray-600'>
                                    {searchFilter.title
                                        ? <span className='inline-flex items-center bg-blue-50 px-4 py-1.5 rounded border border-blue-200 gap-2.5'>
                                            {searchFilter.title}
                                            <img onClick={(event) => setSearchFilter(prev => ({ ...prev, title: '' }))} className='cursor-pointer' src={assets.cross_icon} alt="" />
                                        </span>

                                        : <></>}
                                </div>
                                <div className='mb-4 text-gray-600'>
                                    {searchFilter.location
                                        ? <span className='inline-flex items-center ml-2 bg-red-50 px-4 py-1.5 rounded border border-red-200 gap-2.5'>
                                            {searchFilter.location}
                                            <img onClick={(event) => setSearchFilter(prev => ({ ...prev, location: '' }))} className='cursor-pointer' src={assets.cross_icon} alt="" />
                                        </span>
                                        : <></>}
                                </div>
                            </div>
                        </> : <></>
                }

                <button onClick={e => setShowFilter(prev => !prev)} className='lg:hidden px-6 py-1.5 border border-gray-400 rounded'>
                    {showFilter ? 'close' : 'filter'}
                </button>



                <div className={showFilter ? "" : 'max-lg:hidden mb-8'}>
                    <h3 className='text-lg py-4 mb-2 font-medium'>Search by Categories</h3>
                    <ul className='space-y-4 text-gray-600'>
                        {
                            JobCategories.map((category, index) => (
                                <li key={index} className='mb-4 text-gray-600 flex gap-3 items-center'>
                                    <input type="checkbox" className='scale-125'
                                        onChange={() => handleChangeCatergory(category)}
                                        checked={selectedCategories.includes(category)} />
                                    {category}
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <div className={showFilter ? "" : 'max-lg:hidden'}>
                    <h3 className='text-lg py-4 mb-2 font-medium'>Search by Location</h3>
                    <ul className='space-y-4 text-gray-600'>
                        {
                            JobLocations.map((location, index) => (
                                <li key={index} className='mb-4 text-gray-600 flex gap-3 items-center'>
                                    <input type="checkbox" className='scale-125'
                                        onChange={() => handleChangeLocation(location)}
                                        checked={selectedLocation.includes(location)} />
                                    {location}
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
            <div className='w-full max-lg:px-4 lg:w-3/4 text-gray-800'>
                <h3 className='font-medium text-3xl py-2' id='job-list'>Latest jobs</h3>
                <p className='mb-8'>Get your desired job from top companies</p>
                <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4'>
                    {/*jobsData.map((job, index) => (
                        <JobCard key={index} job={job} />
                    ))*/}
                    {filteredJobs.slice((currentPage - 1) * 6, currentPage * 6).map((job, index) => (

                        <div key={index} className='p-6 shadow rounded border'>
                            <div className='flex justify-between items-center'>
                                <img src={job.companyId.image} className='h-8 ' alt="" />
                            </div>
                            <h3 className='font-medium text-xl mt-2'>{job.title}</h3>
                            <div className='flex items-center gap-3 mt-3 text-xs'>
                                <span className=' bg-blue-50 px-4 py-1.5 rounded border border-blue-200'>
                                    {job.location}
                                </span>
                                <span className='bg-red-50 px-4 py-1.5 rounded border border-red-200'>
                                    {job.title}
                                </span>
                            </div>
                            <p className='text-gray-500 text-sm mt-4' dangerouslySetInnerHTML={{ __html: job.description.slice(0, 150) }}>
                            </p>
                            <div className='flex gap-4 mt-4 text-sm'>
                                <button onClick={() => { navigate(`/apply-job/${job._id}`); scrollTo(0, 0) }} className='bg-blue-600 rounded py-2 px-4  text-white'>Apply now</button>
                                <button onClick={() => { navigate(`/apply-job/${job._id}`); scrollTo(0, 0) }} className='bg-white rounded py-2 px-4  text-gray-500 border border-gray-500'>Learn more</button>
                            </div>
                        </div>
                    ))
                    }
                </div>
                {filteredJobs.length > 0 && (
                    <div className='flex items-center justify-center space-x-2 mt-10'>
                        <a href="#job-list">
                            <img onClick={() => setCurrentPage(Math.max(currentPage - 1))} src={assets.left_arrow_icon} alt="" />
                        </a>
                        {Array.from({ length: Math.ceil(filteredJobs.length / 6) }).map((_, index) => (
                            <a key={index} href="#job-list">
                                <button onClick={() => setCurrentPage(index + 1)}
                                    className={`w-10 h-10 flex items-center justify-center rounded border border-gray-300 ${currentPage === index + 1 ? 'bg-blue-100 text-blue-500' : 'text-gray-500'}`}>
                                    {index + 1}
                                </button>
                            </a>
                        ))}
                        <a href="#job-list">
                            <img onClick={() => setCurrentPage(Math.min(currentPage + 1, Math.ceil(filteredJobs.length / 6)))} src={assets.right_arrow_icon} alt="" />
                        </a>
                    </div>
                )}
            </div>
        </div>
    )
}

export default JobList