import React, { useState, useEffect } from 'react'
import Navlogo from "../assets/nav-logo.png"
import NavImg from "../assets/nav-img.png"
import { RotateCcw } from 'lucide-react'; //icon for retrieving import from lucide
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';

const Trash = () => {
    const navigate = useNavigate(); 
    const [userName, setUserName] = useState("User")
    
    //state arrays for soft-deleted items and sync statuses to database
    const [deletedTasks, setDeletedTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    //grabbing local security token for authorization headers
    const token = localStorage.getItem("token");
    const authConfig = {
        headers: { Authorization: `Bearer ${token}` }
    };
     
    //useEffect function to fetch user login name and sync deleted tasks on page rendering
    useEffect(() => {
        const storedName = localStorage.getItem("name");
        if (storedName) {
            setUserName(storedName);
        }

        const fetchDeletedTasks = async () => {
            try {const response = await axios.get("http://localhost:3000/api/v1/tasks/trash", authConfig);//url linking to exact router.route("/trash").get(getDeletedTask)
                setDeletedTasks(response.data.tasks || []);
                setLoading(false);
            } catch (error) {
                console.error("Database connection error fetching trash:", error);
                setLoading(false);
            }
        }; 
        fetchDeletedTasks();
    }, []);
   
   //function for logout button to clear token, name and navigate back to login;
    const handleLogout = () => {
        localStorage.removeItem("token"); 
        localStorage.removeItem("name");  
        navigate("/login");
    };

    //handle retrieve function to recover soft-deleted task
    const handleRetrieve = async (taskId) => {
        try {
            //send parameter router.route("/retrieve/:taskId").patch(retrieveTask)
            await axios.patch(`http://localhost:3000/api/v1/tasks/retrieve/${taskId}`, {}, authConfig);
            
            //setDeleteTasks takes new array of filter out retrieved item from deleted tasks array
            setDeletedTasks(deletedTasks.filter(task => task._id !== taskId));
        } catch (error) {
            console.error("Could not retrieve the task:", error);
        }
    };

    return (
        <div>
            {/* Navbar */}
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

            {/* Hero Text */}
            <div className='container mx-auto w-11/12 px-2 py-4 flex justify-between items-center'>
                <h1 className="text-[rgba(41,41,41,1)] font-['Signika_Negative'] font-medium text-2xl md:text-4xl">Trash Bin</h1>
                <Link to="/mytask">
                    <h2 className="font-['Signika_Negative'] font-medium text-base md:text-xl text-[rgba(151,79,208,1)] underline">Back to Tasks</h2>
                </Link>
            </div>
               
            {/*loading loop section from loading state if data have arrived or not from the server */}
            <div className="space-y-6">
                {loading && <p className="text-center font-['Signika_Negative'] mt-10">Syncing with server...</p>}
                
                {!loading && deletedTasks.length === 0 && (
                    <p className="text-center text-gray-400 font-['Signika_Negative'] text-xl mt-12">Your trash bin is empty!</p>
                )}

                {/* Main Task List Loop matching your exact task container design */}
                {!loading && deletedTasks.map((task) => (
                    <div key={task._id} className='container mx-auto w-11/12 px-4 py-4 border rounded border-[rgba(184,182,182,1)] bg-white shadow-sm'>
                        <div className='flex justify-between items-center'>
                            
                            {/* Color control tag logic directly matching myTask */}
                            <h3 className={`font-normal font-['Signika_Negative'] text-2xl ${task.tag === 'Urgent' ? 'text-[rgba(243,131,131,1)]' : 'text-[rgba(115,195,166,1)]'}`}>{task.tag || "General"}</h3>
                            
                            <div className='flex flex-row gap-2 md:gap-8'>
                            {/* connecting RotateCcw icon click button to handleRetrieve function */}
                                <button onClick={() => handleRetrieve(task._id)} className='flex flex-row gap-1 md:gap-2 bg-[rgba(151,79,208,1)] hover:bg-purple-800 px-3 md:px-5 py-2 items-center rounded transition duration-200 shadow-sm'>
                                    <RotateCcw className='text-[rgba(250,249,251,1)] w-[16px]'/>
                                    <h3 className="text-[rgba(250,249,251,1)] font-['Signika_Negative'] text-base">Retrieve</h3>
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

            {/* Bottom Nav to Top */}
            <div className='container mx-auto w-11/12 flex justify-center items-center mt-6 md:mt-10'>
                <span onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="underline cursor-pointer font-['Signika_Negative'] text-[rgba(151,79,208,1)] font-normal text-xl md:text-2xl">Back to Top</span>
            </div>     
        </div>
    )
}

export default Trash;