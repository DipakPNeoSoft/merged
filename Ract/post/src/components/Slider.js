import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
// import { Carousel } from 'bootstrap';
import { Link, useNavigate } from 'react-router-dom'





function Slider(props) {
    const { posts } = props;
    return (
        <div id="myCarousel" className="carousel slide container mt-1 mb-2" data-bs-ride="carousel">
           
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>
        <div className="carousel-inner">
            {
                posts.map(post =>
                    <Link to={`/posts/${post.post.id}`} >
                    <div className="carousel-item active"  style={{ height: '400px' }}>
                    <img src={post.post.url} className="d-block w-100" alt="First slide"/>
                    <div className="carousel-caption d-none d-md-block">
                    <b>
                      <h3 className='text-light'>{post.post.title}</h3>

                    </b>
                    <p className='text-light'>{post.post.content.split(" ").slice(0, 40).join(" ") + " ..."}</p>
                    </div>
                  </div>
                  </Link>

                    
                    )
            }
         
         
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#myCarousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#myCarousel" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      
    )
}

export default Slider