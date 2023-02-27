import React, { useState } from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../new.css'


import { useNavigate } from 'react-router-dom';






function New() {
    const navigate = useNavigate();
    const [post, setPost] = useState({ title: '', content: '', image: '' })

    const handleInputChange = (e) => {
        console.log("inside Change")
        // setPost({ ...post, [event.target.name]: event.target.value });
        const { name, value, files } = e.target;
        if (name === 'images') {
            setPost({
                ...post,
                images: files
            });
        } else {
            setPost({
                ...post,
                [name]: value
            });
        }

    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('post[title]', post.title);
        formData.append('post[content]', post.content);
        formData.append('post[images][]', post.images[0]); 
        axios.post(`http://localhost:3001/api/v1/posts/`, formData, {
            headers:
            {
                Authorization: `${localStorage.getItem('token')}`
            }
        })
            .then(res => {
                console.log("response", res)
                navigate("/posts")




            }).catch(err => {
                console.log("error", err)
            })

    }
    return (
        <div>
            <div className='form-outline w-50 container-fluid'>
                
                <h1>Share Your Thought</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-outline mb-4" style={{'width':'60%'}}>
                        <label className="form-label">Title:</label>   
                        <input className="form-control" name="title" value={post.title} onChange={handleInputChange} />
                    </div>
                    <div  className="form-outline mb-4" >
                        <label>Content</label>
                        <textarea  rows="4" className="form-control" name="content" value={post.content} onChange={handleInputChange} />

                    </div>
                    <div  className="form-outline mb-4" >
                        <input type="file" name="images" onChange={handleInputChange} />
                    </div>
                    <div  className="form-outline mb-4" >
                        <button className='btn btn-success'>Share</button>

                    </div>


                </form>


            </div>
            {/* <div className="form-outline w-50 container-fluid">
                <form onSubmit={handleSubmit}>
               

                    <div className="form-outline mb-4" style={{'width':'60%'}}>
                        <label className="form-label">Title:</label>

                        <input  id="form4Example2" name="title" className="form-control"  value={post.title} onChange={handleInputChange}/>
                    </div>

                    <div className="form-outline mb-4">
                        <label className="form-label" >Content:</label>

                        <textarea className="form-control" rows="4"  name="content" value={post.content} onChange={handleInputChange} ></textarea>
                    </div>
                    <div className="upload-btn-wrapper">
                        <button className="btn" id='btn'>Upload a file</button>
                        <input type="file" name="images"  />
                    </div>

                    <div className="form-outline mb-4">
                        <button type="submit" className="btn btn-primary btn-block mb-4">
                        Share
                        </button>
                    </div>
                    
                </form>
            
                
            </div> */}
        
        </div>
    )
}

export default New;