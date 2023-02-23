import React from 'react'
import {useParams} from 'react-router-dom';
import {useState,useEffect} from 'react';
import axios from 'axios' 
import {   useNavigate } from 'react-router-dom'


function Show() {
    const navigate = useNavigate()
    const {id}= useParams()
    const [post,setData] = useState({})
    useEffect(() => {
        axios.get(`http://localhost:3002/api/v1/posts/${id}`,{ headers: 
        { Authorization: `${localStorage.getItem('token')}` 
        }}).then(res=> {
                console.log(res)
                setData(res.data)
                
                console.log("data",res.data)
            })
            .catch((err)=>{
                if(err.response.status === 401){
                    navigate('/')
                }
                console.log("error occured in post",err.response.status)
            })
     
    },[])
  return (
    <div>
        <div>
            <h2>{post.title}</h2>
 
        </div>
        <div>
            <h2>{post.content}</h2>
 
        </div>
    </div>
  )
}

export default Show