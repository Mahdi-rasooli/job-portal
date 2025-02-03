import React, { useState } from 'react'
import { assets, jobsApplied } from '../assets/assets'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'

const ManageJobs = () => {

  const navigate = useNavigate()


  return (
    <div className='container mx-auto p-6'>
      <div className='border border-gray-200 overflow-x rounded-lg shadow max-w-5xl mx-auto'>
        <table className='min-w-full bg-white max-sm:text-sm'>
          <thead>
            <tr className='border-b border-gray-200 px-4 py-2 text-left'>
              <th className='px-4 py-2 max-sm:hidden'>#</th>
              <th className='px-4 py-2'>Job Title</th>
              <th className='px-4 py-2 max-sm:hidden'>Date</th>
              <th className='px-4 py-2 max-sm:hidden'>Location</th>
              <th className='px-4 py-2'>Applicants</th>
              <th className='px-4 py-2'>Visible</th>
            </tr>
          </thead>
          <tbody>
            {jobsApplied.map((job, index) => (
              <tr key={index} className='border-b border-gray-200 text-left text-gray-600'>
                <td className='px-5 py-4 max-sm:hidden'>{index + 1}</td>
                <td className='px-5 py-4'>{job.title}</td>
                <td className='px-5 py-4 max-sm:hidden'>{moment(job.date).format('ll')}</td>
                <td className='px-6 py-4 max-sm:hidden'>{job.location}</td>
                <td className='px-6 py-4 text-center'>2</td>
                <td className='px-6 py-4'>
                  <input className='ml-2 w-11' type="checkbox" name="" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='flex justify-end mt-4'>
        <button onClick={() => navigate('/dashbord/add-job')} className='bg-black text-white cursor-pointer px-5 py-2 rounded hover:bg-gray-800'>Add New Job</button>
      </div>
    </div>
  )
}

export default ManageJobs