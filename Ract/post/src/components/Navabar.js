import axios from 'axios' 
import '../navbar.css'
import {  Link, useNavigate } from 'react-router-dom'
import React, { useState } from 'react'
import { useContext } from "react";
import { UserContext } from "../App";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';



function Navabar() {
    const navigate = useNavigate()
    const  userId  = localStorage.getItem('userId')
    const [posts, setData] = useState([])



    const handleLogout = ()=> {
     
        axios.delete(`http://localhost:3001/users/sign_out`,{ headers: 
        { Authorization: `${localStorage.getItem('token')}` 
        }})
        .then(res=> {
         
            if(res.status === 200){
                localStorage.clear(); 
                navigate('/')
            }
         
           
        })
        .catch((err)=>{
            console.log("error ",err)
        })
        
       
    }
  return (
    <div id='showBody' className=''>

       
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark" id="mainNav">
            <div className="container px-4 px-lg-5">
                <Link to={`/posts`}  className="navbar-brand" ><h1 className='nav-items'>Blogger</h1></Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    Menu
                    <i className="fas fa-bars"></i>
                </button>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav ms-auto py-4 py-lg-0">
                        <li className="nav-item "><Link to={`/posts`}  className="nav-link px-lg-3 py-3 py-lg-4 text-success" >Home<FontAwesomeIcon icon={faCoffee} /></Link></li>
                        <li className="nav-item ">
                        <Link to={`/new`}  className="nav-link px-lg-3 py-3 py-lg-4 text-success" >New</Link>
                        </li>
                        <li className="nav-item "> <a className="nav-link px-lg-3 py-3 py-lg-4 text-success " href="#" onClick={handleLogout}>Logout</a></li>
                        <li>
                        <Link to={`/account/${userId}`} className="nav-link px-lg-3 py-3 py-lg-4 text-success " >My Account</Link>
                        </li>

                        
                    </ul>
                </div>
            </div>
        </nav>
    </div>
  )
}

export default Navabar