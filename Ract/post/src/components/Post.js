import React,{useState,useEffect} from 'react'
import axios from 'axios' 
import '../post.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {  Link } from 'react-router-dom'




function Post() {
    const [posts,setData] = useState([])
    const [post,setPost] = useState({ title: '', content:''})
    

    useEffect(() => {
        axios.get('http://localhost:3002/api/v1/posts',{ headers: 
        { Authorization: `${localStorage.getItem('token')}` 
        }}).then(res=> {
                console.log(res)
                setData(res.data)
                
                console.log("data",res.data)
            })
            .catch("error occured")
     
    },[])

    const deletePost = (e) =>{
       
        axios.delete(`http://localhost:3002/api/v1/posts/${e.target.id}`,{ headers: 
        { Authorization: `${localStorage.getItem('token')}` 
        }})
        .then(res=> {
               
           
        })
        .catch("error occured")
    }

    const handleInputChange = (event) => {
        console.log("inside Change")
        setPost({ ...post, [event.target.name]: event.target.value });
        
      };

   const handleSubmit = () => {
      
        axios.post(`http://localhost:3002/api/v1/posts/`,{post},{ headers: 
        { Authorization: `${localStorage.getItem('token')}` 
        }})
        .then(res=> {
            
            setData(res.data)
        })
        .catch("error occured")

   }
   
   
    
  return (
    
    <div>
        <div>
            <h1>Create Posts</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>title</label>
                    <input name="title" value={post.title} onChange={handleInputChange} />
                </div>
                <div>
                    <label>Content</label>
                    <input name="content" value={post.content} onChange={handleInputChange}  />

                </div>
                <button>Create Posts</button>
               

            </form>
       
        </div>
        <h1>Posts</h1>
        {
            posts.map(post=> 
               
           
            <div key={post.id} >
                <p >{post.title}</p>
                <span><Link to={`/posts/${post.id}`} className='btn btn-info' id={post.id} >Show</Link></span>
                <span><button  className='btn btn-danger' id={post.id}  onClick={deletePost}>Delete</button></span>

                
            </div>)
        }
    </div>
  )
}

export default Post;