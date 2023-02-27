import React from 'react'
import {useParams} from 'react-router-dom';
import {useState,useEffect} from 'react';
import axios from 'axios' 
import '../show.css'

import {   useNavigate } from 'react-router-dom'


function Show() {
    const navigate = useNavigate()
    const {id}= useParams()
    const [post,setData] = useState({})
    const [url,setUrl] = useState('')
    useEffect(() => {
        axios.get(`http://localhost:3001/api/v1/posts/${id}`,{ headers: 
        { Authorization: `${localStorage.getItem('token')}` 
        }}).then(res=> {
                console.log(res)
                setData(res.data.post)
                setUrl(res.data.url)
                
                console.log("data",res.data.post)
            })
            .catch((err)=>{
                if(err.response.status === 401){
                    navigate('/')
                }
                console.log("error occured in post",err.response.status)
            })
     
    },[])
  return (
    <div id='show'>
        {/* <div>
            <div>{JSON.stringify(post.post)}</div>
            <h2>{post.title}</h2>
 
        </div>
        <div>
            <h2>{post.content}</h2>
 
        </div>
        <img src={url.replace(/"/g, '')} height="300px" width='300px'></img> */}

        <div className="container">
            <div className="blog-post-container" >
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 offset-md-2">
                            <div className="blog-post">
                            <h2 className="blog-post-title">{post.title}</h2>
                            <img src={url.replace(/"/g, '')} className="img-fluid mb-3" />
                            <p className="blog-post-content">{post.content}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    </div>
  )
}

export default Show