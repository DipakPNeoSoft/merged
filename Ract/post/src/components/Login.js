import axios from 'axios'
import React, { Component } from 'react'
import '../login.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {  withRouter } from 'react-router-dom'




class Login extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
     
        email: '',
        password: '',
        error: null
       
      }
    }

    changeHandler=(e)=>{
        console.log("first")
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    submitHandler =(e)=>{
     
        e.preventDefault()
        // console.log(this.state)
        let user = this.state
        axios.post('http://localhost:3002/users/sign_in',{user})
            .then(response => {
         
              if(response.status===200){
                let token = response.headers.get('Authorization') 
                localStorage.setItem('token', token);
                this.props.history.push('posts')
                
              }
            })
            .catch(err =>{
           
              if(err.response.status === 401){
                 this.setState({
                  error:  err.response.data.message
                 })
              }
            })

    }
  render() {
    const {email,password } =this.state
   
        
        return(
         
          <div className="main-bg">

             <h2>{this.state.error}</h2>
            <div className="container">
              <div className="row justify-content-center mt-5">
                <div className="col-lg-4 col-md-6 col-sm-6">
                  <div className="card shadow">
                    <div className="card-title text-center border-bottom">
                      <h2 className="p-3">Login</h2>
                    </div>
                    <div className="card-body">
                      <form onSubmit={this.submitHandler}>
                        <div className="mb-4">
                          <label className="form-label">Username/Email</label>
                          <input type="text" className="form-control" name="email" value={email} onChange={this.changeHandler}/>
                        </div>
                        <div className="mb-4">
                          <label  className="form-label">Password</label>
                          <input type="password" className="form-control" name="password" value={password}  onChange={this.changeHandler}/>
                        </div>
                        
                        <div className="d-grid">
                          <button type="submit" className="btn btn-primary">Login</button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      
     
    
  
}

export default  withRouter(Login);