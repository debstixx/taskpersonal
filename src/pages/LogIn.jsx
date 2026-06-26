import React, { useState } from "react";
import Navlogo from "../assets/nav-logo.png";
import { Link, useNavigate } from "react-router-dom";
// npm install axios
import axios from "axios";

const LogIn = () => {
      
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
     
    // seperate state for error message;
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [serverError, setServerError] = useState("");//the display error from backend server

    const navigate = useNavigate(); //this send user to main page after login

    const handleSubmit = async (e) => {
            e.preventDefault()

            //clear out old errors every time the form is submitted
            setEmailError("");
            setPasswordError("");
            setServerError("");
      
            let hasError = false;

            //check if email is empty
            if (!email.trim()) {setEmailError("Email is required"); 
              hasError = true;
            }

            //check if password is empty
            if (!password.trim()) {setPasswordError("Password is required");
              hasError = true;
            }

            if (hasError) {return;}//stop the form submission if any validation failed
            
          //with axios I link my Login to Backend Server and 
           try { const response = await axios.post("http://localhost:3000/api/v1/login", {
                email: email,
                password: password
            });

            if (response.data.success) {
                const { token, user } = response.data;
                localStorage.setItem("token", token); //saving to localstorage
                localStorage.setItem("name", user.name);//this save user's name for it to show in the navbar later

                console.log("Token successfully stored in LocalStorage!");

                navigate("/mytask"); //send user to task page

                //clear input fields
                setEmail("");
                setPassword("");
            }

        } catch (error) {
            console.error("Login request failed:", error);//handle errors sent back by your backend/handleError utility
            
            if (error.response && error.response.data) {
                //captures "incorrect email", "incorrect password"
                setServerError(error.response.data.msg || "Authentication failed.");
            } else {
                setServerError("Cannot connect to server. Is your backend running?");
            }
        }
     
    }


  return (
    <div>
        <div className="container mx-auto w-11/12 px-2 py-2">
            <div className="flex flex-row gap-2 justify-center mt-10"> 
                <span><img src={Navlogo} className="w-[51px] h-[41px]"/></span>
                <h1 className="font-extrabold text-4xl text-blue-900 font-['Signika_Negative']">TaskDuty</h1>
            </div>
            <div className="flex flex-col space-y-3 items-center">
              <h1 className="font-extrabold text-4xl font-['Signika_Negative'] mt-6">Welcome Back</h1>
              <p className="font-['Signika_Negative'] text-[rgba(115,113,113,1)]">Sign In to continue your Task journey</p>
            </div>
        </div>
        <div className="container mx-auto w-11/12 px-2 py-2 flex items-center justify-center">
            <form onSubmit={handleSubmit} className="border-2 border-[rgba(184,182,182,1)] rounded-md px-4 py-6 w-[500px]">
                      <div className="relative mt-6">
                        <input type="email" id="email" placeholder="johndoe@gmail.com" className={`block py-1 px-2 md:px-6 w-full h-[50px] border rounded-xl text-xs md:text-sm text-[rgba(204,204,204,1)] font-['Signika_Negative'] ${emailError ? 'border-red-500' : 'border-[rgba(184,182,182,1)]'}`}
                        value={email}
                        onChange={(event)=> setEmail(event.target.value)}/>
                        <label htmlFor="email" className="text-[rgba(156,156,156,1)] font-['Signika_Negative'] text-base absolute font-normal -top-3 md:-top-3 left-4 md:left-8 bg-white px-0.5">Email Address:</label>
                        {/*Display the email error message here */}
                        {emailError && <p className="text-red-500 text-xs mt-1 font-['Signika_Negative']">{emailError}</p>}
                      </div>
                      
                      <div className="relative mt-6">
                        <input type="password" id="password" placeholder="*********" className={`block py-1 px-2 md:px-6 w-full h-[50px] border rounded-xl text-xs md:text-sm text-[rgba(204,204,204,1)] font-['Signika_Negative'] ${passwordError ? 'border-red-500' : 'border-[rgba(184,182,182,1)]'}`}
                        value={password}
                        onChange={(event)=> setPassword(event.target.value)}/>
                        <label htmlFor="password" className="text-[rgba(156,156,156,1)] font-['Signika_Negative'] text-base absolute font-normal -top-3 md:-top-3 left-4 md:left-8 bg-white px-0.5">Password:</label>
                        {/*Display the password error message here */}
                        {passwordError && <p className="text-red-500 text-xs mt-1 font-['Signika_Negative']">{passwordError}</p>}
                      </div> 
                       
                      {serverError && (
                          <p className="text-red-500 text-sm font-medium mt-4 text-center font-['Signika_Negative'] bg-red-50 p-2 rounded-lg border border-red-200">
                            {serverError}
                          </p>
                      )}
                      <button className="font-['Signika_Negative'] text-white bg-[rgba(151,79,208,1)] w-full text-base border rounded-xl mt-6 p-2 hover:bg-purple-400 cursor-pointer">Log In</button>
                      <p className="font-['Signika_Negative'] text-[rgba(156,156,156,1)] md:text-center mt-4">Don’t have an account yet?  <Link to="/register"><span className="text-[rgba(151,79,208,1)]">Register</span></Link></p>
              </form>
        </div>
    </div>
  )
}

export default LogIn
