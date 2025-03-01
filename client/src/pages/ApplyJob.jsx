import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { useParams } from 'react-router-dom'
import { AppContext } from '../context/contextStore'
import Loading from '../components/Loading'
import { assets } from '../assets/assets'
import kConvert from 'k-convert'
import moment from 'moment'
import JobCard from '../components/jobCard'
import Footer from '../components/Footer'
import axios from 'axios'
import { toast } from 'react-toastify'

const ApplyJob = () => {


  const { id } = useParams()

  const [jobData, setJobData] = useState(null)

  const { jobs , backendUrl , companyToken } = useContext(AppContext)

  //console.log(jobs);
  

  const fetchJobs = async () => {
    const data = jobs.filter(job => job._id === id)
    if (data.length > 0) {
      setJobData(data[0])
      //console.log(data[0]);
    }
  }

  useEffect(() => {
    if (jobs.length > 0) {
      fetchJobs()
    }

  }, [id, jobs])

  //console.log(jobData._id);
  

  const applyUserForJob = async () => {

    try {

      const jobId = jobData._id

      const response = await axios.post(backendUrl + '/api/user/apply-job', {jobId} ,{ headers : { token : companyToken}})

      if (response.data.success) {
        toast.success("Apllied successfully")
      }
      else{
        toast.error(response.data.message)
      }
      
    } catch (error) {
      toast.error("Network Error")
    }
  }

  return jobData ? (
    <>
      <Navbar />
      <div className='container min-h-screen flex flex-col py-10 px-4 2xl:px-20 mx-auto'>
        <div className='bg-white text-black rounded-lg w-full'>
          <div className='flex flex-wrap justify-center md:justify-between gap-8 px-14 py-20 mb-6 bg-sky-50 border border-sky-400 rounded-xl '>
            <div className='flex flex-col md:flex-row items-center'>
              <img className='h-24 bg-white rounded-lg p-4 mr-4 max-md:mb-4 border' src={jobData.companyId.image} alt="" />
              <div className='text-center md:text-left text-neutral-700'>
                <h1 className='font-medium tex-2xl sm:text-4xl'>{jobData.title}</h1>
                <div className='flex flex-row flex-wrap max-md:justify-center gap-y-2 gap-6 items-center mt-2 text-gray-600'>
                  <span className='flex items-center gap-1'>
                    <img src={assets.suitcase_icon} alt="" />
                    {jobData.companyId.name}
                  </span>
                  <span className='flex items-center gap-1'>
                    <img src={assets.location_icon} alt="" />
                    {jobData.location}
                  </span>
                  <span className='flex items-center gap-1'>
                    <img src={assets.person_icon} alt="" />
                    {jobData.joblevel}
                  </span>
                  <span className='flex items-center gap-1'>
                    <img src={assets.money_icon} alt="" />
                    CTC : {kConvert.convertTo(jobData.salary)}
                  </span>
                </div>
              </div>
            </div>
            <div className='flex flex-col justify-center text-end text-sm max-md:mx-auto max-md:text-center'>
              <button className='bg-blue-500 rounded text-white px-10 p-2.5'>Apply now</button>
              <p className='mt-1 text-gray-600'>Posted : {moment(jobData.date).fromNow()}</p>
            </div>
          </div>

          <div className='flex flex-col justify-between lg:flex-row items-start'>
            <div className='w-full lg:w-2/3'>
              <h2 className='font-bold text-2xl mb-4'>Job description</h2>
              <div className='rich-text' dangerouslySetInnerHTML={{ __html: jobData.description}}></div>
              <button className='bg-blue-500 mt-10 rounded text-white px-10 p-2.5' onClick={applyUserForJob}>Apply now</button>
            </div>

            <div className='w-full lg:w-1/3 mt-8 lg:mt-0 lg:ml-8 space-y-5'>
              <h2>More jobs from {jobData.companyId.name}</h2> 
              {jobs.filter(job => job._id !== jobData._id && job.companyId._id === jobData.companyId._id)
              .filter(job => true).slice(0,4)
              .map((job,index) => <JobCard job={job} key={index}/>)}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>

  ) : (
    <Loading />
  )
}
//
export default ApplyJob