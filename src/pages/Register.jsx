import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    //error states for each register input field
    const [nameError, setNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [serverError, setServerError] = useState("");//the display error from backend server
          
        const navigate = useNavigate();//this send user to login page

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        //for clearing all error states on submit
        setNameError("");
        setEmailError("");
        setPasswordError("");
        setServerError("");

        let hasError = false;

        //name validation
        if (!name.trim()) {
            setNameError("Name is required");
            hasError = true;
        }

        //email validation
        if (!email.trim()) {setEmailError("Email is required");
            hasError = true;
        }

        //password validation
        if (!password.trim()) {setPasswordError("Password is required");
            hasError = true;
        } else if (password.length < 8) {setPasswordError("Password must be at least 8 characters");
            hasError = true;
        }

        if (hasError) {return;}//stop if any errors exist

      try { const response = await axios.post("http://localhost:3000/api/v1/register", {
                  name: name,
                  email: email,
                  password: password
            });

            if (response.data.success) {
                  console.log("Registration Successful!");
                  
                  //all input field clear
                  setName("");
                  setEmail("");
                  setPassword("");

                  navigate("/login");// send user to login page
            }
          } catch (error) {
              console.error("Registration failed:", error);
            if (error.response && error.response.data) {
                //this helps captures validation or unique email errors handled by at backend utility
                setServerError(error.response.data.msg || "Registration failed. Try a different email.");
            } else {
                setServerError("Cannot connect to server. Is your backend running?");
            }
       }

    };

  return (
    <div>
         <div  className="container mx-auto w-11/12 px-2 py-2">
            <div className="flex flex-col space-y-3 items-center">
                <h1 className="font-extrabold text-3xl md:text-5xl font-['Signika_Negative'] mt-6">Create An Account</h1>
                <p className="font-['Signika_Negative'] text-[rgba(115,113,113,1)]">Join TaskDuty and set a task reminded</p>
            </div>
            <div className="container mx-auto w-11/12 px-2 py-2 flex items-center justify-center">
                <form onSubmit={handleSubmit} className="border-2 border-[rgba(184,182,182,1)] rounded-md px-4 py-6 w-full md:w-[500px] mt-2">
                    
                    {/* name */}
                    <div className="relative mt-6">
                        <input 
                            type="text" 
                            id="name" 
                            placeholder="John Doe" 
                            className={`block py-1 px-2 md:px-6 w-full h-[50px] border rounded-xl text-xs md:text-sm text-[rgba(204,204,204,1)] font-['Signika_Negative'] ${nameError ? 'border-red-500' : 'border-[rgba(184,182,182,1)]'}`}
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                        />
                        <label htmlFor="name" className="text-[rgba(156,156,156,1)] font-['Signika_Negative'] text-base absolute font-normal -top-3 left-4 bg-white px-0.5">Full Name:</label>
                        {nameError && <p className="text-red-500 text-xs mt-1 font-['Signika_Negative']">{nameError}</p>}
                    </div>

                    {/* email */}
                    <div className="relative mt-6">
                        <input 
                            type="email" 
                            id="email" 
                            placeholder="johndoe@gmail.com" 
                            className={`block py-1 px-2 md:px-6 w-full h-[50px] border rounded-xl text-xs md:text-sm text-[rgba(204,204,204,1)] font-['Signika_Negative'] ${emailError ? 'border-red-500' : 'border-[rgba(184,182,182,1)]'}`}
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                        <label htmlFor="email" className="text-[rgba(156,156,156,1)] font-['Signika_Negative'] text-base absolute font-normal -top-3 left-4 bg-white px-0.5">Email Address:</label>
                        {emailError && <p className="text-red-500 text-xs mt-1 font-['Signika_Negative']">{emailError}</p>}
                    </div>

                    {/* password */}
                    <div className="relative mt-6">
                        <input 
                            type="password" 
                            id="password" 
                            placeholder="*********" 
                            className={`block py-1 px-2 md:px-6 w-full h-[50px] border rounded-xl text-xs md:text-sm text-[rgba(204,204,204,1)] font-['Signika_Negative'] ${passwordError ? 'border-red-500' : 'border-[rgba(184,182,182,1)]'}`}
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                        />
                        <label htmlFor="password" className="text-[rgba(156,156,156,1)] font-['Signika_Negative'] text-base absolute font-normal -top-3 left-4 bg-white px-0.5">Password:</label>
                        {passwordError && <p className="text-red-500 text-xs mt-1 font-['Signika_Negative']">{passwordError}</p>}
                    </div>
                    <button className="font-['Signika_Negative'] text-white bg-[rgba(151,79,208,1)] w-full text-base border rounded-xl mt-6 p-2 hover:bg-purple-400 cursor-pointer">Register</button>
                    <p className="font-['Signika_Negative'] text-[rgba(156,156,156,1)] md:text-center mt-4">Already have an account? <Link to="/login"><span className="text-[rgba(151,79,208,1)]">Log In</span></Link></p>
                </form>
            </div>
         </div>
    </div>
  )
}

export default Register
