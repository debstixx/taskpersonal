import React, { useState } from 'react'
import Navlogo from "../assets/nav-logo.png"
import NavImg from "../assets/nav-img.png"
import { Plus, SquarePen, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom'

const Mytask = () => {
       const handleSubmit = (e) => {
          e.preventDefault()
       }

      const [isVisible, setIsVisible] = useState(true);
            const handleDelete = () => {
               setIsVisible(false);
                    };
      const [isVisible2, setIsVisible2] = useState(true);
            const handleDelete2 = () => {
               setIsVisible(false);
                    };
      const [isVisible3, setIsVisible3] = useState(true);
            const handleDelete3 = () => {
               setIsVisible(false);
                    };
      const [isVisible4, setIsVisible4] = useState(true);
            const handleDelete4 = () => {
               setIsVisible(false);
                    };
return (
    <div>
        <nav className='"bg-gray-900 shadow-md border-b-stone-500 w-full z-30'>
            <div className='container mx-auto w-11/12 px-2 py-2 flex justify-between items-center'>
                <div className='flex flex-row gap-1 items-center'>
                  <span><img src={Navlogo} className='w-[32px] md:w-[39.91px] md:h-[41px]'/></span>
                 <Link to="/"><h1 className="font-semibold text-xl md:text-3xl md:w-[128px] md:h-[34px] text-blue-900 font-['Signika_Negative'] ">TaskDuty</h1></Link>
                </div>
                <div className="flex gap-4 md:flex md:gap-10 items-center">
                  <Link to="/newtask"><h1 className="font-['Signika_Negative'] text-base md:text-2xl font-medium">New Task</h1></Link>
                  <span><img src={NavImg} className='w-[35px] h-[35px] md:w-[60px] md:h-[60px]'/></span>
                </div>
            </div>
        </nav>
          
          {/* Hero Text */}
        <div className='container mx-auto w-11/12 px-2 py-4 flex justify-between items-center'>
             <h1 className="text-[rgba(41,41,41,1)] font-['Signika_Negative'] font-medium text-2xl md:text-4xl">My Tasks</h1>
             <Link to="/newtask"><div className='flex flex-row gap-1 md:gap-3 items-center'>
                <Plus className='text-[rgba(151,79,208,1)] w-[18px] md:w-auto'/>
                <h2 className="font-['Signika_Negative'] font-medium text-base md:text-2xl text-[rgba(151,79,208,1)]">Add New Task</h2>
             </div></Link>
        </div>
          
          {/* 1st TASK */}
      {isVisible && (
        <div className='container mx-auto w-11/12 px-4 py-4 border rounded border-[rgba(184,182,182,1)]'>
              <div className='flex justify-between items-center'>
                  <h3 className="font-normal font-['Signika_Negative'] text-[rgba(243,131,131,1)] text-2xl">Urgent</h3>
                  <div className='flex flex-row gap-2 md:gap-8'>
                      <Link to="/editask"><button className='flex flex-row gap-1 md:gap-2 bg-[rgba(151,79,208,1)] px-2 md:px-4 py-2 item-center rounded'>
                        <SquarePen className='text-[rgba(250,249,251,1)] w-[16px]'/>
                        <h3 className="text-[rgba(250,249,251,1)] font-['Signika_Negative'] text-base">Edit</h3>
                      </button></Link>
                      <button onClick={handleDelete} className='flex flex-row gap-1 md:gap-2 px-2 md:px-4 py-2 item-center rounded border border-[rgba(151,79,208,1)]'>
                        <Trash2 className="text-[rgba(151,79,208,1)] w-[16px]"/>
                        <h3 className="text-[rgba(151,79,208,1)] font-['Signika_Negative'] text-base">Delete</h3>
                      </button>
                  </div>
              </div>
              <hr className="border border-[rgba(184,182,182,1)] mt-6" />
              <div className='mt-2'>
                  <h2 className="font-['Signika_Negative'] text-[rgba(41,41,41,1)] font-normal text-2xl md:text-4xl">FinTech Website Update</h2>
                  <p className="font-['Signika_Negative'] text-[rgba(115,113,113,1)] text-lg md:text-2xl font-light md:font-normal">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet quis nibh posuere non tempor. Erat mattis gravida pulvinar nibh aliquam faucibus et magna. Interdum eu tempus ultricies cras neque mi. Eget tellus suspendisse et viverra.</p>
              </div>
        </div>
      )}

        {/* 2nd TASK */}
        {isVisible2 && (
        <div className='container mx-auto w-11/12 px-4 py-4 mt-10 border rounded border-[rgba(184,182,182,1)]'>
              <div className='flex justify-between items-center'>
                  <h3 className="font-normal font-['Signika_Negative'] text-[rgba(115,195,166,1)] text-2xl">Important</h3>
                  <div className='flex flex-row gap-2 md:gap-8'>
                      <Link to="/editask"><button className='flex flex-row gap-1 md:gap-2 bg-[rgba(151,79,208,1)] px-2 md:px-4 py-2 item-center rounded'>
                        <SquarePen className='text-[rgba(250,249,251,1)] w-[16px]'/>
                        <h3 className="text-[rgba(250,249,251,1)] font-['Signika_Negative'] text-base">Edit</h3>
                      </button></Link>
                      <button onClick={handleDelete2} className='flex flex-row gap-1 md:gap-2 px-2 md:px-4 py-2 item-center rounded border border-[rgba(151,79,208,1)]'>
                        <Trash2 className="text-[rgba(151,79,208,1)] w-[16px]"/>
                        <h3 className="text-[rgba(151,79,208,1)] font-['Signika_Negative'] text-base">Delete</h3>
                      </button>
                  </div>
              </div>
              <hr className="border border-[rgba(184,182,182,1)] mt-6" />
              <div className='mt-2'>
                  <h2 className="font-['Signika_Negative'] text-[rgba(41,41,41,1)] font-normal text-2xl md:text-4xl">Agro Website Update</h2>
                  <p className="font-['Signika_Negative'] text-[rgba(115,113,113,1)] text-lg md:text-2xl font-light md:font-normal">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet quis nibh posuere non tempor. Erat mattis gravida pulvinar nibh aliquam faucibus et magna. Interdum eu tempus ultricies cras neque mi. Eget tellus suspendisse et viverra.</p>
              </div>
        </div>
        )}

        {/* 3rd */}
        {isVisible3 && (
        <div className='container mx-auto w-11/12 px-4 py-4 mt-10 border rounded border-[rgba(184,182,182,1)]'>
              <div className='flex justify-between items-center'>
                  <h3 className="font-normal font-['Signika_Negative'] text-[rgba(243,131,131,1)] text-2xl">Urgent</h3>
                  <div className='flex flex-row gap-2 md:gap-8'>
                      <Link to="/editask"><button className='flex flex-row gap-1 md:gap-2 bg-[rgba(151,79,208,1)] px-2 md:px-4 py-2 item-center rounded'>
                        <SquarePen className='text-[rgba(250,249,251,1)] w-[16px]'/>
                        <h3 className="text-[rgba(250,249,251,1)] font-['Signika_Negative'] text-base">Edit</h3>
                      </button></Link>
                      <button onClick={handleDelete3} className='flex flex-row gap-1 md:gap-2 px-2 md:px-4 py-2 item-center rounded border border-[rgba(151,79,208,1)]'>
                        <Trash2 className="text-[rgba(151,79,208,1)] w-[16px]"/>
                        <h3 className="text-[rgba(151,79,208,1)] font-['Signika_Negative'] text-base">Delete</h3>
                      </button>
                  </div>
              </div>
              <hr className="border border-[rgba(184,182,182,1)] mt-6" />
              <div className='mt-2'>
                  <h2 className="font-['Signika_Negative'] text-[rgba(41,41,41,1)] font-normal text-2xl md:text-4xl">FinTech Website Update</h2>
                  <p className="font-['Signika_Negative'] text-[rgba(115,113,113,1)] text-lg md:text-2xl font-light md:font-normal">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet quis nibh posuere non tempor. Erat mattis gravida pulvinar nibh aliquam faucibus et magna. Interdum eu tempus ultricies cras neque mi. Eget tellus suspendisse et viverra.</p>
              </div>
        </div>
        )}

        {/* 4th TASK */}
        {isVisible4 && (
        <div className='container mx-auto w-11/12 px-4 py-4 mt-10 border rounded border-[rgba(184,182,182,1)]'>
              <div className='flex justify-between items-center'>
                  <h3 className="font-normal font-['Signika_Negative'] text-[rgba(115,195,166,1)] text-2xl">Important</h3>
                  <div className='flex flex-row gap-2 md:gap-8'>
                     <Link to="/editask"><button className='flex flex-row gap-1 md:gap-2 bg-[rgba(151,79,208,1)] px-2 md:px-4 py-2 item-center rounded'>
                        <SquarePen className='text-[rgba(250,249,251,1)] w-[16px]'/>
                        <h3 className="text-[rgba(250,249,251,1)] font-['Signika_Negative'] text-base">Edit</h3>
                      </button></Link>
                      <button onClick={handleDelete4} className='flex flex-row gap-1 md:gap-2 px-2 md:px-4 py-2 item-center rounded border border-[rgba(151,79,208,1)]'>
                        <Trash2 className="text-[rgba(151,79,208,1)] w-[16px]"/>
                        <h3 className="text-[rgba(151,79,208,1)] font-['Signika_Negative'] text-base">Delete</h3>
                      </button>
                  </div>
              </div>
              <hr className="border border-[rgba(184,182,182,1)] mt-6" />
              <div className='mt-2'>
                  <h2 className="font-['Signika_Negative'] text-[rgb(41,41,41)] font-normal text-2xl md:text-4xl">Agro Website Update</h2>
                  <p className="font-['Signika_Negative'] text-[rgba(115,113,113,1)] text-lg md:text-2xl font-light md:font-normal">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet quis nibh posuere non tempor. Erat mattis gravida pulvinar nibh aliquam faucibus et magna. Interdum eu tempus ultricies cras neque mi. Eget tellus suspendisse et viverra.</p>
              </div>
        </div>
        )}

        <div className='container mx-auto w-11/12 flex justify-center items-center mt-6 md:mt-10'>
             <span onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="underline cursor-pointer font-['Signika_Negative'] text-[rgba(151,79,208,1)] font-normal text-xl md:text-2xl">Back to Top</span>
        </div>     
        

    </div>
  )
}

export default Mytask
