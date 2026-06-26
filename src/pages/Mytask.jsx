import React, { useState, useEffect } from 'react'
import Navlogo from "../assets/nav-logo.png"
import NavImg from "../assets/nav-img.png"
import { Plus, SquarePen, Trash2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';

const Mytask = () => {
       const navigate = useNavigate(); 
       const [userName, setUserName] = useState("User")
       
       //initial tasks and loading state before server sends data;
       const [tasks, setTasks] = useState([]);
       const [loading, setLoading] = useState(true);

       //grabbing local security token for authorization headers;
       const token = localStorage.getItem("token");
       const authConfig = {
           headers: {Authorization: `Bearer ${token}`}
          };
        
       //useEffect function to fetch user login name and sync with the database array;
       useEffect(() => {
            const storedName = localStorage.getItem("name");
            if (storedName) {
              setUserName(storedName);
            }

            const fetchTasks = async () => {
                try {const response = await axios.get("http://localhost:3000/api/v1/tasks", authConfig);
                    setTasks(response.data.tasks || []);//setTasks match getAllTask controller output payload structure: { success: true, tasks }, all tasks by logged in user
                    setLoading(false);
                } catch (error) {
                    console.error("Database connection error:", error);
                    setLoading(false);
                }
            }; fetchTasks();
       }, []);
      
      //function for logout button to clear token, name and navigate back to login;
      const handleLogout = () => {
          localStorage.removeItem("token"); 
          localStorage.removeItem("name");  
          navigate("/login");
       }

       //handle delete function to delete specific task;
       const handleDelete = async (taskId) => {
              //to send parameter to your dynamic backend route /:taskId
              try {await axios.delete(`http://localhost:3000/api/v1/tasks/${taskId}`, authConfig);
                  //setTasks to keep everything except the targeted task
                  setTasks(tasks.filter(task => task._id !== taskId));
              } catch (error) {
                  console.error("Could not complete task removal:", error);
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
      {/*Hero Text */}
      <div className='container mx-auto w-11/12 px-2 py-4 flex justify-between items-center'>
             <h1 className="text-[rgba(41,41,41,1)] font-['Signika_Negative'] font-medium text-2xl md:text-4xl">My Tasks</h1>
             <div className='flex flex-col md:flex-row gap-1 md:gap-6 items-center'>
                <Link to="/newtask">
                    <div className='flex flex-row gap-1 md:gap-3 items-center'>
                        <Plus className='text-[rgba(151,79,208,1)] w-[18px] md:w-auto'/>
                        <h2 className="font-['Signika_Negative'] font-medium text-base md:text-2xl text-[rgba(151,79,208,1)]">Add New Task</h2>
                    </div>
                </Link>
                <Link to="/trash">
                    <div className='flex flex-row gap-1 md:gap-2 items-center cursor-pointer'>
                        <Trash2 className='text-[rgba(151,79,208,1)] w-[18px] md:w-auto'/>
                        <h2 className="font-['Signika_Negative'] font-medium text-base md:text-2xl text-[rgba(151,79,208,1)]">View Trash</h2>
                    </div>
                </Link>
             </div>
      </div>
          
        {/* loading loop section from loading state if data have arrived or not from the server */}
      <div className="space-y-6">
            {loading && <p className="text-center font-['Signika_Negative'] mt-10">Syncing with server...</p>}
            
            {!loading && tasks.length === 0 && (
                <p className="text-center text-gray-400 font-['Signika_Negative'] text-xl mt-12">No tasks available. Click "Add New Task" to get started!</p>
            )}

            {/* The map loop processes your database array directly */}
            {!loading && tasks.map((task) => (
                <div key={task._id} className='container mx-auto w-11/12 px-4 py-4 border rounded border-[rgba(184,182,182,1)] bg-white shadow-sm'>
                      <div className='flex justify-between items-center'>
                          
                          {/*color contoller to change 'task.tag' schema input */}
                          <h3 className={`font-normal font-['Signika_Negative'] text-2xl ${task.tag === 'Urgent' ? 'text-[rgba(243,131,131,1)]' : 'text-[rgba(115,195,166,1)]'}`}>{task.tag || "General"}</h3>
                          
                          <div className='flex flex-row gap-2 md:gap-8'>
                              {/*passing values over state parameter payload for populate edit form instantly */}
                              <Link to={`/editask/${task._id}`} state={{ taskId: task._id, taskTitle: task.title, taskDesc: task.description, taskTag: task.tag }}>
                                  <button className='flex flex-row gap-1 md:gap-2 bg-[rgba(151,79,208,1)] px-2 md:px-4 py-2 item-center rounded'>
                                    <SquarePen className='text-[rgba(250,249,251,1)] w-[16px]'/>
                                    <h3 className="text-[rgba(250,249,251,1)] font-['Signika_Negative'] text-base">Edit</h3>
                                  </button>
                              </Link>
                              
                              {/*connecting trash icon click button to handleDelete function */}
                              <button onClick={() => handleDelete(task._id)} className='flex flex-row gap-1 md:gap-2 px-2 md:px-4 py-2 item-center rounded border border-[rgba(151,79,208,1)]'>
                                <Trash2 className="text-[rgba(151,79,208,1)] w-[16px]"/>
                                <h3 className="text-[rgba(151,79,208,1)] font-['Signika_Negative'] text-base">Delete</h3>
                              </button>
                          </div>
                      </div>
                      
                      <hr className="border border-[rgba(184,182,182,1)] mt-6" />
                      
                      <div className='mt-2'>
                          {/*mapping through each title and description from database */}
                          <h2 className="font-['Signika_Negative'] text-[rgba(41,41,41,1)] font-normal text-2xl md:text-4xl">{task.title}</h2>
                          <p className="font-['Signika_Negative'] text-[rgba(115,113,113,1)] text-lg md:text-2xl font-light md:font-normal mt-1">{task.description}</p>
                      </div>
              </div>
            ))}
      </div>

        {/*bottom navigate to top */}
        <div className='container mx-auto w-11/12 flex justify-center items-center mt-6 md:mt-10'>
             <span onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="underline cursor-pointer font-['Signika_Negative'] text-[rgba(151,79,208,1)] font-normal text-xl md:text-2xl">Back to Top</span>
        </div>     
  </div>
  )
}

export default Mytask






















































































































































