import Quill from 'quill'
import React, { useEffect, useRef, useState } from 'react'
import { JobCategories, JobLocations } from '../../../client/src/assets/assets'

const AddJobs = () => {

  const [data, setData] = useState({
    title: '',
    description: '',
    category: 'Programming',
    location: 'Banglore',
    level: 'Senior level',
    salary: ''
  })

  const editorRef = useRef(null)
  const quillRef = useRef(null)

  const onChangeHandler = (event) => {
    const name = event.target.name
    const value = event.target.value
    setData(prev => ({ ...prev, [name]: value }))
  }

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow',
      })
    }
  }, [])

  return (
    <div>
      <form className='container flex flex-col p-4 w-full items-start gap-3'>

        <div className='w-full'>
          <p className='mb-2'>Job Title</p>
          <input onChange={onChangeHandler} 
                 type="text" 
                 required 
                 placeholder='Type here' 
                 name='title' 
                 value={data.title} 
                  className='w-full max-w-lg px-3 py-2 border-2 border-gray-300'
                 />
        </div>

        <div className='w-full max-w-lg'>
          <p className='my-2'>Job Desciption</p>
          <div ref={editorRef}>
          </div>
        </div>


        <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
          <div>
            <p className='mb-2'>Job Category</p>
            <select className='border-2 border-gray-300 px-2 py-2 w-full' onChange={onChangeHandler} name='category'>
              {/* <option value="Programming">Programming</option>
              <option value="Data Science">Data Science</option>
              <option value="Networking">Networking</option>
              <option value="Designing">Designing</option>
              <option value="Management">Management</option>
              <option value="Marketing">Marketing</option>
              <option value="Cybersecurity">Cybersecurity</option> */}
              {JobCategories.map((category, index) => (
                <option key={index} value={category}>{category}</option>
              ))}
            </select>
          </div>

          <div>
            <p className='mb-2'>Job Location</p>
            <select className='border-2 border-gray-300 px-2 py-2 w-full' onChange={onChangeHandler} name='location'>
              {JobLocations.map((location, index) => (
                <option key={index} value={location}>{location}</option>
              ))}
            </select>
          </div>

          <div>
            <p className='mb-2'>Job Level</p>
            <select className='border-2 border-gray-300 px-2 py-2 w-full' onChange={onChangeHandler} name='Level'>
              <option value="Beginner level">Beginner level</option>
              <option value="Intermediate level">Intermediate level</option>
              <option value="Senior level">Senior level</option>
            </select>
          </div>
        </div>

        <div>
          <p className='mb-2'>Job Salary</p>
          <input min={0} 
                 className='w-full px-3 py-2 rounded sm:w-[120px] max-w-lg border-2 border-gray-300' 
                 onChange={onChangeHandler} 
                 value={data.salary} 
                 name='salary' 
                 type="Number" 
                 required 
                 placeholder='2500' />
        </div>

        <button className='w-28 py-3 mt-4 bg-black text-white cursor-pointer hover:bg-gray-800 rounded'>Add</button>
      </form>
    </div>
  )
}

export default AddJobs