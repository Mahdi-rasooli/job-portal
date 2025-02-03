import React, { useState } from 'react'
import { assets, viewApplicationsPageData } from '../assets/assets'

const ViewApplications = () => {


  const [data, setData] = useState([])



  return (
    <div className='mx-auto container p-5'>
      <div className="max-w-4xl mx-auto  rounded-lg shadow border border-gray-200">
        <table className='w-full bg-white  max-sm:text-sm'>
          <thead>
            <tr className='border-b border-gray-200'>
              <th className='px-4 py-4 text-left'>#</th>
              <th className='px-4 py-2 text-left'>User name</th>
              <th className='px-4 py-2 text-left max-sm:hidden'>Job Title</th>
              <th className='px-4 py-2 text-left max-sm:hidden'>Location</th>
              <th className='px-4 py-2 text-left'>Resume</th>
              <th className='px-4 py-2 text-left'>Action</th>
            </tr>
          </thead>
          <tbody>
            {viewApplicationsPageData.map((applicant, index) => (
              <tr className='text-gray-700 border-b border-gray-200 py-4' key={index}>
                <td className='py-2.5 px-6 text-center'>{index + 1}</td>
                <td className='py-3.5 px-6 text-center flex'>
                  <img className='w-10 h-10 rounded-full mr-3 max-sm:hidden' src={applicant.imgSrc} alt="" />
                  <span className='mt-2'>{applicant.name}</span>
                </td>
                <td className='py-2 px-6 max-sm:hidden'>{applicant.jobTitle}</td>
                <td className='py-2 px-6 max-sm:hidden'>{applicant.location}</td>
                <td className='py-2 px-6'>
                  <a href="" target='_blank'
                     className='bg-blue-50 text-blue-400 px-3 py-1 rounded inline-flex gap-2 items-center'>
                    Resume <img src={assets.resume_download_icon} alt="" />
                  </a>
                </td>
                <td className='py-2.5 px-4 relative'>
                  <div className='relative inline-block text-left group'>
                    <button className='text-gray-500 action-button'>...</button>
                    <div className='z-10 hidden absolute right-0 md:left-0 top-0 mt-2 w-32 bg-white border border-gray-200 rounded shadow group-hover:block'>
                      <button className='block w-full text-left px-4 py-2 text-blue-500 hover:bg-gray-100 cursor-pointer'>Accept</button>
                      <button className='block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100 cursor-pointer'>Reject</button>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

  )
}

export default ViewApplications