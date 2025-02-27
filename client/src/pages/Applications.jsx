import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { assets, jobsApplied } from "../assets/assets";
import moment from 'moment'
import Footer from "../components/Footer";
import { AppContext } from "../context/contextStore";
import { toast } from "react-toastify";
import axios from "axios";

const Applications = () => {

  const [isEditted, setIsEditted] = useState(false)
  const [resume, setResume] = useState(null)

  const { userData, userToken } = useContext(AppContext)

  const [applicantsData, setApplicantsData] = useState([])

  const [resumeUrl, setResumeUrl] = useState("")


  const fetchUserApplications = async () => {

    try {
      const response = await axios.get(`http://localhost:5000/api/user/user-application/${userData._id}`, { headers: { token: userToken } });


      if (response.data.success) {
        setApplicantsData(response.data.appliedJob)

      }
      else {
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error('Something went wrong')
    }
  }


  useEffect(() => {
    if (userData._id) {
      fetchUserApplications();
    }

  }, [userData])


  const uploadResume = async () => {

    if (!resume) {
      toast.error('Please first select a resume file')
      return 
    }

    try {
      const formData = new FormData()
      formData.append('resume', resume)


      const response = await axios.post('http://localhost:5000/api/user/update-resume',
        formData,
        {
          headers: {
            'Content-Type': "multipart/form-data",
            token: userToken
          }
        })


      if (response.data.success) {
        toast.success('Resume uploaded')
        setResumeUrl(response.data.resume)
        setIsEditted(false)
      }
      else {
        toast.error(response.data.message)
      }

    } catch (error) {
      toast.error('Something went wrong')
    }
  }



  return (
    <>
      <Navbar />
      <div className="container px-4 min-h-[65vh] 2xl:px-20 mx-auto my-10">
        <h2 className="text-xl font-semibold">Your Resume</h2>
        <div className="flex gap-2 mb-6 mt-3">
          {isEditted ?
            <>
              <label className="flex items-center" htmlFor="resumeUpload">
                <p className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg mr-2">Select Resume</p>
                <input id="resumeUpload" onChange={e => setResume(e.target.files[0])} type="file" hidden accept="application/pdf" />
                <img src={assets.profile_upload_icon} alt="" />
              </label>
              <button onClick={uploadResume} className="bg-green-100 border border-green-40 rounded-lg px-4 py-2 ">Save</button>
            </> :
            <div className="flex gap-2">
              <a href={resumeUrl} target="_blank" className="text-blue-600 bg-blue-100 px-4 py-2 rounded-lg">resume</a>
              <button onClick={() => setIsEditted(true)} className="text-gray-500 border border-gray-300 rounded-lg px-4 py-2">
                Edit
              </button>
            </div>}

        </div>
        <h2 className="text-xl mb-4 font-semibold">Jobs applied</h2>
        <table className="min-w-full bg-white border rounded-lg ">
          <thead>
            <tr>
              <th className="py-3 px-4 border text-left">Company</th>
              <th className="py-3 px-4 border text-left">Job title</th>
              <th className="py-3 px-4 border text-left max-sm:hidden">Location</th>
              <th className="py-3 px-4 border text-left max-sm:hidden">Date</th>
              <th className="py-3 px-4 border text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {applicantsData.map((job, index) => true ? (
              <tr>
                <td className="py-3 px-4 flex items-center gap-2 border-b">
                  <img className="w-8 h-8" src={job.companyId.image} alt="" />
                  {job.companyId.name}
                </td>
                <td className="py-2 px-4 border-b">{job.jobId.title}</td>
                <td className="py-2 px-4 border-b max-sm:hidden">{job.jobId.location}</td>
                <td className="py-2 px-4 border-b max-sm:hidden">{moment(job.date).fromNow()}</td>
                <td className="py-2 px-4 border-b">
                  <span className={`${job.status === 'Accepted' ? `bg-green-100` : job.status === 'Rejected' ? 'bg-red-100' : 'bg-blue-100'} px-4 py-1.5 rounded`}>
                    {job.status}
                  </span>
                </td>
              </tr>
            ) : (null))}
          </tbody>
        </table>
      </div>
      <Footer />
    </>
  );
};

export default Applications;