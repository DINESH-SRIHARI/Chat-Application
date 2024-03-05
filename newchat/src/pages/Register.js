import React, { useState ,useEffect} from "react";
import styled from "styled-components";
import { Link, useNavigate } from 'react-router-dom';
import {toast, ToastContainer} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import { registerRoute } from "../utils/Apiroutes";
const Register = () => {
  const [details,setdetails]=useState({
    username:"",
    email:"",
    password:"",
    confirmPassword:""
  })
  const toastoptions={
    position:"bottom-right",
    pauseOnHover:true,
    autoClose:5000,
    theme:'dark',
    draggable:true,
  }

  const navigate=useNavigate()
  useEffect(() => {
    if (localStorage.getItem("char-app-user")) {
      navigate("/");
    }
  }, []);
  const handleChange = (event) => {
    setdetails({ ...details, [event.target.name]: event.target.value });
  };
  const handleValidation=()=>{
    const {email,password,confirmPassword}=details
    if(password!==confirmPassword){
      toast.error("Both password and the confirm password are not same",toastoptions)
      return false;
    }
    else if(email===""){
      toast.error("Use a valid Email Adress",toastoptions);
      return false;
    }
    else if(password.length<4){
      toast.error("Password Must be atleast 5 characters",toastoptions)
      return false;
    }
    return true;
  }
  const handleSubmit = async(event) => {
    event.preventDefault();
    
    if(handleValidation()){
      
      const {username,password,email}=details;
      const {data}=await axios.post(registerRoute,{
        username,
        password,
        email,
      })
      if(data.status===false){
        toast.error(data.msg,toastoptions)
      }
      if(data.status===true){
        toast.success("User Added Sucessfully")
        localStorage.setItem(
          "char-app-user",
          JSON.stringify(data.user)
        );
        setTimeout(() => {
          navigate('/');
        }, 2000);
      }
    }
    
  };

  return (
    <>
      <FormContainer>
        <form onSubmit={(event) => handleSubmit(event)}>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Create User</button>
          <span>
            Already have an account ? <Link to="/login">Login.</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer/>
    </>
  );
};

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .brand {
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;
  }
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }
  button {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }
  span {
    color: white;
    text-transform: uppercase;
    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;

export default Register;
