import React, { useContext } from 'react'
import { AppContext } from '../context/contextStore'
import { assets, JobCategories, JobLocations, jobsApplied, jobsData } from '../assets/assets'

const JobList = () => {

    const { searchFilter, setSearchFilter, isSearching } = useContext(AppContext)

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
                <div className='max-lg:hidden mb-8'>
                    <h3 className='text-lg py-4 mb-2 font-medium'>Search by Categories</h3>
                    <ul className='space-y-4 text-gray-600'>
                        {
                            JobCategories.map((category, index) => (
                                <li key={index} className='mb-4 text-gray-600 flex gap-3 items-center'>
                                    <input type="checkbox" className='scale-125' />
                                    {category}
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <div className='max-lg:hidden '>
                    <h3 className='text-lg py-4 mb-2 font-medium'>Search by Location</h3>
                    <ul className='space-y-4 text-gray-600'>
                        {
                            JobLocations.map((location, index) => (
                                <li key={index} className='mb-4 text-gray-600 flex gap-3 items-center'>
                                    <input type="checkbox" className='scale-125' />
                                    {location}
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
            <div className='w-full max-lg:px-4 lg:w-3/4 text-gray-800'>
                <h3 className='font-medium text-3xl py-2'>Latest jobs</h3>
                <p className='mb-8'>Get your desired job from top companies</p>
                <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4'>
                    {
                        jobsData.map((job, index) => (
                            
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
                                <p className='text-gray-500 text-sm mt-4' dangerouslySetInnerHTML={{__html:job.description.slice(0,150)}}>
                                    {/*job.description*/}
                                </p>
                                <div className='flex gap-4 mt-4 text-sm'>
                                    <button className='bg-blue-600 rounded py-2 px-4  text-white'>Apply now</button>
                                    <button className='bg-white rounded py-2 px-4  text-gray-500 border border-gray-500'>Learn more</button>
                                </div>
                            </div>
                         ) )
                    }
                </div>
            </div>
        </div>
    )
}

export default JobList