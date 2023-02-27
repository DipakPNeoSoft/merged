import axios from 'axios' 

import {  Link, useNavigate } from 'react-router-dom'
import React, { useState } from 'react'



function Navabar() {
    const navigate = useNavigate()

    const handleLogout = ()=> {
        debugger
        axios.delete(`http://localhost:3001/users/sign_out`,{ headers: 
        { Authorization: `${localStorage.getItem('token')}` 
        }})
        .then(res=> {
            debugger
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
    <div>
        <nav className="navbar navbar-expand-lg navbar-light" id="mainNav">
            <div className="container px-4 px-lg-5">
                {/* <a className="navbar-brand" href="index.html">Blogger</a> */}
                <Link to={`/posts`}  className="navbar-brand" ><h1>Blogger</h1></Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    Menu
                    <i className="fas fa-bars"></i>
                </button>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav ms-auto py-4 py-lg-0">
                        <li className="nav-item"><Link to={`/posts`}  className="nav-link px-lg-3 py-3 py-lg-4" >Home</Link></li>
                        <li className="nav-item">
                        <Link to={`/new`}  className="nav-link px-lg-3 py-3 py-lg-4" >New</Link>
                        {/* <a className="nav-link px-lg-3 py-3 py-lg-4" href="about.html">New Post</a> */}
                        </li>
                        <li className="nav-item"> <a className="nav-link px-lg-3 py-3 py-lg-4"href="#" onClick={handleLogout}>Logout</a></li>
                    </ul>
                </div>
            </div>
        </nav>
    </div>
  )
}

export default Navabar