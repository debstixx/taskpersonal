import React, { useState, useEffect } from 'react'
import Navlogo from "../assets/nav-logo.png"
import NavImg from "../assets/nav-img.png"
import { ChevronLeft } from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';

const Editask = () => {
    const navigate = useNavigate(); 
    //param to extracts :taskId dynamically from the active browser path
    const { taskId } = useParams();
    const [userName, setUserName] = useState("User");
    
    //each input usestates of the form to edit task;
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [tag, setTag] = useState("Urgent");
    const [submitting, setSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    //useEffect function to fetch user login name and sync with the database array;
    useEffect(() => {
        const storedName = localStorage.getItem("name");
        if (storedName) {
            setUserName(storedName);
        }
    }, []);

    //pre-fills input fields with database data immediately on page load
    useEffect(() => {
        const fetchTaskDetails = async () => {
            const token = localStorage.getItem("token");
            try {
                const response = await axios.get(`http://localhost:3000/api/v1/tasks/${taskId}`,
                   {
                    headers: { Authorization: `Bearer ${token}` }
                });
                
                //data mapper ensures it catches nested or direct objects safely
                const task = response.data.task || response.data;
                setTitle(task.title);
                setDescription(task.description);
                setTag(task.tag || "Urgent");
            } catch (error) {
                console.error("Error loading original task details:", error);
                setErrorMessage("Failed to read task records from the server.");
            }
        };
        
        if (taskId) fetchTaskDetails();
    }, [taskId]);
                  
    //function for logout button to clear token, name and navigate back to login;
    const handleLogout = () => {
        localStorage.removeItem("token"); 
        localStorage.removeItem("name");  
        navigate("/login");
    }

    
    //handleSubmit function to verify each input field and verify;
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage(""); //clear old error state string
        
        //conditional statement to check each field is empty or filled
        if (!title.trim() || !description.trim()) {
            setErrorMessage("Please fill out both the title and description fields before updating.");
            return;//stop function execution safely
        } setSubmitting(true); //lock the action button to submit information

        const token = localStorage.getItem("token");
        //send patch data parameters directly to my Node/Express server controller
        try { await axios.patch(`http://localhost:3000/api/v1/tasks/${taskId}`, 
                { title, description, tag }, 
                {
                    headers: {Authorization: `Bearer ${token}`}
                }
            );
            //setSubmitting set to false state to reset button state right before submition
            setSubmitting(false);
            navigate("/mytask");

        } catch (error) {
            console.error("Error updating current task:", error);
            setErrorMessage("Failed to update task records. Please try again.");
            
            //false state still keeps button here so the user can fix text and retry
            setSubmitting(false);
        }
    }

  return (
    <div>
          {/*navbar*/}
          <nav className='bg-white shadow-md border-b-stone-500 w-full z-30'>
                  <div className='container mx-auto w-11/12 px-2 py-2 flex justify-between items-center'>
                        <div className='flex flex-row gap-1 items-center'>
                              <span><img src={Navlogo} className='w-[32px] md:w-[39.91px] md:h-[41px]' alt="logo"/></span>
                              <h1 className="font-semibold text-xl md:text-3xl md:w-[128px] md:h-[34px] text-blue-900 font-['Signika_Negative'] ">TaskDuty</h1>
                        </div>
                        <div className="flex gap-2 md:gap-6 items-center">
                              <h1 className="font-['Signika_Negative'] text-xs md:text-2xl hidden md:block font-medium text-center">Welcome <span className="text-[rgba(151,79,208,1)] font-['Signika_Negative'] font-semibold text-xs md:text-2xl">{userName}</span></h1>
                              <Link to="/profile"><span><img src={NavImg} className='w-[35px] h-[35px] md:w-[60px] md:h-[60px]' alt="avatar"/></span></Link>
                              <button onClick={handleLogout} className="bg-red-500 hover:bg-red-800 text-white rounded-xl font-['Signika_Negative'] text-xs md:text-sm px-3 py-2 md:px-4 md:py-2 cursor-pointer transition duration-200">Logout</button>
                        </div>
                  </div>
           </nav>

          {/*hero section*/}
          <div className='container mx-auto w-11/12 px-2 py-4 flex flex-row items-center gap-0.5 md:gap-2'>
              <Link to="/mytask"><ChevronLeft className="text-[rgba(41,41,41,1)] w-[32px] h-[32px] md:w-[40px] md:h-[40px]"/></Link>
              <h1 className="font-['Signika_Negative'] text-[rgba(41,41,41,1)] text-2xl md:text-4xl font-medium">Edit Task</h1>
          </div>

          {/*form input section*/}
          <div className='container mx-auto w-11/12 px-2 py-4'>
                <form onSubmit={handleSubmit}>
                      
                      {/*title field*/}
                      <div className='relative'>
                            <input 
                              type="text" 
                              id="title" 
                              value={title}
                              onChange={(event) => setTitle(event.target.value)}
                              placeholder='Project Completion' 
                              className="block py-1 px-2 md:px-6 w-full h-[50px] md:h-[71px] border border-[rgba(184,182,182,1)] rounded text-xs md:text-sm text-gray-700 font-['Signika_Negative'] font-normal focus:outline-none"/>
                            <label htmlFor="title" className="text-[rgba(156,156,156,1)] font-['Signika_Negative'] text-base md:text-2xl absolute font-normal -top-3 md:-top-4 left-4 md:left-8 bg-white px-0.5">Task Title</label>
                      </div>
                      
                      {/*description field */}
                      <div className='relative mt-8 md:mt-10'>
                            <textarea 
                              id="description" 
                              value={description}
                              onChange={(event) => setDescription(event.target.value)}
                              placeholder='Briefly describe updates...' 
                              className="block py-4 px-2 md:px-6 w-full h-[120px] md:h-[180px] border border-[rgba(184,182,182,1)] rounded text-xs md:text-sm text-gray-700 font-['Signika_Negative'] font-normal focus:outline-none"></textarea>
                            <label htmlFor="description" className="text-[rgba(156,156,156,1)] font-['Signika_Negative'] text-base md:text-2xl absolute font-normal -top-3 md:-top-4 left-4 md:left-8 bg-white px-0.5">Description</label>
                      </div>
                      
                      {/* tags selection field*/}
                      <div className='relative mt-8 md:mt-10'>
                            <select 
                              id="tag" 
                              value={tag}
                              onChange={(event) => setTag(event.target.value)}
                              className="block py-1 px-2 md:px-6 w-full h-[50px] md:h-[71px] border border-[rgba(184,182,182,1)] rounded text-xs md:text-sm text-gray-700 font-['Signika_Negative'] font-normal bg-white focus:outline-none"
                            >
                                <option value="Urgent" className='bg-[rgba(243,131,131,1)] text-white'>Urgent</option>
                                <option value="Important" className='bg-[rgba(115,195,166,1)] text-white'>Important</option>
                            </select>
                            <label htmlFor="tag" className="text-[rgba(156,156,156,1)] font-['Signika_Negative'] text-base md:text-2xl absolute font-normal -top-3 md:-top-4 left-4 md:left-8 bg-white px-0.5">Tags</label>
                      </div>

                      {/*errorMessage for invalid error text */}
                      {errorMessage && (
                          <p className="text-red-500 font-['Signika_Negative'] text-sm md:text-base mt-4 ml-1 font-medium animate-pulse">{errorMessage}</p>
                      )}
                      
                      {/*submit buton*/}
                      <button 
                        type="submit"
                        disabled={submitting}
                        className="text-[rgba(250,249,251,1)] mt-6 md:mt-10 w-full h-[45px] md:h-[66px] font-['Signika_Negative'] font-medium border rounded bg-[rgba(151,79,208,1)] transition duration-200 cursor-pointer hover:opacity-90 disabled:opacity-50"> {submitting ? "Saving Updates..." : "Done"}
                      </button>
                </form>
          </div>

          {/* back to Top */}
          <div className='container mx-auto w-11/12 flex justify-center items-center mt-2 md:mt-8'>
                  <span onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="underline cursor-pointer font-['Signika_Negative'] text-[rgba(151,79,208,1)] font-normal text-xl md:text-2xl">Back to Top</span>
          </div>  
    </div>
  )
}

export default Editask;



