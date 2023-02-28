import React from 'react'
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';


function Edit() {
    const navigate = useNavigate()
    const { id } = useParams()
    const [post, setPost] = useState({ title: '', content: '', images: [] })

    useEffect(() => {
        axios.get(`http://localhost:3001/api/v1/posts/${id}`, {
            headers:
            {
                Authorization: `${localStorage.getItem('token')}`
            }
        }).then(res => {
            console.log("response", res)
            setPost(res.data.post)
        })
            .catch((err) => {
                if (err.response.status === 404) {
                    navigate('/posts')
                }
            })

    }, [])

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

    const updatePost = (event) => {
        event.preventDefault();
        debugger
        const formData = new FormData();
        formData.append('post[title]', post.title);
        formData.append('post[content]', post.content);
        if (post.images.length > 0) {
            formData.append('post[images][]', post.images[0]);
        }
        axios.patch(`http://localhost:3001/api/v1/posts/${id}`, { post }, {
            headers:
            {
                Authorization: `${localStorage.getItem('token')}`
            }
        }).then(res => {
            console.log(res)
            navigate("/posts")

        })
            .catch("error occured")

    }
    return (

        <div className='form-outline w-50 container-fluid'>

            <h1>Share Your Thought</h1>
            <form onSubmit={updatePost}>
                <div className="form-outline mb-4" style={{ 'width': '60%' }}>
                    <label className="form-label">Title:</label>
                    <input className="form-control" name="title" value={post.title} onChange={handleInputChange} />
                </div>
                <div className="form-outline mb-4" >
                    <label>Content</label>
                    <textarea rows="4" className="form-control" name="content" value={post.content} onChange={handleInputChange} />

                </div>
                <div className="form-outline mb-4" >
                    <input type="file" name="images" onChange={handleInputChange} />
                </div>
                <div className="form-outline mb-4" >
                    <button className='btn btn-success'>Share</button>

                </div>


            </form>

        </div>

    )
}

export default Edit