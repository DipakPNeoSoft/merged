import React,{useState,useEffect} from 'react'
import axios from 'axios' 
import '../post.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {  Link, useNavigate } from 'react-router-dom'




function Post() {
    const [posts,setData] = useState([])
    const navigate = useNavigate()
    

    useEffect(() => {
        axios.get('http://localhost:3001/api/v1/posts',{ headers: 
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

    const deletePost = (e) =>{
       
        axios.delete(`http://localhost:3002/api/v1/posts/${e.target.id}`,{ headers: 
        { Authorization: `${localStorage.getItem('token')}` 
        }})
        .then(res=> {
            setData(res.data)
           
        })
        .catch("error occured")
    }

    const handleLogout = ()=> {
        axios.delete(`http://localhost:3002//users/sign_out`,{ headers: 
        { Authorization: `${localStorage.getItem('token')}` 
        }})
        .then(res=> {
            debugger
            if(res.status === 200){
                localStorage.clear(); 
                navigate('/')
            }
            setData(res.data)
           
        })
        .catch((err)=>{
            console.log("error ",err)
        })
        
       
    }

    
   
   
    
  return (
    
    <div>
        <div>
            <Link to={`/new`}  >New</Link>
        </div>
        <div>
            <a href="#" onClick={handleLogout}>Logout</a>
        </div>
        
        <h1>Posts</h1>
        {
            posts.map(post=> 
               
           
            <div key={post.id} >
                <p >{post.title}</p>
                <span><Link to={`/posts/${post.id}`} className='btn btn-info' id={post.id} >Show</Link></span>
                <span><button  className='btn btn-danger' id={post.id}  onClick={deletePost}>Delete</button></span>
                <span><Link to={`/posts/${post.id}/edit`} className='btn btn-info' id={post.id} >Edit</Link></span>


                
            </div>)
        }
    </div>
  )
}

export default Post;