import React, { useState, useEffect } from 'react'
import Navlogo from "../assets/nav-logo.png"
import NavImg from "../assets/nav-img.png"
import { ChevronLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';

const Profile = () => {
    const navigate = useNavigate();
    const [userName, setUserName] = useState("User");
    
    //each input usestates of the form to update profile name and password;
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    //useEffect function to fetch user login name and sync with the database array;
    useEffect(() => {
        const storedName = localStorage.getItem("name");
        if (storedName) {
            setUserName(storedName);
            setName(storedName); //setName input field is pre-filled with current name from lcalstrg
        }
    }, []);

    //function for logout button to clear token, name and navigate back to login;
    const handleLogout = () => {
        localStorage.removeItem("token"); 
        localStorage.removeItem("name");  
        navigate("/login");
    }

    //handleSubmit function to Send updates to my backend
    const handleSubmit = async (e) => {
                e.preventDefault();
                setErrorMessage("");
                setSuccessMessage("");

            if (!name.trim()) {
                setErrorMessage("Name field cannot be empty.");
                return;
            }

            setSubmitting(true);
            const token = localStorage.getItem("token");

            try {
                // Build dynamic payload object
                const updatePayload = { name };
                if (password.trim() !== "") {
                    updatePayload.password = password; // Only send password if they typed one
                }

                // Calls the exact route we just created on your backend!
                await axios.patch("http://localhost:3000/api/v1/profile", updatePayload, 
                    { headers: { Authorization: `Bearer ${token}` } }
                );

                //update browser storage so the navbar reflects the new name instantly
                localStorage.setItem("name", name);
                setUserName(name);
                setPassword(""); //this set to emptyto clear the password input field for security
                setSuccessMessage("Profile updated successfully!");
            } catch (error) {
                console.error("Profile update error:", error);
                setErrorMessage(error.response?.data?.msg || "Failed to update profile.");

                //false state still keeps button here so the user can fix text and retry
                setSubmitting(false);
            } 
            
    }

  return (
    <div className="min-h-screen bg-gray-50">
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

          {/* Back Button Row */}
          <div className='container mx-auto w-11/12 px-2 py-6 flex flex-row items-center gap-2'>
              <Link to="/mytask" className="hover:opacity-70 transition">
                  <ChevronLeft className="text-gray-800 w-8 h-8 md:w-10 md:h-10"/>
              </Link>
              <h1 className="font-['Signika_Negative'] text-gray-800 text-2xl md:text-4xl font-medium">My Profile</h1>
          </div>

          {/* Profile Edit Form Section */}
          <div className='container mx-auto w-11/12 max-w-2xl px-4 py-8 bg-white rounded-xl shadow-sm border border-gray-100'>
                <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Name Input Group */}
                      <div className='flex flex-col gap-2'>
                            <label htmlFor="name" className="text-gray-600 font-['Signika_Negative'] text-sm md:text-base font-medium">Update Name</label>
                            <input 
                              type="text" 
                              id="name" 
                              value={name}
                              onChange={(event) => setName(event.target.value)}
                              className="block p-3 w-full border border-gray-300 rounded-lg text-sm md:text-base text-gray-700 font-['Signika_Negative'] focus:outline-none"/>
                      </div>
                      
                      {/* Password Input Group */}
                      <div className='flex flex-col gap-2'>
                            <label htmlFor="password" className="text-gray-600 font-['Signika_Negative'] text-sm md:text-base font-medium">New Password</label>
                            <input 
                              type="password" 
                              id="password" 
                              value={password}
                              onChange={(event) => setPassword(event.target.value)}
                              placeholder="Leave blank to keep your current password"
                              className="block p-3 w-full border border-gray-300 rounded-lg text-sm md:text-base text-gray-700 font-['Signika_Negative'] focus:outline-none"/>
                      </div>

                      {/*errorMessage for invalid error text */}
                      {errorMessage && (
                          <p className="text-red-500 font-['Signika_Negative'] text-sm mt-2 font-medium">{errorMessage}</p>
                      )}
                      {successMessage && (
                          <p className="text-green-600 font-['Signika_Negative'] text-sm mt-2 font-medium">{successMessage}</p>
                      )}
                      
                      {/*submit button */}
                      <button 
                        type="submit"
                        disabled={submitting}
                        className="text-white w-full py-3 font-['Signika_Negative'] font-medium rounded-lg bg-purple-600 cursor-pointer">{submitting ? "Saving Changes..." : "Save Changes"}</button>
                </form>
          </div>
    </div>
  )
}

export default Profile;