import React from 'react'
import Navlogo from "../assets/nav-logo.png"
import NavImg from "../assets/nav-img.png"
import { ChevronDown, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom'

const Newtask = () => {
           const handleSubmit = (e) => {
                e.preventDefault()
              }
  return (
    <div>
           
          <nav className='"bg-gray-900 shadow-md border-b-stone-500 w-full z-30'>
                <div className='container mx-auto w-11/12 px-2 py-2 flex justify-between items-center'>
                    <div className='flex flex-row gap-1 items-center'>
                        <span><img src={Navlogo} className='w-[32px] md:w-[39.91px] md:h-[41px]'/></span>
                        <Link to="/"><h1 className="font-semibold text-xl md:text-3xl md:w-[128px] md:h-[34px] text-blue-900 font-['Signika_Negative'] ">TaskDuty</h1></Link>
                    </div> 
                    <div className="flex gap-4 md:flex md:gap-10 items-center">
                        <Link to="/mytask"><h1 className="font-['Signika_Negative'] text-base md:text-2xl font-medium">All Task</h1></Link>
                        <span><img src={NavImg} className='w-[35px] h-[35px] md:w-[60px] md:h-[60px]'/></span>
                    </div>
                </div>
          </nav>

           {/* Hero Text */}
          <div className='container mx-auto w-11/12 px-2 py-4 flex flex-row items-center gap-0.5 md:gap-2'>
             <Link to="/"><ChevronLeft className="text-[rgba(41,41,41,1)] w-[32px] h-[32px] md:w-[40px] md:h-[40px]"/></Link>
             <h1 className="font-['Signika_Negative'] text-[rgba(41,41,41,1)] text-2xl md:text-4xl font-medium ">New Task</h1>
          </div>
          
          {/* Task Info */}
          <div className='container mx-auto w-11/12 px-2 py-4'>
              <form onSubmit={handleSubmit}>
                  <div className='relative'>
                      <input type="text" id="title" placeholder='E.g Project Defence, Assignment...' className="block py-1 px-2 md:px-6 w-full h-[50px] md:h-[71px] border border-[rgba(184,182,182,1)] rounded text-xs md:text-sm text-[rgba(204,204,204,1)] font-['Signika_Negative'] font-normal"/>
                      <label htmlFor="title" className="text-[rgba(156,156,156,1)] font-['Signika_Negative'] text-base md:text-2xl absolute font-normal -top-3 md:-top-4 left-4 md:left-8 bg-white px-0.5">Task Title</label>
                  </div>
                  <div className='relative'>
                      <textarea name="text" id="description" placeholder='Briefly describe your task...' className="block mt-8 md:mt-10 py-4 px-2 md:px-6 w-full h-[120px] md:h-[180px] border border-[rgba(184,182,182,1)] rounded text-xs md:text-sm text-[rgba(204,204,204,1)] font-['Signika_Negative'] font-normal"></textarea>
                      <label htmlFor="description" className="text-[rgba(156,156,156,1)] font-['Signika_Negative'] text-base md:text-2xl absolute font-normal -top-3 md:-top-4 left-4 md:left-8 bg-white px-0.5">Description</label>
                  </div>
                  <div className='relative'>
                      <input type="text" id="title" placeholder='Urgent  Important' className="block mt-8 md:mt-10 py-1 px-2 md:px-6 w-full h-[50px] md:h-[71px] border border-[rgba(184,182,182,1)] rounded text-xs md:text-sm text-[rgba(204,204,204,1)] font-['Signika_Negative'] font-normal"/>
                      <label htmlFor="title" className="text-[rgba(156,156,156,1)] font-['Signika_Negative'] text-base md:text-2xl absolute font-normal -top-3 md:-top-4 left-4 md:left-8 bg-white px-0.5">Tags</label>
                      <span className="text-[rgba(156,156,156,1)] absolute top-3 md:top-6 right-5 md:right-10"><ChevronDown/></span>
                  </div>
                  <Link to="/mytask"><button className="text-[rgba(250,249,251,1)] mt-6 md:mt-10 w-full h-[45px] md:h-[66px] font-['Signika_Negative'] font-medium border rounded bg-[rgba(151,79,208,1)]">Done</button></Link>
              </form>
          </div>
          <div className='container mx-auto w-11/12 flex justify-center items-center mt-2 md:mt-8'>
             <span onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="underline cursor-pointer font-['Signika_Negative'] text-[rgba(151,79,208,1)] font-normal text-xl md:text-2xl">Back to Top</span>
          </div>  
          
    </div>
  )
}

export default Newtask
