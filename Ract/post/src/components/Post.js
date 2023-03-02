import React, { useState, useEffect } from 'react'
import axios from 'axios'
import '../post.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom'
import Slider from './Slider';






function Post() {
    const [posts, setData] = useState([])
    const navigate = useNavigate()
    const [carousel,setCarousel] = useState([])


    useEffect(() => {
        axios.get('http://localhost:3001/api/v1/posts', {
            headers:
            {
                Authorization: `${localStorage.getItem('token')}`
            }
        }).then(res => {
            console.log(res)
            setData(res.data.posts)
            setCarousel(res.data.posts.slice(-3))

            console.log("data", res.data)
        })
            .catch((err) => {
                if (err.response.status === 401) {
                    navigate('/')
                }
                console.log("error occured in post", err.response.status)
            })

    }, [])









    return (

        <div >

            <Slider posts={carousel}/>
           
    
            <div id='post_body' className='mt-2'>
                {
                    posts.map(post =>


                        <div key={post.post.id} className='m-2' >
                            <div className="container px-2 px-lg-2">
                                <div className="row gx-2 gx-lg-3 justify-content-center">
                                    <div className="col-md-10 col-lg-8 col-xl-7" id='card'>
                                        <div className="post-preview">
                                            <h2 className="post-title">
                                                
                                                <b>
                                                 <h2>{post.post.title}</h2>
                                                </b>
                                            </h2>
                                            <h6 className="post-subtitle">{post.post.content.split(" ").slice(0, 20).join(" ") + " ..."}</h6>
                                            <div className="d-flex justify-content-end mb-4"><Link to={`/posts/${post.post.id}`} className='btn btn-info' id={post.post.id} >Show →</Link></div>

                                            <p className="post-meta">
                                                <i>
                                                    Posted on {post.post.created_at}

                                                </i>

                                            </p>
                                        </div>
                                        <hr className="my-4" />

                                    </div>
                                </div>
                            </div>





                            <br />
                            <br />

                        </div>


                    )
                }
            </div>  

        </div>
    )
}

export default Post;