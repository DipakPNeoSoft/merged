import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom';
import {  Link } from 'react-router-dom'



function Account() {
    const { id } = useParams()
    const [user, setUser] = useState([])


    useEffect(() => {
        axios.get(`http://localhost:3001/accounts/${id}`, {
            headers:
            {
                Authorization: `${localStorage.getItem('token')}`
            }
        }).then(res => {
            console.log(res)
            setUser(res.data)

            console.log("data", res.data)
        })
            .catch((err) => {
                if (err.response.status === 401) {

                }
                console.log("error occured in post", err.response.status)
            })

    }, [])

    return (
        <div  className="vh-100" >
            
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-md-12 col-xl-4">
                        <h3>My Profile</h3> 

                            <div className="card">
                                <div className="card-body text-center">
                                    
                                    <h4 className="mb-2">{user.email}</h4>
                                    
                                    <h4>
                                     <Link to={`/user/${id}/posts`} className="nav-link px-lg-3 py-3 py-lg-4 text-primary" >My Posts</Link>
                                        
                                    </h4>
                        
                                    <div className="d-flex justify-content-between text-center mt-5 mb-2">
                                        <div>
                                            <p className="mb-2 h5">8471</p>
                                            <p className="text-muted mb-0">Wallets Balance</p>
                                        </div>
                                        <div className="px-3">
                                            <p className="mb-2 h5">8512</p>
                                            <p className="text-muted mb-0">Income amounts</p>
                                        </div>
                                        <div>
                                            <p className="mb-2 h5">4751</p>
                                            <p className="text-muted mb-0">Total Transactions</p>
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

export default Account