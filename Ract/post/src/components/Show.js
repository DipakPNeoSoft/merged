import React from 'react'
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios'


import { useNavigate, Link } from 'react-router-dom'


function Show() {


    const navigate = useNavigate()
    const { id } = useParams()
    const [post, setData] = useState({})
    const [url, setUrl] = useState('')
    const [paragraphs, setPara] = useState([])
    const [author, setAuthor] = useState(false)
    useEffect(() => {
        axios.get(`http://localhost:3001/api/v1/posts/${id}`, {
            headers:
            {
                Authorization: `${localStorage.getItem('token')}`
            }
        }).then(res => {
            console.log("res", res)
            setData(res.data.post)
            setUrl(res.data.url)
            setPara(res.data.post.content.split('\n'))
            setAuthor(res.data.author)
            // const paragraphs = res.data.post.split('\n\n'); 


        })
            .catch((err) => {
                console.log("error", err)
                if (err.response.status === 401) {
                    navigate('/')
                }
                console.log("error occured in post", err.response.status)
            })

    }, [])

    const deletePost = (e) => {


        axios.delete(`http://localhost:3001/api/v1/posts/${e.target.id}`, {
            headers:
            {
                Authorization: `${localStorage.getItem('token')}`
            }
        })
            .then(res => {
                navigate('/posts')
                // setData(res.data)

            })
            .catch("error occured")
    }
    return (
        <div >







            <div className="container">
                <div className="blog-post-container" >
                    <div className="container">
                        <div className="row">
                            <div className="col-md-8 offset-md-2">
                                <div className="blog-post">
                                    <h2 className="blog-post-title">{post.title}</h2>
                                    <small><i>posted on {post.created_at}</i></small>
                                    <img src={url.replace(/"/g, '')} className="img-fluid mb-3" />
                                    <div className="blog-post-content">
                                        {paragraphs.map((paragraph, index) => (
                                            <p key={index}>{paragraph}</p>
                                        ))}
                                    </div>
                                </div>
                                {author && (
                                <div>
                                  
                                    <button className='btn btn-danger' id={post.id} onClick={deletePost} style={{ marginBottom: '10px'}}>Delete</button>
                            

                                 
                                    <Link to={`/posts/${post.id}/edit`} className='btn btn-info' id={post.id} style={{ marginLeft: '10px' ,marginBottom: '10px'}}>Edit</Link>

                                </div>)}
                                

                            </div>

                        </div>
                    </div>
                </div>

            </div>



        </div>
    )
}

export default Show