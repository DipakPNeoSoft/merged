import React, { useState, useEffect } from 'react'
import axios from 'axios'
import '../post.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom'




function Post() {
    const [posts, setData] = useState([])
    const navigate = useNavigate()


    useEffect(() => {
        axios.get('http://localhost:3001/api/v1/posts', {
            headers:
            {
                Authorization: `${localStorage.getItem('token')}`
            }
        }).then(res => {
            console.log(res)
            setData(res.data)

            console.log("data", res.data)
        })
            .catch((err) => {
                if (err.response.status === 401) {
                    navigate('/')
                }
                console.log("error occured in post", err.response.status)
            })

    }, [])

    const deletePost = (e) => {

        axios.delete(`http://localhost:3002/api/v1/posts/${e.target.id}`, {
            headers:
            {
                Authorization: `${localStorage.getItem('token')}`
            }
        })
            .then(res => {
                setData(res.data)

            })
            .catch("error occured")
    }

    const handleLogout = () => {
        axios.delete(`http://localhost:3002//users/sign_out`, {
            headers:
            {
                Authorization: `${localStorage.getItem('token')}`
            }
        })
            .then(res => {
                debugger
                if (res.status === 200) {
                    localStorage.clear();
                    navigate('/')
                }
                setData(res.data)

            })
            .catch((err) => {
                console.log("error ", err)
            })


    }





    return (

        <div>



            <div>
                {
                    posts.map(post =>


                        <div key={post.id} >
                            <div class="container px-4 px-lg-5">
                                <div class="row gx-4 gx-lg-5 justify-content-center">
                                    <div class="col-md-10 col-lg-8 col-xl-7">
                                        <div class="post-preview">
                                            <h2 class="post-title">{post.title}</h2>
                                            <h5 class="post-subtitle">{post.content}</h5>
                                            <div class="d-flex justify-content-end mb-4"><Link to={`/posts/${post.id}`} className='btn btn-info' id={post.id} >Show →</Link></div>

                                            <p class="post-meta">
                                                Posted on {post.created_at}

                                            </p>
                                        </div>
                                        <hr class="my-4" />

                                    </div>
                                </div>
                            </div>

                            {/* <p >{post.title}</p>
            <span><Link to={`/posts/${post.id}`} className='btn btn-info' id={post.id} >Show</Link></span>
            <span><button  className='btn btn-danger' id={post.id}  onClick={deletePost}>Delete</button></span>
            <span><Link to={`/posts/${post.id}/edit`} className='btn btn-info' id={post.id} >Edit</Link></span> */}



                        </div>)
                }
            </div>

        </div>
    )
}

export default Post;