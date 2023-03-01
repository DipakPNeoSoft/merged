import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios'
import { Link } from 'react-router-dom'




function UserPost() {
    const { id } = useParams()
    const [posts, setData] = useState([])
    useEffect(() => {
        axios.get(`http://localhost:3001/accounts/${id}/find_posts`, {
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

                }
                console.log("error occured in post", err.response.status)
            })

    }, [])


    return (



        <div id='post_body'>
            {posts.length > 0 ? (


                <div>
                    {
                        posts.map(post =>


                            <div key={post.id} className='m-2' >
                                <div className="container px-2 px-lg-2">
                                    <div className="row gx-2 gx-lg-3 justify-content-center">
                                        <div className="col-md-10 col-lg-8 col-xl-7" id='card'>
                                            <div className="post-preview">
                                                <h2 className="post-title">
                                                    <b>{post.title}</b>
                                                </h2>
                                                <h6 className="post-subtitle">{post.content.split(" ").slice(0, 20).join(" ") + " ..."}</h6>
                                                <div className="d-flex justify-content-end mb-4">
                                                    <Link to={`/posts/${post.id}`} className='btn btn-info' id={post.id} >Show →</Link>
                                                </div>

                                                <p className="post-meta">
                                                    <i>
                                                        Posted on {post.created_at}

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
                </div>)
                : (
                    <p className="row gx-2 gx-lg-3 justify-content-center">No posts to display.To create click  <Link to={`/new`} className="row gx-2 gx-lg-3 justify-content-center" >New</Link></p>
                    
                )}

        </div>
    )
}

export default UserPost