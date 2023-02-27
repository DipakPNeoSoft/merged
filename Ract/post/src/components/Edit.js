import React from 'react'
import {useParams} from 'react-router-dom';
import {useState,useEffect} from 'react';
import axios from 'axios' 
import { useNavigate } from 'react-router-dom';


function Edit() {
    const navigate = useNavigate()
    const {id}= useParams()
    const [post,setData] = useState({title: '',content: ''})
    useEffect(() => {
        axios.get(`http://localhost:3001/api/v1/posts/${id}`,{ headers: 
        { Authorization: `${localStorage.getItem('token')}` 
        }}).then(res=> {
            console.log("response",res) 
            setData(res.data.post)
        })
        .catch((err)=>{
            if(err.response.status === 404){
                navigate('/posts')
            }
        })
     
    },[])

    const handleInputChange = (event) => {
        console.log("inside Change")
        setData({ ...post, [event.target.name]: event.target.value });

    };

    const updatePost =(event)=>{
        event.preventDefault();
        axios.patch(`http://localhost:3001/api/v1/posts/${id}`,{post},{ headers: 
        { Authorization: `${localStorage.getItem('token')}` 
        }}).then(res=> {
                console.log(res)
                navigate("/posts")
        
            })
            .catch("error occured")

    }
  return (
    <div>
         <div>
                <h1>Create Posts</h1>
                <form onSubmit={updatePost}>
                    <div>
                        <label>title</label>
                        <input name="title" value={post.title} onChange={handleInputChange}   />
                    </div>
                    <div>
                        <label>Content</label>
                        <input name="content" value={post.content} onChange={handleInputChange} />

                    </div>
                    <button>Update</button>


                </form>

            </div>
    </div>
  )
}

export default Edit