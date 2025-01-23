import React from 'react'
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';

function JobCard({ job }) {

    const navigate = useNavigate()

    return (
        < div className='p-6 shadow rounded border' >
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
        </div >
    )
}

export default JobCard