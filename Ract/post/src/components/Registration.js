import axios from 'axios'
import React, { useState } from 'react'
import '../login.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';

function Registration() {

    const navigate = useNavigate();

    const [user,setUser] = useState({email: '',password: ''})
    const [error,setError] = useState([])

    const changeInputHandler=(event)=>{
        console.log("first")
        setUser({ ...user, [event.target.name]: event.target.value })
      
       
    }
    const submitHandler = (e) => {
    
        e.preventDefault()
      
    
        // console.log(this.state)
    
        axios.post('http://localhost:3001/users', { user })
          .then(response => {
            console.log("response",response)
            console.log("status",response.status)
    
    
            if (response.status === 200) {
              console.log("user",response.data.user.id)
              let token = response.headers.get('Authorization')
              localStorage.setItem('token', token);
              localStorage.setItem('userId', response.data.user.id);

              navigate('/posts')
    
    
           
    
            }
          })
          .catch(err => {
            console.log("status",err.response.data.errors.email)
          
            console.log("status",err.response.status)
    
            setError(err.response.data.errors.email)
              
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
                                    <h2 className="p-3">Register</h2>
                                </div>
                                {/* <ul>{errors.map((err)=><li key={err} style={{color: 'red'}}>{err}</li>)}</ul> */}
                                <div className="card-body">
                                    <form onSubmit={submitHandler} >
                                        <div className="mb-4">
                                            <label className="form-label">Username/Email</label>
                                            <input type="text" className="form-control" name="email" value={user.email} onChange={changeInputHandler}/>
                                        </div>
                                        <div className="mb-4">
                                            <label className="form-label">Password</label>
                                            <input type="password" className="form-control" name="password" value={user.password} onChange={changeInputHandler} />
                                        </div>
                                        <div className="mb-4">
                                            <label className="form-label">Confirm Password</label>
                                            <input type="c_password" className="form-control" name="password" />
                                        </div>

                                        <div className="d-grid">
                                            <button type="submit" className="btn btn-primary">Register</button>
                                        </div>
                                    </form>
                                    <li style={{color: 'red'}}>{error}</li>
                                    {/* <span>{error}</span> */}
                                    <div className="mb-4">
                                        <Link to={'/'}>Login</Link>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Registration