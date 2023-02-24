import React, { useState } from 'react'
import axios from 'axios'

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
                    <div>
                        <input type="file" name="images" onChange={handleInputChange} />
                    </div>
                    <button>Submit</button>


                </form>

            </div>
        </div>
    )
}

export default New;