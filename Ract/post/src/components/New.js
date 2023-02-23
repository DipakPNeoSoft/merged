import React,{useState} from 'react'
import axios from 'axios' 

import { useNavigate } from 'react-router-dom';






function New() {
    const navigate = useNavigate();
    const [post, setPost] = useState({ title: '', content: '' })

    const handleInputChange = (event) => {
        console.log("inside Change")
        setPost({ ...post, [event.target.name]: event.target.value });

    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("inside submit")
        debugger
        axios.post(`http://localhost:3002/api/v1/posts/`, { post }, {
            headers:
            {
                Authorization: `${localStorage.getItem('token')}`
            }
            })
            .then(res => {
                console.log("response",res)
                navigate("/posts")
                

                
               
            }).catch(err => {
                console.log("error",err)
            })

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
                        <input name="content" value={post.content} onChange={handleInputChange} />

                    </div>
                    <button>Submit</button>


                </form>

            </div>
        </div>
    )
}

export default New;