import axios from 'axios'
import React, { useState } from 'react'
import '../login.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from "react";
import { UserContext } from "../App";




function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  

  const { setUserId } = useContext(UserContext);
  

  const changeHandler=(event)=>{
    
    console.log("first")
    setUser({ ...user, [event.target.name]: event.target.value })
   
}



  const submitHandler = (e) => {
    debugger
    
    e.preventDefault()
  

    // console.log(this.state)

    axios.post('http://localhost:3001/users/sign_in', { user })
      .then(response => {
        console.log("response",response)
        console.log("status",response.status)


        if (response.status === 200) {
          
          let token = response.headers.get('Authorization')
          localStorage.setItem('token', token);
          localStorage.setItem('userId', response.data.user.id);
          setUserId(localStorage.getItem('userId'));
          navigate('/posts')


       

        }
      })
      .catch(err => {

        setError("Invalid Credentials")
          
      })

  }

  return (
    <div>
      <div className="main-bg">

        <div className="container">
          <div className="row justify-content-center mt-5">
            <div className="col-lg-4 col-md-6 col-sm-6">
              <div className="card shadow">
                <div className="card-title text-center border-bottom">
                  <h2 className="p-3">Login</h2>
                </div>
                <div className="card-body">
                  <form onSubmit={submitHandler}>
                    <div className="mb-4">
                      <label className="form-label">Username/Email</label>
                      <input type="text" className="form-control" name="email" value={user.email} onChange={changeHandler} />
                    </div>
                    <div className="mb-4">
                      <label className="form-label">Password</label>
                      <input type="password" className="form-control" name="password" value={user.password} onChange={changeHandler} />
                    </div>

                    <div className="d-grid">
                      <button type="submit" className="btn btn-primary">Login</button>
                    </div>
                  </form>
                  <span>{error}</span>
                  <div className="mb-4">
                      <Link to={'/register'}>Register</Link>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}

export default Login